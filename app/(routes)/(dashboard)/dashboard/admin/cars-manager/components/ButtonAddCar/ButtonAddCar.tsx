"use client"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { PlusCircle } from "lucide-react"

import { useState } from "react"
import { FormAddCar } from "../FormAddCar"

export function ButtonAddCar() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenDialog(true)}>
          Agregar nuevo carro
          <PlusCircle className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar nuevo carro</DialogTitle>
          <DialogDescription>
            Completa los detalles que tus clientes verán sobre el vehículo
          </DialogDescription>
        </DialogHeader>
        <FormAddCar setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  )
}