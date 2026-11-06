import React from 'react';
import { HelpCircle, CheckCircle, FileText, Lightbulb, AlertTriangle, Layers, ListFilter } from 'lucide-react';

export const TutorialGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-amber-500/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Guia Prático de Implementação</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Como Criar o Filtro Automático no Excel ou Google Sheets
        </h2>
        <p className="text-slate-300 text-sm mt-1 max-w-3xl">
          Siga este tutorial passo a passo para criar a consulta que traz automaticamente a quantidade de strings associada à célula da UFV e Inversor selecionados.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Estrutura da Matriz de Dados
            </h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Certifique-se de que sua planilha está organizada no formato matricial tradicional:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-2 text-slate-800">
            <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-amber-800">
              <span>Célula A1: "UFV"</span>
              <span>Colunas B1 até BU1: "Inversor 01", "Inversor 02", ...</span>
            </div>
            <div className="text-slate-700">
              <strong>Linha 2 em diante (A2:A125):</strong> Nomes das UFVs (ex: PEP, CAN, TPR UFV 01, BZU UFV 01).
            </div>
            <div className="text-slate-700">
              <strong>Células da Matriz (B2:BU125):</strong> Valores numéricos representando a quantidade de strings.
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Criar as Caixas de Seleção (Listas Suspensas / Validação de Dados)
            </h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Para permitir que o usuário escolha a UFV e o Inversor via menu suspenso:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
                <ListFilter className="w-4 h-4 text-amber-600" />
                <span>Dropdown da UFV (Exemplo em Célula H2)</span>
              </span>
              <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside">
                <li>Clique na célula onde ficará a escolha da UFV (ex: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">H2</code>).</li>
                <li>Vá no menu do Excel: <strong>Dados &gt; Validação de Dados</strong>.</li>
                <li>Em Permitir, escolha <strong>Lista</strong>.</li>
                <li>No campo Fonte, selecione a coluna das UFVs: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">=$A$2:$A$125</code>.</li>
              </ol>
            </div>

            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
                <ListFilter className="w-4 h-4 text-amber-600" />
                <span>Dropdown do Inversor (Exemplo em Célula H3)</span>
              </span>
              <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside">
                <li>Clique na célula do Inversor (ex: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">H3</code>).</li>
                <li>Vá em <strong>Dados &gt; Validação de Dados &gt; Lista</strong>.</li>
                <li>No campo Fonte, selecione a linha do cabeçalho dos inversores: <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">=$B$1:$BU$1</code>.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Aplicar a Fórmula de Busca na Célula de Resultado
            </h3>
          </div>
          <p className="text-slate-600 text-sm">
            Na célula onde deseja exibir o número de strings (ex: <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-900">H4</code>), cole a fórmula abaixo:
          </p>

          <div className="bg-slate-900 text-amber-300 p-4 rounded-xl border border-slate-800 font-mono text-xs select-all">
            =ÍNDICE($B$2:$BU$125; CORRESP(H2; $A$2:$A$125; 0); CORRESP(H3; $B$1:$BU$1; 0))
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">ÍNDICE($B$2:$BU$125)</strong>
              Define a matriz completa onde estão armazenados os valores numéricos das strings.
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">CORRESP(H2; $A$2:$A$125; 0)</strong>
              Procura a posição vertical (linha) onde o nome da UFV selecionada na célula H2 se encontra.
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">CORRESP(H3; $B$1:$BU$1; 0)</strong>
              Procura a posição horizontal (coluna) onde o nome do Inversor na célula H3 se encontra.
            </div>
          </div>
        </div>

        {/* Step 4: Troubleshooting */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 font-bold">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base">Dúvidas Frequentes & Resolução de Erros</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">E se aparecer o erro #N/D ou #N/A?</strong>
              Isso significa que o texto digitado na UFV ou Inversor não foi encontrado exatamente igual. Certifique-se de usar a Lista Suspensa (Validação de Dados) para evitar erros de digitação ou espaços invisíveis no final da célula.
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">E se o filtro do Inversor for apenas um número (ex: 1, 2, 3)?</strong>
              Se a sua lista suspensa tiver apenas o número <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">1</code> e o cabeçalho for <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Inversor 01</code>, ajuste a fórmula concatenando o texto:
              <div className="bg-slate-950 text-amber-300 p-2 rounded mt-1.5 font-mono">
                =ÍNDICE($B$2:$BU$125; CORRESP(H2; $A$2:$A$125; 0); CORRESP("Inversor " & TEXTO(H3; "00"); $B$1:$BU$1; 0))
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
