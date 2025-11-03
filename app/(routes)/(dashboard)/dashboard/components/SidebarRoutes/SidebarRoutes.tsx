"use client"

import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs"
import { dataAdminSidebar, dataGeneralSidebar } from "./SidebarRoutes.data"
import { SidebarItem } from "./SidebarItem/SidebarItem"


export function SidebarRoutes() {
  const { userId } = useAuth()

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-6 border-b">
          <p className="mb-2 text-slate-500">GENERAL</p>
          {dataGeneralSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>
      <div>
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-500">ADMIN</p>
          {dataAdminSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-auto border-t">
        <div className="h-20 flex justify-center items-center">
          <p className="text-center text-slate-700">2025. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}