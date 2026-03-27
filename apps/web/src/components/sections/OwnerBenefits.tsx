import { Zap, Users, BarChart3, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Más visibilidad",
    description: "Miles de jugadores en Iquique y Alto Hospicio buscando cancha cada día.",
  },
  {
    icon: BarChart3,
    title: "Gestión fácil",
    description: "Panel intuitivo para controlar horarios, precios y reservas en tiempo real.",
  },
  {
    icon: CreditCard,
    title: "Pagos automáticos",
    description: "Recibe el dinero directamente en tu cuenta con seguridad y sin demoras.",
  },
  {
    icon: Users,
    title: "Fideliza clientes",
    description: "Crea promociones y mantén a tus jugadores regresando siempre.",
  },
];

const OwnerBenefits = () => {
  return (
    <section id="para-duenos" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Para dueños de canchas</h2>
          <div className="w-20 h-1.5 bg-[#22C55E] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-[#0F172A] p-8 rounded-2xl border border-slate-800 hover:border-[#22C55E]/50 transition-all">
              <benefit.icon className="w-10 h-10 text-[#22C55E] mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-[#22C55E]/20">
            Registrar mi complejo deportivo
          </button>
        </div>
      </div>
    </section>
  );
};

export default OwnerBenefits;
