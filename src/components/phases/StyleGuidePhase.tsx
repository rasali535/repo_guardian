import { FileText, Download, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { getAIService } from '../../services/ai';
import { downloadFile } from '../../utils/fileExport';

export function StyleGuidePhase() {
  const { state, setStyleGuide, setPhase, setLoading, setError } = useApp();
  const { addToast } = useToast();

  const handleGenerate = async () => {
    if (!state.repositoryAnalysis) {
      addToast({ type: 'error', message: 'No repository analysis found' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const aiService = getAIService();
      const guide = await aiService.generateStyleGuide(state.repositoryAnalysis);
      
      setStyleGuide(guide);
      addToast({ type: 'success', message: 'Style guide generated successfully!' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate style guide';
      setError(message);
      addToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!state.styleGuide) return;

    const content = `# Style Guide

Repository: ${state.styleGuide.repository.url}
Generated: ${new Date(state.styleGuide.generatedAt).toLocaleString()}

---

${state.styleGuide.fileOrganization}

---

${state.styleGuide.namingConventions}

---

${state.styleGuide.codeStyle}

---

${state.styleGuide.bestPractices}
`;

    downloadFile(content, 'style-guide.md', 'text/markdown');
    addToast({ type: 'success', message: 'Style guide downloaded!' });
  };

  const handleContinue = () => {
    setPhase('intent');
  };

  if (!state.styleGuide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                Generate Style Guide
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Create Comprehensive Style Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Based on the repository analysis, we'll generate a detailed style guide that documents
                  all patterns, conventions, and best practices found in the codebase.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">Style Guide Includes:</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li>• File organization and directory structure</li>
                  <li>• Naming conventions for files, functions, and variables</li>
                  <li>• Code style patterns and formatting rules</li>
                  <li>• Best practices and common patterns</li>
                </ul>
              </div>

              <Button onClick={handleGenerate} size="lg" className="w-full">
                <FileText className="w-5 h-5" />
                Generate Style Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              Style Guide Generated
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                ✓ Style guide successfully generated for {state.styleGuide.repository.name}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">File Organization</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {state.styleGuide.fileOrganization}
                </pre>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Naming Conventions</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {state.styleGuide.namingConventions}
                </pre>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Code Style</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {state.styleGuide.codeStyle}
                </pre>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                <Download className="w-5 h-5" />
                Download Style Guide
              </Button>
              <Button onClick={handleContinue} className="flex-1">
                Continue to Intent
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob