import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);

    const { carId, priceDay, startDate, endDate, carName } = body;

    if (!carId) {
      return new NextResponse("Car id is required", { status: 400 });
    }

    if (!priceDay || !startDate || !endDate || !carName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = numberOfDays * Number(priceDay);

    console.log("Creating order:", { carId, carName, userId, totalAmount, numberOfDays });

    // Crear la orden en la base de datos
    const order = await db.order.create({
      data: {
        carId,
        carName: carName,
        userId: userId,
        status: "pending",
        totalAmount: totalAmount.toString(),
        orderDate: start,
        orderEndDate: end
      }
    });

    console.log("Order created:", order.id);

    // Verificar que el access token existe
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error("MERCADOPAGO_ACCESS_TOKEN is not defined");
      return new NextResponse("Payment configuration error", { status: 500 });
    }

    // Configurar MercadoPago
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    console.log("Creating MercadoPago preference...");

    // Usar APP_URL (para el servidor) en lugar de NEXT_PUBLIC_APP_URL
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    console.log("Base URL:", baseUrl); // Ahora sí debería aparecer

    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: carId,
            title: `Alquiler de ${carName}`,
            description: `Alquiler por ${numberOfDays} días`,
            quantity: 1,
            unit_price: totalAmount,
            currency_id: "PEN",
          }
        ],
        back_urls: {
          success: `${baseUrl}/order-confirmation?orderId=${order.id}`,
          failure: `${baseUrl}/reservation-failure?orderId=${order.id}`,
          pending: `${baseUrl}/reservation-pending?orderId=${order.id}`,
        },
        // Sin auto_return por ahora
        metadata: {
          orderId: order.id,
          userId: userId,
        },
      }
    });

    console.log("MercadoPago preference created:", preferenceData.id);

    return NextResponse.json({
      url: preferenceData.init_point,
      orderId: order.id
    }, {
      headers: corsHeaders
    });

  } catch (error) {
    console.error("Checkout error:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}