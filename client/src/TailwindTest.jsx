import React from 'react';

export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Tailwind CSS is Working!
        </h1>
        <p className="text-gray-600 mb-6">
          This component uses various Tailwind classes to verify the setup is correct.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Primary Button
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200">
            Secondary Button
          </button>
        </div>
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p className="font-medium">Success!</p>
          <p className="text-sm">Tailwind CSS is properly configured and working.</p>
        </div>
      </div>
    </div>
  );
}