import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UfvLookupSimulator } from './components/UfvLookupSimulator';
import { FormulaGenerator } from './components/FormulaGenerator';
import { UfvMatrixTable } from './components/UfvMatrixTable';
import { TutorialGuide } from './components/TutorialGuide';
import { ExcelDownloadView } from './components/ExcelDownloadView';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'formulas' | 'matrix' | 'tutorial' | 'excel'>('simulator');

  useEffect(() => {
    document.title = 'Consulta de Strings - Matriz UFV';
  }, []);

  return (
    <ErrorBoundary fallbackTitle="Erro ao carregar a aplicação">
      <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
        {/* Top Bar Header with Navigation Tabs */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Render Tab Content */}
          {activeTab === 'simulator' && (
            <ErrorBoundary fallbackTitle="Erro no Simulador de Consulta">
              <UfvLookupSimulator
                onGoToFormulas={() => setActiveTab('formulas')}
                onGoToExcel={() => setActiveTab('excel')}
              />
            </ErrorBoundary>
          )}

          {activeTab === 'excel' && (
            <ErrorBoundary fallbackTitle="Erro na aba do Excel">
              <ExcelDownloadView />
            </ErrorBoundary>
          )}

          {activeTab === 'formulas' && (
            <ErrorBoundary fallbackTitle="Erro no Gerador de Fórmulas">
              <FormulaGenerator />
            </ErrorBoundary>
          )}

          {activeTab === 'matrix' && (
            <ErrorBoundary fallbackTitle="Erro na Matriz Completa">
              <UfvMatrixTable
                onSelectCell={(_ufvId, _inverterIndex) => {
                  setActiveTab('simulator');
                }}
              />
            </ErrorBoundary>
          )}

          {activeTab === 'tutorial' && (
            <ErrorBoundary fallbackTitle="Erro no Guia Tutorial">
              <TutorialGuide />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
