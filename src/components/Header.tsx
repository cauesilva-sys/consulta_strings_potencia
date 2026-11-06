import React, { useState } from 'react';
import { Sun, Table, FileSpreadsheet, Sparkles, HelpCircle, Download, UploadCloud, X, Copy, Check } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'formulas' | 'matrix' | 'tutorial';
  setActiveTab: (tab: 'simulator' | 'formulas' | 'matrix' | 'tutorial') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-orange-500/20">
              <Sun className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-100 tracking-tight">
                Consulta de Potência e Strings da UFV
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulador / Filtro</span>
            </button>

            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'formulas'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Gerador de Fórmulas</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'matrix'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Matriz Completa</span>
            </button>

            <button
              onClick={() => setActiveTab('tutorial')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'tutorial'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Passo a Passo</span>
            </button>

            {/* Vercel & Download Project Button */}
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/50 hover:text-emerald-200 transition-colors ml-2 shadow-sm"
              title="Baixar código fonte ou publicar na Vercel"
            >
              <Download className="w-4 h-4" />
              <span>Deploy Vercel</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Vercel / Export Modal */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-100">Como Publicar este Site na Vercel</h3>
                  <p className="text-xs text-slate-400">Código pronto, compilado e configurado para o Vercel</p>
                </div>
              </div>
              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-6">
              {/* Card 1: Baixar ZIP */}
              <div className="bg-gradient-to-r from-emerald-950/50 to-slate-800/60 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-emerald-300 text-sm flex items-center gap-1.5">
                    <Download className="w-4 h-4" />
                    Opção Mais Rápida: Baixar Arquivos (.ZIP)
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Baixe o código fonte completo com todos os 126 dados de UFV, fórmulas, estilos e configurações.
                  </p>
                </div>
                <a
                  href="/projeto-gdsun-strings.zip"
                  download="projeto-gdsun-strings.zip"
                  className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 whitespace-nowrap shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar ZIP do Projeto</span>
                </a>
              </div>

              {/* Card 2: Passo a Passo Vercel */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Passo a Passo para Vercel:</h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex gap-2.5 items-start p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                    <div>
                      <p className="font-medium text-slate-200">Extraia o arquivo .ZIP ou crie um repositório no GitHub</p>
                      <p className="text-slate-400 mt-0.5">Suba a pasta para o seu GitHub pessoal ou da empresa.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                    <div>
                      <p className="font-medium text-slate-200">Acesse vercel.com e importe o repositório</p>
                      <p className="text-slate-400 mt-0.5">Faça login com sua conta GitHub e clique em <strong>"Add New..." ➜ "Project"</strong>.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                    <div>
                      <p className="font-medium text-slate-200">A Vercel já reconhece tudo automaticamente:</p>
                      <ul className="list-disc list-inside text-slate-400 mt-1 space-y-0.5 pl-1">
                        <li><strong>Framework Preset:</strong> Vite</li>
                        <li><strong>Build Command:</strong> npm run build</li>
                        <li><strong>Output Directory:</strong> dist</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start p-3 bg-slate-800/60 rounded-lg border border-slate-700/50">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                    <div>
                      <p className="font-medium text-slate-200">Clique em "Deploy"</p>
                      <p className="text-slate-400 mt-0.5">Em menos de 1 minuto seu site estará online com domínio HTTPS seguro e gratuito!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Comandos de Terminal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Comandos Git / Terminal:</h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `# No terminal da pasta extraída:\ngit init\ngit add .\ngit commit -m "feat: site consulta strings gdsun"\ngit branch -M main\n# Vincule ao seu repositório no GitHub:\ngit remote add origin https://github.com/SEU-USUARIO/gdsun-consulta-strings.git\ngit push -u origin main`
                      );
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Comandos'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto space-y-1">
                  <p className="text-slate-500"># 1. No terminal da pasta do projeto:</p>
                  <p>git init</p>
                  <p>git add .</p>
                  <p>git commit -m "feat: site consulta strings gdsun"</p>
                  <p>git branch -M main</p>
                  <p className="text-slate-500 mt-2"># 2. Vincule ao seu repositório no GitHub e envie:</p>
                  <p>git remote add origin https://github.com/SEU-USUARIO/gdsun-strings.git</p>
                  <p>git push -u origin main</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800 px-2 py-1.5 space-x-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
            activeTab === 'simulator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulador</span>
        </button>

        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
            activeTab === 'formulas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Fórmulas</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
            activeTab === 'matrix' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Matriz</span>
        </button>

        <button
          onClick={() => setActiveTab('tutorial')}
          className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
            activeTab === 'tutorial' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tutorial</span>
        </button>

        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="flex-shrink-0 flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap text-emerald-300 bg-emerald-950/80 border border-emerald-500/40"
        >
          <Download className="w-3 h-3" />
          <span>Vercel / ZIP</span>
        </button>
      </div>
    </header>
  );
};
