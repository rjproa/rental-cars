"use client"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { Fuel, Gauge, Gem, Trash, Upload, Users, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

import { CardCarProps } from "./CardCar.type";
import { ButtonEditCar } from "./ButtonEditCar";
import axios from "axios";

export function CardCar(props: CardCarProps) {
  const { car } = props;
  const router = useRouter();

  const deleteCar = async () => {
    try {
      await axios.delete(`/api/car/${car.id}`);
      toast.info('Car Deleted');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  }

  const handlePublishCar = async (publish: boolean) => {
    try {
      await axios.patch(`/api/car/${car.id}`, { isPublish: publish });

      if (publish) {
        toast.info('Car Published');
      } else {
        toast.info('Car Unpublish')
      }
      router.refresh();
    } catch (error) {
      toast.error('Somethin went wrong');
      console.log(error);

    }
  }

  return (
    <div className="relative p-1 bg-white rounded-lg shadow-md hover:shadow-ls">
      <Image
        src={car.photo}
        alt={car.name}
        width={400}
        height={600}
        className="rounded-lg"
      />
      {
        car.isPublish
          ? (<p className="absolute top-0 right-0 w-full text-center text-white bg-green-700 rounded-t-lg">Published</p>)
          : (<p className="absolute top-0 right-0 w-full text-center text-white bg-red-300 rounded-t-lg">Not Published</p>)
      }
      <div className="relative p-3">
        <div className="flex flex-col mb-3 gap-x-4">
          <p className="text-xl min-h-16 lg:min-h-fit">{car.name}</p>
          <p>{car.priceDay}$ /dia</p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-4">
          <p className="flex items-center">
            <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.type}
          </p>
          <p className="flex items-center">
            <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.transmission}
          </p>
          <p className="flex items-center">
            <Users className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.people}
          </p>
          <p className="flex items-center">
            <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.engine}
          </p>
          <p className="flex items-center">
            <Gauge className="h-4 w-4 mr-2" strokeWidth={1} />
            {car.cv}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-3 gap-x-4">
        <Button variant="outline" onClick={deleteCar}>Delete <Trash className="w-4 h-4 ml-2" /></Button>
        <ButtonEditCar carData={car} />
      </div>
      {
        car.isPublish
          ? (
            <Button
              className="w-full mt-3"
              variant="outline"
              onClick={() => handlePublishCar(false)}
            >
              Unpublish
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          )
          : (
            <Button
              className="w-full mt-3"
              onClick={() => handlePublishCar(true)}
            >
              Publish
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          )
      }
    </div>
  )
}

//  2:32:46