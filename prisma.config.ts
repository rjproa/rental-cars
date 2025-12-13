// Indica como funciona PRISMA en este proyecto
// 

import { defineConfig, env } from "prisma/config"; // env, funcion para leer variables de entorno
import "dotenv/config"; // Carga las variables de entorno desde el archivo .env

export default defineConfig({
  schema: "prisma/schema.prisma", // Ruta al archivo de esquema de Prisma
  migrations: {
    path: "prisma/migrations", // Ruta al directorio de migraciones
  },
  engine: "classic", // Motor de Prisma a utilizar
  datasource: {
    url: env("DATABASE_URL"), // URL de la base de datos obtenida de las variables de entorno
  },
});
