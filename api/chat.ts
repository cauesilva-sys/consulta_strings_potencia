import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, systemInstruction } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        text: 'Dica: Para consultas no Excel de UFV x Inversor, a melhor fórmula é ÍNDICE com CORRESP bidimensional: =ÍNDICE(B2:BU120; CORRESP("NomeUFV"; A2:A120; 0); CORRESP("Inversor 01"; B1:BU1; 0)).',
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text:
                (systemInstruction ? `${systemInstruction}\n\n` : '') +
                (prompt || 'Como funciona a fórmula ÍNDICE CORRESP no Excel?'),
            },
          ],
        },
      ],
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || 'Falha ao processar requisição AI.',
    });
  }
}
