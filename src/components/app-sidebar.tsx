"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Home,
  Headphones,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin PNV",
    email: "admin2@pnv.fr",
    avatar: "",
  },
  navMain: [
    { title: "Vue generale", url: "/dashboard?tab=overview", icon: LayoutDashboard },
    { title: "Produits", url: "/dashboard?tab=products", icon: Package },
    { title: "Commandes", url: "/dashboard?tab=orders", icon: ShoppingBag },
    { title: "SAV", url: "/dashboard?tab=sav", icon: Headphones },
  ],
  navSecondary: [
    { title: "Retour au site", url: "/", icon: Home },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#C9A96E" }}>
                    PNV
                  </span>
                  <span className="text-sm tracking-[0.2em] uppercase font-light">
                    La Maison du Parfum
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}