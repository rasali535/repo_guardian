import { useState, useEffect } from 'react';
import { CheckCircle, Download, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { getAIService } from '../../services/ai';
import { exportFilesAsZip } from '../../utils/fileExport';

export function VerifyPhase() {
  const [isValidating, setIsValidating] = useState(false);
  const { state, setValidationResults, resetState } = useApp();
  const { addToast } = useToast();

  useEffect(() => {
    if (state.validationResults.length === 0 && state.generatedFiles.length > 0) {
      validateFiles();
    }
  }, []);

  const validateFiles = async () => {
    if (!state.styleGuide || state.generatedFiles.length === 0) return;

    setIsValidating(true);

    try {
      const aiService = getAIService();
      const results = await aiService.validateFiles(state.generatedFiles, state.styleGuide);
      
      setValidationResults(results);
      addToast({ type: 'success', message: 'Validation complete!' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Validation failed';
      addToast({ type: 'error', message });
    } finally {
      setIsValidating(false);
    }
  };

  const handleDownload = async () => {
    try {
      await exportFilesAsZip(
        state.generatedFiles,
        state.styleGuide,
        state.styleGuide?.repository.name || 'repo-guardian-export'
      );
      addToast({ type: 'success', message: 'Files downloaded successfully!' });
    } catch (error) {
      addToast({ type: 'error', message: 'Failed to download files' });
    }
  };

  const handleStartOver = () => {
    if (confirm('Are you sure you want to start over? All generated files will be lost.')) {
      resetState();
      addToast({ type: 'info', message: 'Starting fresh...' });
    }
  };

  const allPassed = state.validationResults.every((result) => result.passed);
  const totalChecks = state.validationResults.reduce(
    (sum, result) => sum + result.checks.length,
    0
  );
  const passedChecks = state.validationResults.reduce(
    (sum, result) => sum + result.checks.filter((check) => check.passed).length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
              Verification Results
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {isValidating ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-blue-800 font-medium">Validating generated files...</p>
              </div>
            ) : (
              <>
                <div
                  className={`${
                    allPassed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                  } border rounded-lg p-4`}
                >
                  <div className="flex items-center gap-2">
                    {allPassed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    )}
                    <p className={`${allPassed ? 'text-green-800' : 'text-yellow-800'} font-medium`}>
                      {allPassed
                        ? 'All validation checks passed!'
                        : 'Some checks need attention'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {passedChecks} of {totalChecks} checks passed
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Validation Details</h4>
                  <div className="space-y-3">
                    {state.validationResults.map((result, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start gap-3">
                          {result.passed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-mono text-sm font-semibold text-gray-900">
                              {result.file}
                            </p>
                            <div className="mt-2 space-y-2">
                              {result.checks.map((check, checkIndex) => (
                                <div
                                  key={checkIndex}
                                  className={`text-sm p-2 rounded ${
                                    check.passed
                                      ? 'bg-green-50 text-green-800'
                                      : check.severity === 'error'
                                      ? 'bg-red-50 text-red-800'
                                      : check.severity === 'warning'
                                      ? 'bg-yellow-50 text-yellow-800'
                                      : 'bg-blue-50 text-blue-800'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="font-medium">{check.name}:</span>
                                    <span>{check.message}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Ready to Download</h4>
                  <p className="text-sm text-indigo-800 mb-3">
                    Your generated files are ready! Download them as a ZIP package with:
                  </p>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• All generated source files</li>
                    <li>• Complete style guide documentation</li>
                    <li>• README with integration instructions</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleStartOver} variant="outline" className="flex-1">
                    <RefreshCw className="w-5 h-5" />
                    Start Over
                  </Button>
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="w-5 h-5" />
                    Download ZIP
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Made with Bob