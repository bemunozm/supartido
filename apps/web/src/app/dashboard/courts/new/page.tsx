'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, Plus, Trash2, MapPin } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CourtType } from '@supartido/shared';

export default function NewCourtPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: CourtType.FIVE_VS_FIVE,
    address: '',
    city: 'Iquique',
    pricePerHour: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save logic
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center gap-6 mb-12">
          <Button 
            variant="ghost" 
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl h-12 w-12 p-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-4xl font-bold text-white tracking-tight">Agregar Nueva Cancha</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-900 border-slate-800 p-8 rounded-3xl space-y-6 md:col-span-2">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Plus className="w-5 h-5 mr-3 text-[#22C55E]" /> Información General
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Nombre de la cancha</label>
                  <Input 
                    required
                    placeholder="Ej. Estadio Cavancha"
                    className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl focus:ring-[#22C55E]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Tipo de cancha</label>
                  <Select 
                    value={formData.type}
                    onValueChange={(v) => setFormData({ ...formData, type: v as CourtType })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value={CourtType.FIVE_VS_FIVE}>Fútbol 5</SelectItem>
                      <SelectItem value={CourtType.SIX_VS_SIX}>Fútbol 6</SelectItem>
                      <SelectItem value={CourtType.SEVEN_VS_SEVEN}>Fútbol 7</SelectItem>
                      <SelectItem value={CourtType.ELEVEN_VS_ELEVEN}>Fútbol 11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Descripción</label>
                  <Textarea 
                    required
                    placeholder="Describe las instalaciones, el tipo de césped, etc..."
                    className="bg-slate-800 border-slate-700 text-white min-h-[120px] rounded-xl focus:ring-[#22C55E]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-[#22C55E]" /> Ubicación
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Dirección</label>
                <Input 
                  required
                  placeholder="Ej. Av. Arturo Prat 123"
                  className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl focus:ring-[#22C55E]"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Ciudad</label>
                <Select 
                  value={formData.city}
                  onValueChange={(v) => setFormData({ ...formData, city: v })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="Iquique">Iquique</SelectItem>
                    <SelectItem value="Alto Hospicio">Alto Hospicio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Save className="w-5 h-5 mr-3 text-[#22C55E]" /> Precio
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Precio por hora (CLP)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 h-6 w-6 text-[#22C55E] font-bold text-lg">$</span>
                  <Input 
                    required
                    type="number"
                    placeholder="Ej. 25000"
                    className="pl-10 bg-slate-800 border-slate-700 text-white h-12 rounded-xl focus:ring-[#22C55E]"
                    value={formData.pricePerHour}
                    onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                  />
                </div>
              </div>
              <p className="text-slate-500 text-xs">Asegúrate de que el precio sea competitivo para tu zona.</p>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-8 rounded-3xl space-y-6 md:col-span-2">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Upload className="w-5 h-5 mr-3 text-[#22C55E]" /> Fotos de la cancha
              </h3>
              <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center hover:border-[#22C55E]/50 transition-colors group cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-slate-700 group-hover:text-[#22C55E] transition-colors mb-4" />
                <p className="text-slate-400 font-medium">Haz clic para subir fotos o arrastra y suelta</p>
                <p className="text-slate-600 text-sm mt-2">Soporta JPG, PNG (máx. 5MB cada una)</p>
              </div>
            </Card>
          </div>

          <div className="flex justify-end gap-4 mt-12">
            <Button 
              type="button" 
              variant="ghost" 
              className="text-slate-400 hover:text-white h-14 px-8 rounded-2xl text-lg font-bold"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white h-14 px-12 rounded-2xl text-lg font-bold shadow-lg shadow-[#22C55E]/20"
              disabled={loading}
            >
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Guardar Cancha'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
