import React from 'react';

const LabEval: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#4C9AFF] shadow-[4px_4px_0px_#BFDBFE] p-3 rounded-2xl text-white">
            <span className="material-symbols-outlined text-4xl">calculate</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">LAB EVAL - 2</h1>
            <p className="text-base text-[#4c739a] font-semibold">Math for Autism Kids</p>
          </div>
        </div>

        <div className="bg-white border-2 border-blue-100 rounded-3xl p-8 shadow-md text-center">
          <span className="material-symbols-outlined text-7xl text-[#4C9AFF] mb-4 block">science</span>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to Lab Eval 2!</h2>
          <p className="text-gray-500 font-medium">Fun math activities designed for autism kids will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default LabEval;
