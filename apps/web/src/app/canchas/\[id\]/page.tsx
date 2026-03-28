'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Users, DollarSign, Clock, ShieldCheck, Car, Coffee, Utensils, Lightbulb } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Court, CourtType } from '@supartido/shared';
import { getCourt } from '@/lib/api';

const amenityIcons: Record<string, any> = {
  lighting: Lightbulb,
  parking: Car,
  showers: Shower, // Wait, Shower is not imported from lucide-react?
  cafe: Coffee,
  restaurant: Utensils,
  security: ShieldCheck,
};

// I need to fix the imports from lucide-react
import { ShowerHead as Shower } from "lucide-react";

export default function CourtDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [court, setCourt] = useState<Court | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourt = async () => {
      setLoading(true);
      try {
        const data = await getCourt(id as string);
        setCourt(data);
      } catch (error) {
        console.error(error);
        router.push('/canchas');
      } finally {
        setLoading(false);
      }
    };
    fetchCourt();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#22C55E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!court) return null;

  const getCourtTypeLabel = (type: CourtType) => {
    switch (type) {
      case CourtType.FIVE_VS_FIVE: return 'Fútbol 5';
      case CourtType.SIX_VS_SIX: return 'Fútbol 6';
      case CourtType.SEVEN_VS_SEVEN: return 'Fútbol 7';
      case CourtType.ELEVEN_VS_ELEVEN: return 'Fútbol 11';
      default: return type;
    }
  };

  const mainImage = court.images?.[0]?.url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200';

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery */}
            <div className="aspect-video w-full relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-800 shadow-2xl">
              <img src={mainImage} alt={court.name} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-white border border-white/10">
                {getCourtTypeLabel(court.type)}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">{court.name}</h1>
                <div className="flex items-center text-3xl font-bold text-[#22C55E]">
                  <DollarSign className="w-8 h-8 mr-1" />
                  {new Intl.NumberFormat('es-CL').format(court.pricePerHour)}
                  <span className="text-slate-400 text-lg font-normal ml-2">/ hora</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-slate-400">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#22C55E]" />
                  <span className="text-lg">{court.address}, {court.city}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-[#22C55E]" />
                  <span className="text-lg">{getCourtTypeLabel(court.type)}</span>
                </div>
              </div>

              <div className="h-px bg-slate-800/50 w-full" />

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Descripción</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{court.description}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Amenidades</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(court.amenities || {}).map(([key, value]) => {
                    if (!value) return null;
                    const Icon = amenityIcons[key] || ShieldCheck;
                    return (
                      <div key={key} className="flex items-center p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                        <Icon className="w-6 h-6 mr-3 text-[#22C55E]" />
                        <span className="text-white font-medium capitalize">{key.replace('_', ' ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking */}
          <div className="space-y-8">
            <Card className="bg-slate-900 border-slate-800 sticky top-32 rounded-3xl shadow-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-slate-800 bg-slate-800/20">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-[#22C55E]" /> Reservar Cancha
                </h3>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-400">Horarios disponibles hoy:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['18:00', '19:00', '20:00', '21:00'].map((h) => (
                      <Button key={h} variant="outline" className="border-slate-800 bg-slate-800/50 text-white hover:bg-[#22C55E] hover:border-[#22C55E] hover:text-white h-12 rounded-xl transition-all">
                        {h}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                <Button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white h-16 rounded-2xl text-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#22C55E]/20">
                  Continuar Reserva
                </Button>
                
                <p className="text-slate-500 text-sm text-center">Debes estar registrado para reservar.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 rounded-3xl p-8 space-y-4">
              <h4 className="text-white font-bold flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#22C55E]" /> Ubicación
              </h4>
              <div className="aspect-square w-full bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
                <span className="text-slate-500">Mapa Placeholder</span>
              </div>
              <p className="text-slate-400 text-sm">{court.address}, {court.city}</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
