import { cn } from "@/lib/utils";
import { categoryOurFleet, dataFirstBlockOurFleet, dataSecondBlockOurFleet } from "./OurFleet.data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";


export function OurFleet() {
  return (
    <div className="max-w-6xl mx-auto text-center py-12 lg:py-40 p-6">
      <h3 className="text-2xl lg:text-6xl font-bold">Nuestra flota de vehículos</h3>
      <p className="text-lg mt-2 lg:mt-5 lg:text-xl text-center w-full mx-auto max-w-2xl mb-5 lg:mb-10">
        No te niegues el placer de conducir los mejores autos premium del mundo, aquí y ahora.      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] gap-6 items-center justify-center mb-5 max-w-2xl mx-auto">
        {categoryOurFleet.map(({ name, active }) => (
          <div
            key={name}
            className={cn("rounded-xl py-2 px-2 text-center", active ? "bg-black text-white" : "bg-slate-100"
            )}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="mb-10">
        <div className="grid grid-cols-3 gap-x-6 mb-6">
          {dataFirstBlockOurFleet.map(({ url }) => (
            <div key={url}>
              <Image
                src={`https://res.cloudinary.com/dkf2ptmh1/image/upload/${url}`}
                alt="Car"
                width={400}
                height={300}
                className="rounded-xl aspect-[3/2]"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-x-6 max-w-5xl mx-auto">
          {dataSecondBlockOurFleet.map(({ url }) => (
            <div key={url}>
              <Image
                src={`https://res.cloudinary.com/dkf2ptmh1/image/upload/${url}`}
                alt="Car"
                width={400}
                height={300}
                className="rounded-xl aspect-[3/2]"
              />
            </div>
          ))}
        </div>
      </div>
      <Link href="/cars">
        <Button className="rounded-xl p-6 text-lg mt-5" variant="outline">
          Ver lista completa
          <MoveRight className="ml-2" />
        </Button>
      </Link>
    </div>
  )
}