"use client";

import { Car, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br text-white p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent">
                Inka Rent
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu compañero de confianza para explorar el Perú. Vehículos premium para experiencias inolvidables.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="bg-gray-800 hover:bg-amber-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 hover:bg-amber-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-gray-800 hover:bg-amber-600 p-2 rounded-lg transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "/" },
                { name: "Nuestra Flota", href: "/cars" },
                { name: "Panel de Usuario", href: "/dashboard" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3">
              {[
                "Alquiler por días",
                "Alquiler mensual",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Av. Javier Prado Este 123<br />
                  San Isidro, Lima - Perú
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                <a
                  href="tel:+51999888777"
                  className="text-gray-400 hover:text-whitetransition-colors"
                >
                  +51 999 888 777
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                <a
                  href="mailto:contacto@inkarent.pe"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contacto@inkarent.pe
                </a>
              </li>
            </ul>

            {/* Horarios */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border">
              <p className="text-xs text-gray-500 mb-2">Horario de atención</p>
              <p className="text-sm text-gray-300">Lun - Vie: 8:00 AM - 8:00 PM</p>
              <p className="text-sm text-gray-300">Sáb - Dom: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} <span className="text-white font-semibold">Inka Rent</span>.
              Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-400"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="#"
                className="text-gray-400"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}