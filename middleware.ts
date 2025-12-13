// clerk-middleware -> middleware de autenticación de Clerk para Next.js  
// createRouteMatcher -> función para definir rutas públicas o protegidas
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define que rutas no requieres autenticación
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/uploadthing', '/api/car(.*)', '/api/checkout'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect() // método de clerk, verifica si hay una sesión activa, si hay una sesión activa, permite el acceso a la ruta protegida. En caso no haya sesión activa, redirige al usuario a la página de inicio de sesión.
  }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};