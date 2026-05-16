import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🛡️ Repo Guardian
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          AI-Powered Repository Pattern Analysis & Code Generation
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <p className="text-gray-600 mb-4">
            Application is being set up...
          </p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Count: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

// Made with Bob
