import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  versions: ["0.1.0"],
  navMain: [
    {
      title: "Inicio",
      items: [
        {
          title: "Project Structure",
          url: "#",
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
          isActive: true,
        },
      ],
    },
    {
      title: "Ordenes",
      items: [
        {
          title: "Ver órdenes",
          url: "/orders",
        },
        {
          title: "Crear órden",
          url: "/orders/create",
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
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
      <SidebarRail />
    </Sidebar>
  );
}
