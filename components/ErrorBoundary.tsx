import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Error caught silently — no console output in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-deep-teal text-off-white">
          <h1 className="font-display text-4xl mb-4 text-muted-gold">Something went wrong.</h1>
          <p className="text-sm opacity-70 mb-8">We're sorry for the inconvenience. Please refresh the page or contact us directly.</p>
          <a
            href="mailto:sales@bluehouseplanning.ca"
            className="text-xs uppercase tracking-widest border-b border-muted-gold text-muted-gold pb-1 hover:opacity-70 transition-opacity"
          >
            sales@bluehouseplanning.ca
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
