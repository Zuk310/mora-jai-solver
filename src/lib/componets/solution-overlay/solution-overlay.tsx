import React from "react";
import { Overlay, Tile, Grid } from "./solution-overlay.styles";

interface SolutionStep {
  r: number;
  c: number;
}

interface SolverStepsOverlayProps {
  solutionSteps: SolutionStep[];
  isVisible: boolean;
}

const SolutionOverlay: React.FC<SolverStepsOverlayProps> = ({
  solutionSteps,
  isVisible,
}) => {
  const stepMap = new Map<string, number[]>();
  solutionSteps.forEach((step, index) => {
    const key = `${step.r},${step.c}`;
    if (!stepMap.has(key)) {
      stepMap.set(key, []);
    }
    stepMap.get(key)!.push(index + 1);
  });

  // Function to calculate font size based on content length and screen size
  const getFontSize = (
    content: string
  ): { fontSize: string; tabletSize: string; mobileSize: string } => {
    const length = content.length;

    if (length <= 1) {
      // Single digit - largest possible
      return { fontSize: "32px", tabletSize: "28px", mobileSize: "22px" };
    } else if (length <= 2) {
      // Two digits - very large
      return { fontSize: "28px", tabletSize: "24px", mobileSize: "20px" };
    } else if (length <= 4) {
      // Short content like "1, 2"
      return { fontSize: "24px", tabletSize: "20px", mobileSize: "16px" };
    } else if (length <= 6) {
      // Medium content like "1, 2, 3"
      return { fontSize: "20px", tabletSize: "18px", mobileSize: "14px" };
    } else if (length <= 8) {
      // Longer content like "1, 2, 3, 4"
      return { fontSize: "18px", tabletSize: "16px", mobileSize: "12px" };
    } else if (length <= 12) {
      // Very long content
      return { fontSize: "16px", tabletSize: "14px", mobileSize: "11px" };
    } else {
      // Extremely long content
      return { fontSize: "14px", tabletSize: "12px", mobileSize: "10px" };
    }
  };

  return (
    <Overlay $isVisible={isVisible && solutionSteps.length > 0}>
      <Grid>
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 3 }).map((__, c) => {
            const key = `${r},${c}`;
            const steps = stepMap.get(key);
            const content = steps
              ? steps.length === 1
                ? `${steps[0]}`
                : steps.join(", ")
              : "";

            const fontSizes = getFontSize(content);

            return (
              <Tile
                key={`${r}-${c}`}
                style={
                  {
                    "--desktop-font": fontSizes.fontSize,
                    "--tablet-font": fontSizes.tabletSize,
                    "--mobile-font": fontSizes.mobileSize,
                  } as React.CSSProperties
                }
              >
                {steps ? (
                  <span className="dynamic-font">{content}</span>
                ) : (
                  <>&nbsp;</>
                )}
              </Tile>
            );
          })
        )}
      </Grid>
    </Overlay>
  );
};

export default SolutionOverlay;
