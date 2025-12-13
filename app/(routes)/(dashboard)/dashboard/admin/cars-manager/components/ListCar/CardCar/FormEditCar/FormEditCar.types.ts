import { Car } from "@/lib/generated/prisma"
import { Dispatch, SetStateAction } from "react"

export type FormEditCarProps = {
  carData: Car,
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}