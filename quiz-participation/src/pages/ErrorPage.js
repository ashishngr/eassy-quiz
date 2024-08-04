import React from 'react'

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-lg text-center">
      <h1 className="text-2xl font-bold text-red-600">Error</h1>
      <p className="mt-2 text-lg text-gray-700">Invalid or expired token. Please check the link or contact support.</p>
    </div>
  </div>
  )
}

export default ErrorPage