import { useState, useEffect } from 'react';
import { Code, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { getAIService } from '../../services/ai';

export function ExecutePhase() {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const { state, addGeneratedFile, setPhase } = useApp();
  const { addToast } = useToast();

  const totalFiles = state.intentPlan?.estimatedFiles || 0;
  const progress = totalFiles > 0 ? (state.generatedFiles.length / totalFiles) * 100 : 0;
  const isComplete = state.generatedFiles.length === totalFiles && totalFiles > 0;

  useEffect(() => {
    if (state.intentPlan && state.generatedFiles.length < totalFiles && !isGenerating) {
      generateNextFile();
    }
  }, [state.intentPlan, state.generatedFiles.length]);

  const generateNextFile = async () => {
    if (!state.intentPlan || !state.styleGuide) return;
    if (currentFileIndex >= state.intentPlan.fileStructure.length) return;

    setIsGenerating(true);

    try {
      const fileToGenerate = state.intentPlan.fileStructure[currentFileIndex];
      const aiService = getAIService();
      
      const generatedFile = await aiService.generateFile(
        state.intentPlan,
        fileToGenerate.path,
        state.styleGuide
      );

      addGeneratedFile(generatedFile);
      setCurrentFileIndex((prev) => prev + 1);
      
      addToast({
        type: 'success',
        message: `Generated ${fileToGenerate.path}`,
        duration: 2000,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate file';
      addToast({ type: 'error', message });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContinue = () => {
    setPhase('verify');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-indigo-600" />
              Generating Code
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <ProgressBar
                progress={progress}
                label="Generation Progress"
                showPercentage={true}
              />
              <p className="text-sm text-gray-600 mt-2 text-center">
                {state.generatedFiles.length} of {totalFiles} files generated
              </p>
            </div>

            {isComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 font-medium">
                    All files generated successfully!
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Generated Files</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {state.generatedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm font-semibold text-gray-900 truncate">
                          {file.path}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {file.patterns.map((pattern, i) => (
                            <span
                              key={i}
                              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                            >
                              {pattern}
                            </span>
                          ))}
                        </div>
                        <details className="mt-3">
                          <summary className="text-sm text-indigo-600 cursor-pointer hover:text-indigo-800">
                            View Code
                          </summary>
                          <pre className="mt-2 bg-gray-50 rounded p-3 text-xs overflow-x-auto">
                            <code>{file.content}</code>
                          </pre>
                        </details>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isGenerating && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <p className="text-blue-800">
                        Generating {state.intentPlan?.fileStructure[currentFileIndex]?.path}...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isComplete && (
              <Button onClick={handleContinue} size="lg" className="w-full">
                Continue to Verification
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob