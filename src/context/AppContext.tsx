import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Phase, RepositoryAnalysis, StyleGuide, IntentPlan, GeneratedFile, ValidationResult } from '../types';

// Initial state
const initialState: AppState = {
  currentPhase: 'survey',
  repositoryAnalysis: null,
  styleGuide: null,
  intentPlan: null,
  generatedFiles: [],
  validationResults: [],
  isLoading: false,
  error: null,
};

// Action types
type AppAction =
  | { type: 'SET_PHASE'; payload: Phase }
  | { type: 'SET_REPOSITORY_ANALYSIS'; payload: RepositoryAnalysis }
  | { type: 'SET_STYLE_GUIDE'; payload: StyleGuide }
  | { type: 'SET_INTENT_PLAN'; payload: IntentPlan | null }
  | { type: 'ADD_GENERATED_FILE'; payload: GeneratedFile }
  | { type: 'SET_GENERATED_FILES'; payload: GeneratedFile[] }
  | { type: 'SET_VALIDATION_RESULTS'; payload: ValidationResult[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, currentPhase: action.payload };
    case 'SET_REPOSITORY_ANALYSIS':
      return { ...state, repositoryAnalysis: action.payload };
    case 'SET_STYLE_GUIDE':
      return { ...state, styleGuide: action.payload };
    case 'SET_INTENT_PLAN':
      return { ...state, intentPlan: action.payload };
    case 'ADD_GENERATED_FILE':
      return { ...state, generatedFiles: [...state.generatedFiles, action.payload] };
    case 'SET_GENERATED_FILES':
      return { ...state, generatedFiles: action.payload };
    case 'SET_VALIDATION_RESULTS':
      return { ...state, validationResults: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Context type
interface AppContextType {
  state: AppState;
  setPhase: (phase: Phase) => void;
  setRepositoryAnalysis: (analysis: RepositoryAnalysis) => void;
  setStyleGuide: (guide: StyleGuide) => void;
  setIntentPlan: (plan: IntentPlan | null) => void;
  addGeneratedFile: (file: GeneratedFile) => void;
  setGeneratedFiles: (files: GeneratedFile[]) => void;
  setValidationResults: (results: ValidationResult[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextType = {
    state,
    setPhase: (phase) => dispatch({ type: 'SET_PHASE', payload: phase }),
    setRepositoryAnalysis: (analysis) => dispatch({ type: 'SET_REPOSITORY_ANALYSIS', payload: analysis }),
    setStyleGuide: (guide) => dispatch({ type: 'SET_STYLE_GUIDE', payload: guide }),
    setIntentPlan: (plan) => dispatch({ type: 'SET_INTENT_PLAN', payload: plan }),
    addGeneratedFile: (file) => dispatch({ type: 'ADD_GENERATED_FILE', payload: file }),
    setGeneratedFiles: (files) => dispatch({ type: 'SET_GENERATED_FILES', payload: files }),
    setValidationResults: (results) => dispatch({ type: 'SET_VALIDATION_RESULTS', payload: results }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Made with Bob