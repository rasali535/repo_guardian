import { useState } from 'react';
import { Search, GitBranch } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { getAIService } from '../../services/ai';

export function SurveyPhase() {
  const [repoUrl, setRepoUrl] = useState('');
  const { setRepositoryAnalysis, setPhase, setLoading, setError } = useApp();
  const { addToast } = useToast();

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      addToast({ type: 'error', message: 'Please enter a repository URL' });
      return;
    }

    // Basic URL validation
    if (!repoUrl.includes('github.com') && !repoUrl.includes('gitlab.com')) {
      addToast({ type: 'warning', message: 'Please enter a valid GitHub or GitLab URL' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const aiService = getAIService();
      const analysis = await aiService.analyzeRepository(repoUrl);
      
      setRepositoryAnalysis(analysis);
      addToast({ type: 'success', message: 'Repository analyzed successfully!' });
      setPhase('style-guide');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze repository';
      setError(message);
      addToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Search className="w-6 h-6 text-indigo-600" />
              Repository Survey
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Analyze Your Repository
              </h3>
              <p className="text-gray-600 mb-4">
                Enter a GitHub or GitLab repository URL to analyze its patterns, conventions, and coding style.
                Repo Guardian will scan the codebase and extract key insights.
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Repository URL"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                helperText="Enter the full URL of the repository you want to analyze"
              />

              <div className="flex gap-3">
                <Button onClick={handleAnalyze} size="lg" className="flex-1">
                  <Search className="w-5 h-5" />
                  Analyze Repository
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <GitBranch className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Scans repository file structure and organization</li>
                    <li>• Detects naming conventions and patterns</li>
                    <li>• Analyzes code style and best practices</li>
                    <li>• Identifies technologies and frameworks used</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Example Repositories</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'https://github.com/facebook/react',
                  'https://github.com/vercel/next.js',
                  'https://github.com/tailwindlabs/tailwindcss',
                  'https://github.com/microsoft/vscode',
                ].map((url) => (
                  <button
                    key={url}
                    onClick={() => setRepoUrl(url)}
                    className="text-left text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-2 rounded transition-colors"
                  >
                    {url}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob