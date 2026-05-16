import type { AIService } from './types';
import { MockAIProvider } from './mockProvider';
import config from '../../config';

export function getAIService(): AIService {
  const provider = config.ai.provider;

  switch (provider) {
    case 'mock':
      return new MockAIProvider();
    case 'openai':
      // TODO: Implement OpenAI provider
      console.warn('OpenAI provider not implemented yet, falling back to mock');
      return new MockAIProvider();
    case 'anthropic':
      // TODO: Implement Anthropic provider
      console.warn('Anthropic provider not implemented yet, falling back to mock');
      return new MockAIProvider();
    default:
      return new MockAIProvider();
  }
}

export * from './types';

// Made with Bob