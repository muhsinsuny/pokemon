import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='text-red-500'>Terjadi error saat memuat data.</div>
      );
    }
    return this.props.children;
  }
}
