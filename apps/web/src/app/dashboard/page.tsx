'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Court, CourtType } from '@supartido/shared';
import { getCourts } from '@/lib/api';

export default function DashboardPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      try {
        // En producción filtraríamos por ownerId del usuario autenticado
        const data = await getCourts();
        setCourts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, []);

  const getCourtTypeLabel = (type: CourtType) => {
    switch (type) {
      case CourtType.FIVE_VS_FIVE: return 'Fútbol 5';
      case CourtType.SIX_VS_SIX: return 'Fútbol 6';
      case CourtType.SEVEN_VS_SEVEN: return 'Fútbol 7';
      case CourtType.ELEVEN_VS_ELEVEN: return 'Fútbol 11';
      default: return type;
    }
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Panel del Dueño</h1>
            <p className="text-slate-400">Gestiona tus canchas y reservas en un solo lugar.</p>
          </div>
          <Link href="/dashboard/courts/new">
            <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white h-14 px-8 rounded-2xl text-lg font-bold shadow-lg shadow-[#22C55E]/20">
              <Plus className="mr-2 h-6 w-6" /> Agregar Cancha
            </Button>
          </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-900 rounded-3xl animate-pulse border border-slate-800" />
            ))
          ) : courts.length > 0 ? (
            courts.map((court) => (
              <Card key={court.id} className="bg-slate-900 border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#22C55E]/30 transition-all group">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#22C55E]/10 text-[#22C55E] px-3 py-1 rounded-full text-xs font-bold border border-[#22C55E]/20 mb-4">
                      {getCourtTypeLabel(court.type)}
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl">
                        <Edit2 className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#22C55E] transition-colors">{court.name}</h3>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-4">
                  <div className="flex items-center text-slate-400">
                    <MapPin className="w-5 h-5 mr-3 text-[#22C55E]" />
                    {court.address}, {court.city}
                  </div>
                  <div className="flex items-center text-white font-bold text-xl">
                    <DollarSign className="w-6 h-6 mr-1 text-[#22C55E]" />
                    {new Intl.NumberFormat('es-CL').format(court.pricePerHour)}
                    <span className="text-slate-400 text-sm font-normal ml-2">/ hora</span>
                  </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 border-t border-slate-800/50 mt-4 bg-slate-800/20">
                  <Link href={`/canchas/${court.id}`} className="w-full">
                    <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-transparent flex items-center justify-center p-0 h-12">
                      Ver vista pública <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800">
              <p className="text-slate-500 text-xl mb-8">Aún no tienes canchas registradas.</p>
              <Link href="/dashboard/courts/new">
                <Button className="bg-slate-800 hover:bg-[#22C55E] text-white h-12 px-8 rounded-xl transition-colors">
                  Crea tu primera cancha
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
