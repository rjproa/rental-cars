import { Calendar, Car, Heart, List, ShoppingCart } from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: Car,
    label: "Vehículos",
    href: "/dashboard"
  },
  {
    icon: Calendar,
    label: "Reservas",
    href: "/reserves"
  }, {
    icon: Heart,
    label: "Guardados",
    href: "/loved-cars"
  }
]

export const dataAdminSidebar = [
  {
    icon: List,
    label: "Administración",
    href: "/dashboard/admin/cars-manager"
  },
  {
    icon: ShoppingCart,
    label: "Todas las reservas",
    href: "/dashboard/admin/reserves-admin"
  }
]