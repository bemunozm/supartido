import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden bg-[#0F172A]">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#22C55E]/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Reservá tu <span className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] bg-clip-text text-transparent">cancha</span> en segundos
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          La forma más rápida y moderna de armar tu partido en Iquique y Alto Hospicio. Sin llamadas, sin vueltas, directo a la cancha.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto bg-[#22C55E] hover:bg-[#16A34A] text-white text-lg px-8 py-6 rounded-xl border-none font-bold">
            Ver Canchas
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 text-lg px-8 py-6 rounded-xl font-bold backdrop-blur-sm">
            Registrar mi Cancha
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
