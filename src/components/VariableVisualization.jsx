import React from 'react';
import { useExecution } from '../context/ExecutionContext';
import { Variable, ArrowRight, Hash, Eye } from 'lucide-react';

export const VariableVisualization = () => {
  const { executionState } = useExecution();

  // Combine global variables and local variables from current stack frame
  const getAllVariables = () => {
    const allVars = { ...executionState.variables };
    
    // Add local variables from the current (top) stack frame
    if (executionState.stackFrames.length > 0) {
      const currentFrame = executionState.stackFrames[executionState.stackFrames.length - 1];
      Object.entries(currentFrame.variables).forEach(([name, variable]) => {
        allVars[`${currentFrame.function}.${name}`] = {
          ...variable,
          scope: currentFrame.function,
          isLocal: true
        };
      });
    }
    
    return allVars;
  };

  const allVariables = getAllVariables();

  if (Object.keys(allVariables).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Variable className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p className="text-sm">No variables yet</p>
        <p className="text-xs text-gray-400 mt-1">Variables will appear here during execution</p>
      </div>
    );
  }

  const getVariableColor = (type, isLocal = false) => {
    const baseColors = {
      'int': 'blue',
      'number': 'blue',
      'str': 'green',
      'string': 'green',
      'bool': 'purple',
      'boolean': 'purple',
      'float': 'orange',
      'list': 'cyan',
      'array': 'cyan',
      'vector<int>': 'cyan'
    };
    
    const color = baseColors[type] || 'gray';
    const intensity = isLocal ? '600' : '500';
    const bgIntensity = isLocal ? '100' : '50';
    const borderIntensity = isLocal ? '300' : '200';
    
    return `text-${color}-${intensity} bg-${color}-${bgIntensity} border-${color}-${borderIntensity}`;
  };

  const formatValue = (variable) => {
    if (variable.reference) {
      // This is a heap reference
      const heapObject = executionState.heapObjects.find(obj => obj.id === variable.reference);
      if (heapObject) {
        if (Array.isArray(heapObject.value)) {
          return `[${heapObject.value.join(', ')}]`;
        }
        return `Object #${heapObject.id}`;
      }
      return `@${variable.reference}`;
    }
    
    if (typeof variable.value === 'string') {
      return `"${variable.value}"`;
    }
    
    return String(variable.value);
  };

  return (
    <div className="space-y-3">
      {Object.entries(allVariables).map(([name, variable]) => (
        <div
          key={name}
          className={`border rounded-xl p-4 transition-all ${getVariableColor(variable.type, variable.isLocal)}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {variable.isLocal && (
                  <Eye className="h-3 w-3 opacity-60" title="Local variable" />
                )}
                <span className="font-mono font-semibold text-lg">
                  {variable.isLocal ? name.split('.')[1] : name}
                </span>
                <span className="text-sm opacity-75">({variable.type})</span>
                {variable.scope && (
                  <span className="text-xs opacity-60 bg-white bg-opacity-50 px-2 py-1 rounded">
                    {variable.scope}
                  </span>
                )}
              </div>
              <ArrowRight className="h-4 w-4 opacity-60" />
              <span className="font-mono text-lg">
                {formatValue(variable)}
              </span>
            </div>
            
            {variable.reference && (
              <div className="flex items-center space-x-1 text-sm opacity-75">
                <Hash className="h-3 w-3" />
                <span className="font-mono">#{variable.reference}</span>
              </div>
            )}
          </div>
          
          {/* Show memory address for heap objects */}
          {variable.reference && (
            <div className="mt-2 pt-2 border-t border-current border-opacity-20">
              <div className="text-xs opacity-75">
                Points to heap object #{variable.reference}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};