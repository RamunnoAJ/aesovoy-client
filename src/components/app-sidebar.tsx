import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Leaf } from "lucide-react";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Órdenes",
      items: [
        {
          title: "Ver órdenes",
          url: "/orders",
          isActive: true,
        },
        {
          title: "Crear órden",
          url: "/orders/create",
        },
      ],
    },
    {
      title: "Clientes",
      items: [
        {
          title: "Ver clientes",
          url: "/clients",
        },
        {
          title: "Crear cliente",
          url: "/clients/create",
        },
      ],
    },
    {
      title: "Proveedores",
      items: [
        {
          title: "Ver proveedores",
          url: "/providers",
        },
        {
          title: "Crear proveedor",
          url: "/providers/create",
        },
      ],
    },
    {
      title: "Productos",
      items: [
        {
          title: "Ver productos",
          url: "/products",
        },
        {
          title: "Crear producto",
          url: "/products/create",
        },
      ],
    },
    {
      title: "Categorías",
      items: [
        {
          title: "Ver categorías",
          url: "/categories",
        },
        {
          title: "Crear categoría",
          url: "/categories/create",
        },
      ],
    },
    {
      title: "Local",
      items: [
        {
          title: "Facturación",
          url: "/local",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <Leaf className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">A eso voy! Plant based</span>
                  <span className="">v0.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
