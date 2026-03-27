import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-[#334155] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#22C55E] to-[#16A34A] bg-clip-text text-transparent mb-6 block">
              SuPartido
            </span>
            <p className="text-slate-400 max-w-sm">
              La plataforma líder en reserva de canchas del norte de Chile. Conectamos pasión con deporte en segundos.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4">
              <li><Link href="#canchas" className="text-slate-400 hover:text-[#22C55E] transition-colors">Ver Canchas</Link></li>
              <li><Link href="#como-funciona" className="text-slate-400 hover:text-[#22C55E] transition-colors">Cómo funciona</Link></li>
              <li><Link href="/login" className="text-slate-400 hover:text-[#22C55E] transition-colors">Iniciar Sesión</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Empresa</h4>
            <ul className="space-y-4">
              <li><Link href="#para-duenos" className="text-slate-400 hover:text-[#22C55E] transition-colors">Para Dueños</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-[#22C55E] transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-[#22C55E] transition-colors">Términos</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SuPartido. Todos los derechos reservados.
          </p>
          <p className="text-slate-500 text-sm flex items-center">
            Powered by <span className="text-white font-bold ml-1">EVONOVA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
