import { Reveal } from "@/components/Shared/Reveal";
import Image from "next/image";

export function FirstBlock() {
  return (
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center max-w-5/6 m-auto">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
          Servicio Premium
          <span className="block">Alquiler de vehículos</span>
          Perú
        </h1>
        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-5m">
          Alquila el carro ideal para cada momento con facilidad y confianza. Contamos con una amplia flota de vehículos modernos, seguros y bien mantenidos, listos para acompañarte en viajes de trabajo, vacaciones o uso diario. Reserva en pocos pasos, disfruta de tarifas claras.
        </p>
      </Reveal>
      <Reveal className="flex justify-end" position="right">
        <Image src="https://res.cloudinary.com/dkf2ptmh1/image/upload/v1765672642/05_ewmug1.avif" alt="Rental Cars" width={800} height={800} priority />
      </Reveal>
    </div>
  );
}