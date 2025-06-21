import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeEditor } from './components/CodeEditor';
import { VisualizationPanel } from './components/VisualizationPanel';
import { ControlPanel } from './components/ControlPanel';
import { InputOutput } from './components/InputOutput';
import { ExecutionProvider } from './context/ExecutionContext';

function App() {
  return (
    <ExecutionProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        
        <main className="flex flex-col gap-6 p-6 max-w-[1800px] mx-auto">
          {/* Top Row - Code Editor, Input/Output, Call Stack */}
          <div className="grid grid-cols-12 gap-6 h-[600px]">
            {/* Code Editor - Left side (5 columns) */}
            <div className="col-span-5">
              <CodeEditor />
            </div>
            
            {/* Input/Output - Middle (3 columns) */}
            <div className="col-span-3">
              <InputOutput />
            </div>
            
            {/* Call Stack - Right side (4 columns) */}
            <div className="col-span-4">
              <VisualizationPanel showOnlyStack={true} />
            </div>
          </div>
          
          {/* Bottom Row - Control Panel and Heap Memory */}
          <div className="grid grid-cols-12 gap-6">
            {/* Control Panel - Left side (5 columns) */}
            <div className="col-span-5">
              <ControlPanel />
            </div>
            
            {/* Heap Memory - Right side (7 columns) */}
            <div className="col-span-7">
              <VisualizationPanel showOnlyHeap={true} />
            </div>
          </div>
        </main>
      </div>
    </ExecutionProvider>
  );
}

export default App;