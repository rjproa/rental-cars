// configuración de NEXT en el proyecto

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ufs.sh", // permite subdominios
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**cloudinary.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "utfs.io", // opcional, si también usas este
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
