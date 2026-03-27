import { MapPin, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courts = [
  { id: 1, name: "Cancha Monumental", type: "Fútbol 11", price: "45.000", location: "Iquique, Cavancha", image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Pampa Arena", type: "Fútbol 7", price: "35.000", location: "Alto Hospicio, Centro", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "El Clásico", type: "Fútbol 5", price: "25.000", location: "Iquique, Península", image: "https://images.unsplash.com/photo-1526232762683-217500996593?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Sport Center Norte", type: "Fútbol 7", price: "32.000", location: "Iquique, Sector Norte", image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Hospicio City", type: "Fútbol 11", price: "40.000", location: "Alto Hospicio, Autoconstrucción", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Golazo Iquique", type: "Fútbol 5", price: "22.000", location: "Iquique, Playa Brava", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800" },
];

const FeaturedCourts = () => {
  return (
    <section id="canchas" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-left">Canchas destacadas</h2>
            <div className="w-20 h-1.5 bg-[#22C55E] rounded-full" />
          </div>
          <Button variant="ghost" className="text-[#22C55E] hover:text-[#16A34A] hover:bg-[#22C55E]/10">Ver todas</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courts.map((court) => (
            <Card key={court.id} className="bg-slate-900 border-slate-800 overflow-hidden hover:border-[#22C55E]/50 transition-all rounded-2xl group">
              <div className="h-48 w-full relative bg-slate-800">
                {/* Mock Image Gradient instead of external images as per instructions */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#22C55E]/40 to-[#3B4BF9]/40 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                  {court.type}
                </div>
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-white">{court.name}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-[#22C55E]" />
                  {court.location}
                </div>
                <div className="flex items-center text-white font-bold text-lg">
                  <DollarSign className="w-5 h-5 mr-1 text-[#22C55E]" />
                  {court.price} <span className="text-slate-400 text-sm font-normal ml-1">/ hora</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-slate-800 hover:bg-[#22C55E] text-white border-none rounded-xl transition-colors">
                  Reservar Ahora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourts;
