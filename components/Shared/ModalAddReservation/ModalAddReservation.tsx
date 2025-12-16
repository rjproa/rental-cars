import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Car } from "@/lib/generated/prisma";
import { CalendarSelector } from "./CalendarSelector";
import { useState } from "react";

import { addDays } from "date-fns";

import { DateRange } from "react-day-picker"
import axios from "axios";
import { toast } from "sonner";

export function ModalAddReservation(props: ModalAddReservationProps) {
  const { car } = props;
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  })


  const onReserveCar = async (car: Car, dateSelected: DateRange) => {
    const response = await axios.post('/api/checkout', {
      carId: car.id,
      priceDay: car.priceDay,
      startDate: dateSelected.from,
      endDate: dateSelected.to,
      carName: car.name,
    });

    window.location = response.data.url;

    toast.info("Car reserved successfully!");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-50 mt-3">
          Reservar vehiculo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona las fechas en las que quieres alquilar el coche</DialogTitle>
          <DialogDescription asChild>
            <div>
              <CalendarSelector setDateSelected={setDateSelected} carPriceDay={car.priceDay}></CalendarSelector>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            cancelar
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => onReserveCar(car, dateSelected)}>
              Reservar vehículo
            </Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}