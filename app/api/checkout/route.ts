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
    const { carId, priceDay, startDate, endDate, carName } = body;

    if (!carId || !priceDay || !startDate || !endDate || !carName) {
      return new NextResponse("Es necesario completar los campos", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    let totalAmount = numberOfDays * Number(priceDay);
    totalAmount = Math.round(totalAmount * 100) / 100;

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

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      console.error("MERCADOPAGO_ACCESS_TOKEN no está definido");
      return new NextResponse("Error en la configuración de pago", { status: 500 });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    console.log("🔗 Base URL:", baseUrl);

    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: carId,
            title: `Alquiler ${carName}`,
            description: `${numberOfDays} día${numberOfDays > 1 ? 's' : ''}`,
            quantity: 1,
            unit_price: totalAmount,
            currency_id: "PEN",
          }
        ],

        back_urls: {
          success: `${baseUrl}/order-confirmation`,
          failure: `${baseUrl}/order-error`,
          pending: `${baseUrl}/order-confirmation`,
        },

      }
    });

    return NextResponse.json({
      url: preferenceData.init_point,
      orderId: order.id,
      preferenceId: preferenceData.id
    }, {
      headers: corsHeaders
    });

  } catch (error) {
    console.error("❌ Checkout error:", error);

    if (typeof error === 'object' && error !== null) {
      console.error("Full error:", JSON.stringify(error, null, 2));
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