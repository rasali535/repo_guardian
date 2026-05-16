import type { RepositoryAnalysis, StyleGuide, IntentPlan, GeneratedFile, ValidationResult } from '../../types';

export interface AIService {
  analyzeRepository(repoUrl: string): Promise<RepositoryAnalysis>;
  generateStyleGuide(analysis: RepositoryAnalysis): Promise<StyleGuide>;
  generateIntentPlan(styleGuide: StyleGuide, intent: string): Promise<IntentPlan>;
  generateFile(plan: IntentPlan, filePath: string, styleGuide: StyleGuide): Promise<GeneratedFile>;
  validateFiles(files: GeneratedFile[], styleGuide: StyleGuide): Promise<ValidationResult[]>;
}

// Made with Bob