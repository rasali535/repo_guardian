import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Repo Guardian</h1>
            <p className="text-sm text-gray-600">AI-Powered Repository Pattern Analysis & Code Generation</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// Made with Bob