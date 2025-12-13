import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import ListCars from "./components/ListCars/ListCars";

export default async function DashboardPage() {

  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const cars = await db.car.findMany({
    where: {
      isPublish: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <div className="flex flex-col justify-between">
      <div className="text-2xl font-bold">
        <h2>Lista de Carros</h2>
      </div>
      <ListCars cars={cars} />
    </div>
  )
}
