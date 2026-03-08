import React from 'react';
import { 
  Wrench, 
  MonitorSmartphone, 
  PackageSearch, 
  LineChart, 
  ScanFace, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-black text-gray-800">
            <Wrench className="text-orange-500" size={32} />
            <span>FK <span className="text-blue-600">Oficina</span></span>
          </div>
          <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
            <a href="#recursos" className="hover:text-blue-600 transition-colors">Recursos</a>
            <a href="#api" className="hover:text-blue-600 transition-colors">API Facial</a>
            <a href="#planos" className="hover:text-blue-600 transition-colors">Planos</a>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-200">
            Acessar Sistema
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-sm mb-6 border border-blue-500/30">
              Gestão Inteligente para Assistências
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              A operação completa para sua assistência, <span className="text-orange-400">em um só lugar.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
              Da entrada do aparelho ao pós-venda. Controle ordens de serviço, estoque, financeiro e inove com nossa API de reconhecimento facial exclusiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-orange-500/30">
                Teste Grátis Agora <ChevronRight size={20} />
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                Falar com Consultor
              </button>
            </div>
          </div>
          
          {/* Mockup do Dashboard */}
          <div className="relative hidden lg:block perspective-1000">
            <div className="w-full h-80 bg-slate-700 rounded-2xl border border-slate-600 shadow-2xl overflow-hidden flex items-center justify-center relative">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
               {/* DICA: Coloque sua imagem real na pasta 'public' com o nome 'dashboard.png' */}
               <img 
                 src="/dashboard.png" 
                 alt="Dashboard FK Oficina" 
                 className="object-cover w-full h-full opacity-80"
               />
               <span className="absolute z-20 text-slate-300 font-mono text-sm border border-slate-500 px-4 py-2 rounded bg-slate-800/80 backdrop-blur-sm">
                 Dashboard Em Tempo Real
               </span>
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tudo o que você precisa para crescer</h2>
            <p className="text-gray-600 text-lg">Substitua planilhas e sistemas antigos por uma plataforma moderna, rápida e integrada.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MonitorSmartphone size={24} />}
              title="Ordens de Serviço (OS)"
              description="Controle total de chamados e manutenções de celulares e eletrônicos. Acompanhe status, prazos e laudos técnicos."
            />
            <FeatureCard 
              icon={<PackageSearch size={24} />}
              title="Controle de Estoque"
              description="Gestão de peças, produtos e empréstimos. Alertas de estoque baixo e inventário integrado ao balcão de vendas."
            />
            <FeatureCard 
              icon={<LineChart size={24} />}
              title="Financeiro e PDV"
              description="Fluxo de caixa, contas a pagar/receber, crediário, emissão de orçamentos, recibos e integração com QR Code."
            />
          </div>
        </div>
      </section>

      {/* API DE RECONHECIMENTO FACIAL */}
      <section id="api" className="py-24 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6 text-blue-200">
                <ScanFace size={32} />
                <span className="font-bold tracking-wider uppercase text-sm">Produto Exclusivo</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Eleve a segurança com nossa API de Reconhecimento Facial
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Além do sistema de gestão, o FK Oficina oferece uma API poderosa de Biometria Facial. Ideal para controle de ponto dos seus técnicos, autorização de descontos no PDV e identificação rápida de clientes recorrentes.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Prevenção contra fraudes no fechamento de caixa',
                  'Integração via RESTful (Fácil de plugar em outros apps)',
                  'Processamento ultrarrápido (Resposta em < 200ms)',
                  'Alta precisão com mapeamento 3D'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-300 shrink-0" size={24} />
                    <span className="text-blue-50 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-900/20">
                Conhecer a API Rest
              </button>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400 font-mono text-sm">POST /api/v1/verify-face</span>
              </div>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                <code>
{`{
  "status": "success",
  "data": {
    "match": true,
    "confidence_score": 0.998,
    "user": {
      "id": "fk_7890",
      "name": "João Técnico",
      "role": "admin"
    }
  },
  "message": "Autenticação aprovada."
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="bg-slate-900 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <ShieldCheck className="mx-auto text-orange-500 mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para modernizar sua oficina?</h2>
          <p className="text-slate-400 mb-8 text-lg">Junte-se a dezenas de assistências que otimizaram seus fluxos e aumentaram a segurança com o FK Oficina.</p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-xl transition-all shadow-xl shadow-blue-600/20">
            Criar Minha Conta Agora
          </button>
        </div>
      </section>

    </div>
  );
}

export default App;