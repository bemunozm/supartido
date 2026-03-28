'use client';

import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Court, CourtType } from '@/lib/types';
import { getCourts } from '@/lib/api';
import CourtCard from '@/components/courts/CourtCard';

export default function CatalogPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '' as any,
    search: '',
  });

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true);
      try {
        const data = await getCourts(filters);
        setCourts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, [filters]);

  return (
    <main className="min-h-screen bg-[#0F172A] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Catálogo de Canchas</h1>
          <p className="text-slate-400">Encuentra y reserva la cancha perfecta para tu próximo partido.</p>
        </header>

        {/* Filters */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Buscar por nombre..."
              className="pl-10 bg-slate-800 border-slate-700 text-white"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <Select onValueChange={(v) => setFilters({ ...filters, city: v })}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="Iquique">Iquique</SelectItem>
              <SelectItem value="Alto Hospicio">Alto Hospicio</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => setFilters({ ...filters, type: v as CourtType })}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Tipo de cancha" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value={CourtType.FIVE_VS_FIVE}>Fútbol 5</SelectItem>
              <SelectItem value={CourtType.SIX_VS_SIX}>Fútbol 6</SelectItem>
              <SelectItem value={CourtType.SEVEN_VS_SEVEN}>Fútbol 7</SelectItem>
              <SelectItem value={CourtType.ELEVEN_VS_ELEVEN}>Fútbol 11</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Más filtros
          </Button>
        </section>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] bg-slate-900 rounded-2xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : courts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-slate-400 text-xl">No se encontraron canchas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </main>
  );
}
