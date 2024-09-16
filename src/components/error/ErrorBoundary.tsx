import { PropsWithChildren, ComponentType, Component, ReactNode } from 'react';
import { HTTPError } from '../../libs/utils/http-error';

export interface ErrorProps {
  statusCode?: number;
  resetError?: () => void;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  Fallback: ComponentType<ErrorProps>;
  onReset?: (error: Error | HTTPError) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | HTTPError | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.captureReject = this.captureReject.bind(this);
    this.handleResetErrorBoundary = this.handleResetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error | HTTPError) {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.captureReject);
  }

  captureReject(e: PromiseRejectionEvent) {
    e.preventDefault();

    this.setState({ hasError: true, error: e.reason });
  }

  handleResetErrorBoundary() {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    const { Fallback, children } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <Fallback
          statusCode={error instanceof HTTPError ? error.statusCode : undefined}
          resetError={this.handleResetErrorBoundary}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
