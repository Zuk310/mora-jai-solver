import React from "react";
import {
  LoadingContainer,
  Spinner,
  LoadingText,
  DotsContainer,
  Dot,
} from "./loading-spinner.styles";
import { AnimatePresence } from "motion/react";

interface LoadingSpinnerProps {
  visible: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (
  props: LoadingSpinnerProps
) => {
  const { visible, message = "Generating new puzzle" } = props;
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Spinner />
          <LoadingText>{message}</LoadingText>
          <DotsContainer>
            <Dot $delay={0} />
            <Dot $delay={0.2} />
            <Dot $delay={0.4} />
          </DotsContainer>
        </LoadingContainer>
      )}
    </AnimatePresence>
  );
};

export default LoadingSpinner;
