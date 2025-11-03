import { Calendar, Car, Heart, List, ShoppingCart } from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: Car,
    label: "Cars",
    href: "/dashboard"
  },
  {
    icon: Calendar,
    label: "Cars Reserves",
    href: "/reserves"
  }, {
    icon: Heart,
    label: "Loved Cars",
    href: "/loved-cars"
  }
]

export const dataAdminSidebar = [
  {
    icon: List,
    label: "Manage your cars",
    href: "/manage-cars"
  },
  {
    icon: ShoppingCart,
    label: "All reserves",
    href: "/all-reserves"
  }
]