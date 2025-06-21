import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Terminal, FileInput as Input, FileOutput as Output } from 'lucide-react';

export const InputOutput = () => {
  const { testInput, setTestInput, executionState } = useExecution();

  return (
    <div className="flex flex-col space-y-6 h-full">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex-1">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
              <Input className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Test Input</h3>
          </div>
        </div>
        <div className="p-6 h-[calc(100%-80px)]">
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter test input (optional)..."
            className="w-full h-full p-4 border border-gray-200 rounded-xl font-mono text-sm bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-gray-800 caret-blue-500"
            style={{ caretColor: '#3B82F6' }}
          />
          <p className="text-xs text-gray-500 mt-2">
            Provide input that your program might need (one value per line)
          </p>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex-1">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-lg">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Terminal Output</h3>
          </div>
        </div>
        <div className="p-6 h-[calc(100%-80px)]">
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {executionState.output.length > 0 ? (
              <div className="space-y-0">
                {executionState.output.map((line, index) => (
                  <div key={index} className="flex items-start space-x-3 hover:bg-gray-800 hover:bg-opacity-50 px-2 py-1 rounded">
                    <span className="text-gray-500 text-xs font-mono select-none min-w-[2rem] text-right">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-green-400 whitespace-pre-wrap flex-1">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-3 text-gray-500 italic">
                <span className="text-gray-600 text-xs font-mono select-none min-w-[2rem] text-right">
                  01
                </span>
                <span>Terminal output will appear here...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};