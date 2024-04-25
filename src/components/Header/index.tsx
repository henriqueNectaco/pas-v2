import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import logo from '../../assets/logo.svg';
import Image from "next/image";
import { ArrowRight } from "phosphor-react";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Dashboard",
    "Vendas",
    "Marketplace",
    "Crons",
    "Validar taxas",
    "SSL's",
    "Sair"

  ];

  return (
    <Navbar className="p-6  w-fscreen flex flex-row items-center justify-around bg-gradient-to-r from-cyan-500 to-blue-500  text-black "
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <Image src={logo} alt='teste' />

      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>

        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Image src={logo} alt='teste' />


        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Vendas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Marketplace
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Crons
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Validar Taxas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            SSL's
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">

        <NavbarItem>
          <Button color='FFFF' href="#" className="button-no-border" variant="solid">
            <ArrowRight size={32} />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}