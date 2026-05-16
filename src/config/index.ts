// Application configuration

export const config = {
  ai: {
    provider: (import.meta.env.VITE_AI_PROVIDER || 'mock') as 'openai' | 'anthropic' | 'mock',
    openai: {
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4',
    },
    anthropic: {
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
      model: import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-3-opus-20240229',
    },
  },
  github: {
    token: import.meta.env.VITE_GITHUB_TOKEN || '',
  },
  app: {
    name: 'Repo Guardian',
    version: '1.0.0',
  },
};

export default config;

// Made with Bob