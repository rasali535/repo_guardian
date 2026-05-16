import { useState } from 'react';
import { Lightbulb, ArrowRight, FileCode } from 'lucide-react';
import { Button } from '../common/Button';
import { TextArea } from '../common/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { getAIService } from '../../services/ai';

export function IntentPhase() {
  const [intent, setIntent] = useState('');
  const { state, setIntentPlan, setPhase, setLoading, setError } = useApp();
  const { addToast } = useToast();

  const handleGeneratePlan = async () => {
    if (!intent.trim()) {
      addToast({ type: 'error', message: 'Please describe what you want to build' });
      return;
    }

    if (!state.styleGuide) {
      addToast({ type: 'error', message: 'No style guide found' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const aiService = getAIService();
      const plan = await aiService.generateIntentPlan(state.styleGuide, intent);
      
      setIntentPlan(plan);
      addToast({ type: 'success', message: 'Plan generated successfully!' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate plan';
      setError(message);
      addToast({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = () => {
    setPhase('execute');
  };

  if (!state.intentPlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-indigo-600" />
                Define Your Intent
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What do you want to build?
                </h3>
                <p className="text-gray-600 mb-4">
                  Describe the feature or component you want to create. Be as specific as possible
                  about functionality, structure, and requirements.
                </p>
              </div>

              <TextArea
                label="Feature Description"
                placeholder="Example: Create a user authentication system with login, signup, and password reset functionality. Include form validation, error handling, and integration with a REST API."
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                rows={6}
                helperText="The more detailed your description, the better the generated plan will be"
              />

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Tips for better results:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Be specific about the functionality you need</li>
                  <li>• Mention any specific technologies or patterns to use</li>
                  <li>• Include details about data structures and API interactions</li>
                  <li>• Describe the user experience and UI requirements</li>
                </ul>
              </div>

              <Button onClick={handleGeneratePlan} size="lg" className="w-full">
                <Lightbulb className="w-5 h-5" />
                Generate Plan
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
              <FileCode className="w-6 h-6 text-indigo-600" />
              File Structure Plan
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                ✓ Plan generated: {state.intentPlan.estimatedFiles} files to be created
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Intent</h4>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                {state.intentPlan.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Proposed File Structure</h4>
              <div className="space-y-2">
                {state.intentPlan.fileStructure.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <FileCode className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-mono text-sm font-semibold text-gray-900">
                          {file.path}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                        {file.dependencies && file.dependencies.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {file.dependencies.map((dep, i) => (
                              <span
                                key={i}
                                className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                              >
                                {dep}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {state.intentPlan.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setIntentPlan(null)} variant="outline" className="flex-1">
                Revise Plan
              </Button>
              <Button onClick={handleApprove} className="flex-1">
                Approve & Generate Code
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