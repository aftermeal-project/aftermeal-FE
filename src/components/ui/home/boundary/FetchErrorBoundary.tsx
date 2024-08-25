import React, { ReactNode } from 'react';
import ErrorScreen from '../../../error/ErrorScreen';
import { errorMessages } from '../../../../constants';

interface FetchErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface FetchErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class FetchErrorBoundary extends React.Component<
  FetchErrorBoundaryProps,
  FetchErrorBoundaryState
> {
  constructor(props: FetchErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): FetchErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const message = this.state.error.message;
      const messages = Object.values(errorMessages);

      if (messages.includes(message)) {
        return <ErrorScreen title="Oops" description={message} />;
      } else {
        return this.props.fallback;
      }
    } else if (this.state.hasError) {
      return this.props.fallback;
    } else {
      return this.props.children;
    }
  }
}

export default FetchErrorBoundary;
