"use client";
import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown; 
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 py-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {this.state.error instanceof Error
              ? this.state.error.message
              : String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
