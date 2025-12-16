"use client";

import { Reveal } from "@/components/Shared/Reveal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


export function DriveToday() {

  const { userId } = useAuth();

  return (
    <div className="p-6 lg:my-32 max-w-7xl mx-auto">
      <div className="bg-[url('/images/background.jpg')] bg-center bg-no-repeat bg-cover rounded-xl p-6 lg:p-32 relative">
        <div className="lg:flex gap-x-6">
          <div>
            <h3 className="text-4xl text-white">Conduce el carro de tus sueños hoy</h3>
            <p className="text-white text-xl my-5">
              Registrate y explora el mundo de los carros premium
            </p>
            {userId
              ? (
                <Link href="/cars">
                  <Button className="cursor-pointer" variant="outline" size="lg">
                    Lista de vehículos
                  </Button>
                </Link>
              )
              : (
                <Link href="/sign-in">
                  <Button className="cursor-pointer" variant="outline" size="lg">
                    Registrate aqui
                  </Button>
                </Link>
              )
            }
          </div>
          <Reveal position="right" className="lg:absolute lg:-right-32 top-5">
            <Image
              src="https://res.cloudinary.com/dkf2ptmh1/image/upload/v1765674119/porsche_trtgrp.png"
              alt="car drive"
              width={550}
              height={250}
            />
          </Reveal>
        </div>
      </div>
    </div>
  )
}