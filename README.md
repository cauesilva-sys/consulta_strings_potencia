# Consulta de Potência e Strings da UFV (GDSUN)

Aplicação web interativa para consulta rápida da matriz de Usinas Fotovoltaicas (UFVs), inversores, quantidade de strings, rastreadores solares (trackers), potência instalada e gerador de fórmulas para Excel/Google Sheets.

---

## 🚀 Como Publicar na Vercel

O projeto já está 100% configurado para a Vercel com Vite (`vercel.json` incluso).

### Opção 1: Via GitHub (Recomendado)
1. Crie um novo repositório no seu GitHub (ex: `gdsun-consulta-strings`).
2. Suba todos os arquivos deste projeto para o GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: site consulta strings gdsun"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/gdsun-consulta-strings.git
   git push -u origin main
   ```
3. Acesse [vercel.com](https://vercel.com) e faça login.
4. Clique em **"Add New..."** ➜ **"Project"**.
5. Selecione o repositório que você acabou de criar no GitHub.
6. A Vercel detectará automaticamente o framework **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. *(Opcional)* Em **Environment Variables**, adicione `GEMINI_API_KEY` caso queira ativar o assistente de IA com perguntas livres. Se não adicionar, o assistente funcionará com respostas locais automáticas.
8. Clique em **"Deploy"**. Pronto! O site estará no ar em poucos segundos em um link gratuito `.vercel.app`.

---

### Opção 2: Direto pelo Vercel CLI (Sem GitHub)
Se preferir publicar diretamente do seu computador:
```bash
# 1. Instale o Vercel CLI
npm install -g vercel

# 2. Na pasta do projeto, execute:
vercel

# 3. Responda 'y' para confirmar o projeto e 'Enter' nas configurações padrão.
# 4. Para atualizar em produção:
vercel --prod
```

---

## 💻 Como Rodar Localmente no seu Computador

Requisitos: **Node.js 18+** instalado.

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador em: [http://localhost:3000](http://localhost:3000)

4. Para gerar a versão de produção:
   ```bash
   npm run build
   ```

---

## 📁 Estrutura do Projeto

```
├── api/
│   └── chat.ts                  # Serverless function Vercel para assistente IA
├── public/
│   └── projeto-gdsun-strings.zip# Pacote completo do projeto para download
├── src/
│   ├── App.tsx                  # Componente raiz com navegação e abas
│   ├── index.css                # Estilos globais Tailwind CSS
│   ├── main.tsx                 # Ponto de entrada React
│   ├── types.ts                 # Interfaces TypeScript
│   ├── components/
│   │   ├── Header.tsx           # Barra superior com logo e navegação
│   │   ├── UfvLookupSimulator.tsx # Simulador visual interativo de UFV, Inversor e Strings
│   │   ├── UfvMatrixTable.tsx   # Tabela completa da matriz com filtros
│   │   ├── FormulaGenerator.tsx # Gerador de fórmulas Excel/Sheets
│   │   ├── TutorialGuide.tsx    # Guia passo a passo com exemplos
│   │   ├── AiAssistant.tsx      # Assistente para dúvidas de fórmulas e planilhas
│   │   └── ErrorBoundary.tsx    # Tratamento de erros React
│   ├── data/
│   │   └── ufvData.ts           # Base de dados oficial de 126 usinas, strings e trackers
│   └── utils/
│       └── colorUtils.ts        # Utilitários de cores e badges
├── index.html                   # HTML da aplicação
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração do TypeScript
├── vercel.json                  # Configuração de rotas e build da Vercel
└── vite.config.ts               # Configuração do Vite e plugins
```
