import type { AIService } from './types';
import type { RepositoryAnalysis, StyleGuide, IntentPlan, GeneratedFile, ValidationResult } from '../../types';

// Simulates AI processing delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAIProvider implements AIService {
  async analyzeRepository(repoUrl: string): Promise<RepositoryAnalysis> {
    await delay(2000);

    const repoName = repoUrl.split('/').pop() || 'unknown';
    const owner = repoUrl.split('/').slice(-2, -1)[0] || 'unknown';

    return {
      repository: {
        url: repoUrl,
        name: repoName,
        owner: owner,
        branch: 'main',
      },
      fileStructure: [
        {
          pattern: 'src/components/**/*.tsx',
          description: 'React components using TypeScript',
          examples: ['src/components/Button.tsx', 'src/components/Card.tsx'],
        },
        {
          pattern: 'src/utils/**/*.ts',
          description: 'Utility functions',
          examples: ['src/utils/formatDate.ts', 'src/utils/api.ts'],
        },
        {
          pattern: 'src/types/**/*.ts',
          description: 'TypeScript type definitions',
          examples: ['src/types/index.ts', 'src/types/api.ts'],
        },
      ],
      namingConventions: [
        {
          type: 'file',
          convention: 'PascalCase for components, camelCase for utilities',
          description: 'Component files use PascalCase (Button.tsx), utility files use camelCase (formatDate.ts)',
          examples: ['Button.tsx', 'formatDate.ts'],
        },
        {
          type: 'component',
          convention: 'PascalCase',
          description: 'React components use PascalCase naming',
          examples: ['Button', 'UserProfile', 'DataTable'],
        },
        {
          type: 'function',
          convention: 'camelCase',
          description: 'Functions use camelCase naming',
          examples: ['formatDate', 'fetchUserData', 'calculateTotal'],
        },
      ],
      codePatterns: [
        {
          name: 'Functional Components',
          description: 'Uses functional components with hooks',
          code: 'export function Component() { ... }',
          frequency: 95,
        },
        {
          name: 'TypeScript Interfaces',
          description: 'Defines props using TypeScript interfaces',
          code: 'interface ComponentProps { ... }',
          frequency: 90,
        },
        {
          name: 'Named Exports',
          description: 'Prefers named exports over default exports',
          code: 'export function Component() { ... }',
          frequency: 85,
        },
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      frameworks: ['React 19', 'Tailwind CSS 4'],
      analyzedAt: new Date().toISOString(),
    };
  }

  async generateStyleGuide(analysis: RepositoryAnalysis): Promise<StyleGuide> {
    await delay(1500);

    return {
      repository: analysis.repository,
      fileOrganization: `# File Organization

## Directory Structure
- \`src/components/\` - React components
- \`src/utils/\` - Utility functions
- \`src/types/\` - TypeScript type definitions
- \`src/services/\` - API and external services

## File Naming
- Components: PascalCase (e.g., \`Button.tsx\`, \`UserProfile.tsx\`)
- Utilities: camelCase (e.g., \`formatDate.ts\`, \`api.ts\`)
- Types: camelCase (e.g., \`index.ts\`, \`api.ts\`)`,

      namingConventions: `# Naming Conventions

## Components
- Use PascalCase for component names
- Example: \`Button\`, \`UserProfile\`, \`DataTable\`

## Functions
- Use camelCase for function names
- Example: \`formatDate\`, \`fetchUserData\`, \`calculateTotal\`

## Variables
- Use camelCase for variable names
- Use UPPER_CASE for constants
- Example: \`userName\`, \`MAX_RETRIES\`

## Types/Interfaces
- Use PascalCase for type and interface names
- Prefix interfaces with 'I' is not used
- Example: \`UserData\`, \`ApiResponse\``,

      codeStyle: `# Code Style

## Components
- Use functional components with hooks
- Define props using TypeScript interfaces
- Use named exports

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

## Imports
- Group imports: React, third-party, local
- Use absolute imports for src/ files

\`\`\`typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
\`\`\``,

      bestPractices: `# Best Practices

1. **Type Safety**: Always use TypeScript types and interfaces
2. **Component Composition**: Break down complex components into smaller ones
3. **Props Validation**: Define clear prop interfaces
4. **Error Handling**: Handle errors gracefully with try-catch
5. **Performance**: Use React.memo for expensive components
6. **Accessibility**: Include ARIA labels and semantic HTML
7. **Testing**: Write unit tests for utilities and components`,

      generatedAt: new Date().toISOString(),
    };
  }

  async generateIntentPlan(styleGuide: StyleGuide, intent: string): Promise<IntentPlan> {
    await delay(1500);

    // Generate a plan based on the intent
    const fileStructure = [
      {
        path: 'src/components/NewFeature.tsx',
        type: 'file' as const,
        description: 'Main component for the new feature',
        dependencies: ['react', 'lucide-react'],
      },
      {
        path: 'src/components/NewFeatureCard.tsx',
        type: 'file' as const,
        description: 'Card component for displaying feature items',
        dependencies: ['react'],
      },
      {
        path: 'src/utils/newFeatureHelpers.ts',
        type: 'file' as const,
        description: 'Helper functions for the new feature',
        dependencies: [],
      },
      {
        path: 'src/types/newFeature.ts',
        type: 'file' as const,
        description: 'TypeScript types for the new feature',
        dependencies: [],
      },
    ];

    return {
      description: intent,
      fileStructure,
      estimatedFiles: fileStructure.length,
      technologies: styleGuide.repository.name.includes('react')
        ? ['React', 'TypeScript', 'Tailwind CSS']
        : ['TypeScript'],
    };
  }

  async generateFile(plan: IntentPlan, filePath: string, styleGuide: StyleGuide): Promise<GeneratedFile> {
    await delay(2000);

    const fileName = filePath.split('/').pop() || '';
    const isComponent = filePath.includes('components') && fileName.endsWith('.tsx');
    const isUtil = filePath.includes('utils') && fileName.endsWith('.ts');
    const isType = filePath.includes('types') && fileName.endsWith('.ts');

    let content = '';
    const patterns: string[] = [];

    if (isComponent) {
      const componentName = fileName.replace('.tsx', '');
      content = `import type { ReactNode } from 'react';

interface ${componentName}Props {
  children?: ReactNode;
  className?: string;
}

export function ${componentName}({ children, className = '' }: ${componentName}Props) {
  return (
    <div className={\`${componentName.toLowerCase()} \${className}\`}>
      {children}
    </div>
  );
}

// Made with Bob
`;
      patterns.push('Functional Component', 'TypeScript Interface', 'Named Export');
    } else if (isUtil) {
      const utilName = fileName.replace('.ts', '');
      content = `/**
 * ${utilName} utility functions
 */

export function ${utilName}Helper(input: string): string {
  return input.trim();
}

export function validate${utilName.charAt(0).toUpperCase() + utilName.slice(1)}(data: unknown): boolean {
  return data !== null && data !== undefined;
}

// Made with Bob
`;
      patterns.push('Named Exports', 'JSDoc Comments', 'Type Safety');
    } else if (isType) {
      content = `export interface DataItem {
  id: string;
  name: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

// Made with Bob
`;
      patterns.push('TypeScript Interfaces', 'Generic Types', 'Type Aliases');
    }

    return {
      path: filePath,
      content,
      description: `Generated ${isComponent ? 'component' : isUtil ? 'utility' : 'type definition'} following repository patterns`,
      patterns,
      generatedAt: new Date().toISOString(),
    };
  }

  async validateFiles(files: GeneratedFile[], styleGuide: StyleGuide): Promise<ValidationResult[]> {
    await delay(1000);

    return files.map((file) => ({
      file: file.path,
      passed: true,
      checks: [
        {
          name: 'Naming Convention',
          passed: true,
          message: 'File follows repository naming conventions',
          severity: 'info' as const,
        },
        {
          name: 'Code Style',
          passed: true,
          message: 'Code matches repository style patterns',
          severity: 'info' as const,
        },
        {
          name: 'Type Safety',
          passed: true,
          message: 'TypeScript types are properly defined',
          severity: 'info' as const,
        },
        {
          name: 'Best Practices',
          passed: true,
          message: 'Follows repository best practices',
          severity: 'info' as const,
        },
      ],
    }));
  }
}

// Made with Bob