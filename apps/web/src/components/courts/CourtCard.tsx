import Link from 'next/link';
import { MapPin, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Court, CourtType } from "@supartido/shared";

interface CourtCardProps {
  court: Court;
}

const getCourtTypeLabel = (type: CourtType) => {
  switch (type) {
    case CourtType.FIVE_VS_FIVE: return 'Fútbol 5';
    case CourtType.SIX_VS_SIX: return 'Fútbol 6';
    case CourtType.SEVEN_VS_SEVEN: return 'Fútbol 7';
    case CourtType.ELEVEN_VS_ELEVEN: return 'Fútbol 11';
    default: return type;
  }
};

const CourtCard = ({ court }: CourtCardProps) => {
  const mainImage = court.images?.[0]?.url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800';

  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-[#22C55E]/50 transition-all rounded-2xl group">
      <Link href={`/canchas/${court.id}`}>
        <div className="h-48 w-full relative bg-slate-800 cursor-pointer overflow-hidden">
          <img 
            src={mainImage} 
            alt={court.name} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
            {getCourtTypeLabel(court.type)}
          </div>
        </div>
      </Link>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold text-white group-hover:text-[#22C55E] transition-colors">{court.name}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-slate-400 text-sm">
          <MapPin className="w-4 h-4 mr-2 text-[#22C55E]" />
          {court.address}, {court.city}
        </div>
        <div className="flex items-center text-white font-bold text-lg">
          <DollarSign className="w-5 h-5 mr-1 text-[#22C55E]" />
          {new Intl.NumberFormat('es-CL').format(court.pricePerHour)} <span className="text-slate-400 text-sm font-normal ml-1">/ hora</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/canchas/${court.id}`} className="w-full">
          <Button className="w-full bg-slate-800 hover:bg-[#22C55E] text-white border-none rounded-xl transition-colors">
            Ver Detalle
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourtCard;
