import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  sectionId: string;
  componentKey: string;
  children: ReactNode;
};

type State = {
  error: Error | null;
};

/**
 * Catches failed React.lazy / dynamic import for one custom section
 * so the rest of the lesson page stays usable.
 */
export class CustomSectionErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[custom section ${this.props.componentKey}]`,
      error,
      info.componentStack,
    );
  }

  render() {
    if (this.state.error) {
      return (
        <section
          id={this.props.sectionId}
          className="lw-block panel"
          role="alert"
        >
          <p className="lw-section-desc">
            Couldn’t load this exercise (
            <code>{this.props.componentKey}</code>). Refresh the page or try
            again.
          </p>
        </section>
      );
    }
    return this.props.children;
  }
}
