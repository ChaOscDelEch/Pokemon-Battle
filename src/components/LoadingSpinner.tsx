"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center space-x-2 animate-bounce py-10">
      <div className="h-4 w-4 bg-red-600 rounded-full"></div>
      <div className="h-4 w-4 bg-red-600 rounded-full"></div>
      <div className="h-4 w-4 bg-red-600 rounded-full"></div>
    </div>
  );
}
