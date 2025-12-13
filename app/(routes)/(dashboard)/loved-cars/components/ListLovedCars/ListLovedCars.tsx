"use client";

import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@/lib/generated/prisma";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import Image from "next/image";

export default function ListLovedCars() {

  const { removeLovedItem, lovedItems } = useLovedCars();
  return (
    <>
      {lovedItems.length === 0
        ? (<h2>Aún no dispones de coches que te gustan</h2>)
        : (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {lovedItems.map((car: Car) => {
              const { priceDay, photo, name, type, transmission, people, engine, id, cv } = car;

              return (
                <div className="p-1 rounded-lg shadow-md hover:shadow-lg" key={id}>
                  <Image src={photo} alt="" width={400} height={400} className="rounded-lg" />
                  <div className="p-3">
                    <div className="flex flex-col mb-3 gapx-4">
                      <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                      <p>{priceDay}$</p>
                      <p className="flex items-center">
                        <Gem className="h-4 w-4 mr-2" />
                        {type}
                      </p>
                      <p className="flex items-center">
                        <Wrench className="h-4 w-4 mr-2" />
                        {transmission}
                      </p>
                      <p className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {people}
                      </p>
                      <p className="flex items-center">
                        <Fuel className="h-4 w-4 mr-2" />
                        {engine}
                      </p>
                      <p className="flex items-center">
                        <Gauge className="h-4 w-4 mr-2" />
                        {cv}
                      </p>
                      <div className="flex items-center justify-center gap-x-3">
                        <ModalAddReservation car={car} />
                        <Heart
                          className={`mr-2 cursor-pointer fill-black`}
                          onClick={() => removeLovedItem(car.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      }
    </>
  )
}