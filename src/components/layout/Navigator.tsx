import { motion } from 'framer-motion';
import { Search, FileText, Lightbulb, Code, CheckCircle } from 'lucide-react';
import type { Phase } from '../../types';

interface NavigatorProps {
  currentPhase: Phase;
  completedPhases: Phase[];
}

const phases = [
  { id: 'survey' as Phase, label: 'Survey', icon: Search, description: 'Analyze repository' },
  { id: 'style-guide' as Phase, label: 'Style Guide', icon: FileText, description: 'Generate guide' },
  { id: 'intent' as Phase, label: 'Intent', icon: Lightbulb, description: 'Define plan' },
  { id: 'execute' as Phase, label: 'Execute', icon: Code, description: 'Generate code' },
  { id: 'verify' as Phase, label: 'Verify', icon: CheckCircle, description: 'Validate results' },
];

export function Navigator({ currentPhase, completedPhases }: NavigatorProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isCompleted = completedPhases.includes(phase.id);
            const isCurrent = phase.id === currentPhase;

            return (
              <div key={phase.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted
                        ? '#10b981'
                        : isCurrent
                        ? '#4f46e5'
                        : '#e5e7eb',
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'text-white'
                        : isCurrent
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        isCurrent ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {phase.label}
                    </p>
                    <p className="text-xs text-gray-500">{phase.description}</p>
                  </div>
                </div>
                {index < phases.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200 mx-4 mt-[-40px]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Made with Bob