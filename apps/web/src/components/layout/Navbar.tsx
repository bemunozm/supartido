"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-sm border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#22C55E] to-[#16A34A] bg-clip-text text-transparent">
                SuPartido
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 text-white/90">
                <Link href="#canchas" className="hover:text-[#22C55E] px-3 py-2 rounded-md text-sm font-medium transition-colors">Canchas</Link>
                <Link href="#como-funciona" className="hover:text-[#22C55E] px-3 py-2 rounded-md text-sm font-medium transition-colors">Cómo funciona</Link>
                <Link href="#para-duenos" className="hover:text-[#22C55E] px-3 py-2 rounded-md text-sm font-medium transition-colors">Para Dueños</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-[#22C55E] hover:bg-white/5">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white border-none rounded-xl">Registrarse</Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#22C55E] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-[#334155]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#canchas" className="text-white hover:text-[#22C55E] block px-3 py-2 rounded-md text-base font-medium">Canchas</Link>
            <Link href="#como-funciona" className="text-white hover:text-[#22C55E] block px-3 py-2 rounded-md text-base font-medium">Cómo funciona</Link>
            <Link href="#para-duenos" className="text-white hover:text-[#22C55E] block px-3 py-2 rounded-md text-base font-medium">Para Dueños</Link>
            <Link href="/login" className="text-white hover:text-[#22C55E] block px-3 py-2 rounded-md text-base font-medium">Iniciar Sesión</Link>
            <div className="pt-2">
              <Link href="/register">
                <Button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white border-none rounded-xl">Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
