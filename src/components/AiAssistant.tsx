import React, { useState } from 'react';
import { Bot, Send, Sparkles, Loader2, MessageSquare, HelpCircle } from 'lucide-react';

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Olá! Sou o Assistente de Fórmulas UFV e Excel. Como posso te ajudar com sua planilha, fórmulas do Excel/Google Sheets ou dúvidas de formatação condicional e validação de dados?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          systemInstruction:
            'Você é um especialista em Excel, Google Sheets e usinas fotovoltaicas (UFVs). Responda com foco prático e didático em português. Explique fórmulas claramente com exemplos de células.',
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Desculpe, ocorreu um erro ao consultar o assistente.' },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Para buscar no Excel, use a fórmula: =ÍNDICE(B2:BU120; CORRESP(UFV_Cel; A2:A120; 0); CORRESP(Inv_Cel; B1:BU1; 0)).',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'Como tratar o erro #N/D quando não encontrar a UFV?',
    'Como criar a lista suspensa (dropdown) no Excel?',
    'Como destacar em vermelho inversores com menos de 10 strings?',
    'Qual a diferença entre ÍNDICE/CORRESP e BUSCAX?',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
            <span>Assistente de Fórmulas e Dúvidas Excel</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-800 px-2 py-0.5 rounded-full font-mono">
              IA Ativa
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Tire dúvidas específicas sobre sua planilha, formatação e erros do Excel
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-xs bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 px-3 py-1.5 rounded-xl transition font-medium flex items-center space-x-1"
          >
            <HelpCircle className="w-3 h-3 text-amber-500" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 max-h-80 overflow-y-auto space-y-3 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-sm'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl text-xs text-slate-500 flex items-center space-x-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
              <span>Pensando e gerando resposta...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua dúvida sobre o Excel ou UFV..."
          disabled={loading}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Enviar</span>
        </button>
      </form>
    </div>
  );
};
