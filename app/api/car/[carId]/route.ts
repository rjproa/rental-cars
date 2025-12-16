import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  try {
    const { userId } = await auth();
    const { carId } = await params; // Agregar await
    const { isPublish } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const car = await db.car.update({
      where: {
        id: carId,
        userId,
      },
      data: {
        isPublish: isPublish,
      },
    });

    return NextResponse.json(car);

  } catch (error) {
    console.log('[CARD ID PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ carId: string }> }
) {
  try {
    const { userId } = await auth();
    const { carId } = await params; // Agregar await

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const deleteCar = await db.car.delete({
      where: {
        id: carId,
      },
    });

    return NextResponse.json(deleteCar);

  } catch (error) {
    console.log('[DELETE CAR ID]', error);
    return new NextResponse('Internal Error', { status: 500 }); // También corregí el typo "Internarl"
  }
}