import { Car } from "@/lib/generated/prisma";

export type ListCarsProps = {
  cars: Car[] | undefined;
}