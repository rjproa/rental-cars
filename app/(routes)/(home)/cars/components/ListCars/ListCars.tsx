"use client";

import { useAuth } from "@clerk/nextjs";
import { ListCarsProps } from "./ListCars.types";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@/lib/generated/prisma";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SkeletonCars } from "@/components/Shared/Skeleton";
import { ImageMagnifier } from "@/components/Shared/ImageMagnifier";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { userId } = useAuth();
  const { addLovedItem, lovedItems, removeLovedItem } = useLovedCars();

  if (!cars) {
    return <SkeletonCars />
  }

  return (
    <>
      {cars.length === 0 && (
        <p>No se han encontrado vehículos en estos filtros</p>
      )}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {cars.map((car: Car) => {
          const { priceDay, photo, name, type, transmission, people, cv, engine, id } = car;

          const likedCar = lovedItems.some((item) => item.id === car.id);

          return (
            <div className="p-1 rounded-lg shadow-md hover:shadow-lg  max-w-[400px] w-full" key={id}>
              <div className="relative w-full aspect-square max-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden bg-transparent">
                <ImageMagnifier src={photo} alt={name} />
              </div>
              <div className="p-3">
                <div className="flex flex-col mb-3 gapx-4">
                  <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                  <p>S/. {priceDay}</p>
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
                  {userId
                    ? (
                      <div className="flex items-center justify-center gap-x-3">
                        <ModalAddReservation car={car} />
                        <Heart
                          className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`}
                          onClick={
                            likedCar
                              ? () => removeLovedItem(car.id)
                              : () => addLovedItem(car)
                          }
                        />
                      </div>
                    )
                    : (
                      <div className="w-full mt-2 text-center">
                        <Link href="/sign-in">
                          <Button variant="outline" className="w-full">
                            Iniciar Sesión para reservar
                          </Button>
                        </Link>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )
        })}
      </div >
    </>
  )
}