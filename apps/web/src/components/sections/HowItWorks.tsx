import { Search, CalendarDays, Trophy } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Busca",
    description: "Encuentra la cancha ideal por ubicación, tipo (5, 7 u 11) y horario.",
  },
  {
    icon: CalendarDays,
    title: "Reserva",
    description: "Selecciona el horario disponible y confirma tu reserva en segundos.",
  },
  {
    icon: Trophy,
    title: "Juega",
    description: "Llega a la cancha con tus amigos y disfruta de tu partido sin complicaciones.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cómo funciona</h2>
          <div className="w-20 h-1.5 bg-[#22C55E] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#22C55E]/10 group-hover:scale-110 transition-all border border-slate-700 group-hover:border-[#22C55E]/50">
                <step.icon className="w-10 h-10 text-[#22C55E]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
