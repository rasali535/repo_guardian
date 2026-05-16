import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/layout/Header';
import { Navigator } from './components/layout/Navigator';
import { ToastContainer } from './components/common/Toast';
import { SurveyPhase } from './components/phases/SurveyPhase';
import { StyleGuidePhase } from './components/phases/StyleGuidePhase';
import { IntentPhase } from './components/phases/IntentPhase';
import { ExecutePhase } from './components/phases/ExecutePhase';
import { VerifyPhase } from './components/phases/VerifyPhase';
import type { Phase } from './types';

function AppContent() {
  const { state } = useApp();
  const [completedPhases, setCompletedPhases] = useState<Phase[]>([]);

  useEffect(() => {
    const completed: Phase[] = [];
    if (state.repositoryAnalysis) completed.push('survey');
    if (state.styleGuide) completed.push('style-guide');
    if (state.intentPlan) completed.push('intent');
    if (state.generatedFiles.length > 0) completed.push('execute');
    if (state.validationResults.length > 0) completed.push('verify');
    setCompletedPhases(completed);
  }, [state]);

  const renderPhase = () => {
    switch (state.currentPhase) {
      case 'survey':
        return <SurveyPhase />;
      case 'style-guide':
        return <StyleGuidePhase />;
      case 'intent':
        return <IntentPhase />;
      case 'execute':
        return <ExecutePhase />;
      case 'verify':
        return <VerifyPhase />;
      default:
        return <SurveyPhase />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Navigator currentPhase={state.currentPhase} completedPhases={completedPhases} />
      
      <main className="pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentPhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPhase()}
          </motion.div>
        </AnimatePresence>
      </main>

      {state.isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-900 font-medium">Processing...</p>
              <p className="text-sm text-gray-600 text-center">
                This may take a few moments
              </p>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ToastProvider>
  );
}

export default App;

// Made with Bob
