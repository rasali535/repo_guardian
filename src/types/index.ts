// Core application types

export type Phase = 'survey' | 'style-guide' | 'intent' | 'execute' | 'verify';

export interface RepositoryInfo {
  url: string;
  name: string;
  owner: string;
  branch: string;
}

export interface FilePattern {
  pattern: string;
  description: string;
  examples: string[];
}

export interface NamingConvention {
  type: 'file' | 'variable' | 'function' | 'class' | 'component';
  convention: string;
  description: string;
  examples: string[];
}

export interface CodePattern {
  name: string;
  description: string;
  code: string;
  frequency: number;
}

export interface RepositoryAnalysis {
  repository: RepositoryInfo;
  fileStructure: FilePattern[];
  namingConventions: NamingConvention[];
  codePatterns: CodePattern[];
  technologies: string[];
  frameworks: string[];
  analyzedAt: string;
}

export interface StyleGuide {
  repository: RepositoryInfo;
  fileOrganization: string;
  namingConventions: string;
  codeStyle: string;
  bestPractices: string;
  generatedAt: string;
}

export interface FileStructurePlan {
  path: string;
  type: 'file' | 'directory';
  description: string;
  dependencies?: string[];
}

export interface IntentPlan {
  description: string;
  fileStructure: FileStructurePlan[];
  estimatedFiles: number;
  technologies: string[];
}

export interface GeneratedFile {
  path: string;
  content: string;
  description: string;
  patterns: string[];
  generatedAt: string;
}

export interface ValidationResult {
  file: string;
  passed: boolean;
  checks: ValidationCheck[];
}

export interface ValidationCheck {
  name: string;
  passed: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface AppState {
  currentPhase: Phase;
  repositoryAnalysis: RepositoryAnalysis | null;
  styleGuide: StyleGuide | null;
  intentPlan: IntentPlan | null;
  generatedFiles: GeneratedFile[];
  validationResults: ValidationResult[];
  isLoading: boolean;
  error: string | null;
}

export type AIProvider = 'openai' | 'anthropic' | 'mock';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

// Made with Bob