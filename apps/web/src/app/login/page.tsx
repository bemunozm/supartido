"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8">
        <span className="text-3xl font-bold bg-gradient-to-r from-[#22C55E] to-[#16A34A] bg-clip-text text-transparent">
          SuPartido
        </span>
      </Link>
      
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 rounded-2xl p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white text-center">Bienvenido de nuevo</CardTitle>
          <CardDescription className="text-slate-400 text-center">
            Ingresa tus datos para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input id="email" type="email" placeholder="nombre@ejemplo.com" className="bg-[#0F172A] border-slate-700 text-white rounded-xl focus:ring-[#22C55E]" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-slate-200">Contraseña</Label>
                <Link href="#" className="text-xs text-[#22C55E] hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <Input id="password" type="password" className="bg-[#0F172A] border-slate-700 text-white rounded-xl focus:ring-[#22C55E]" />
            </div>
          </div>
          <Button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-6 rounded-xl border-none">
            Iniciar Sesión
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">O continúa con</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-white/5 py-6 rounded-xl font-bold">
            <Chrome className="mr-2 h-5 w-5" />
            Google
          </Button>
          
          <p className="text-center text-sm text-slate-400">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-[#22C55E] hover:underline font-medium">
              Regístrate aquí
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
