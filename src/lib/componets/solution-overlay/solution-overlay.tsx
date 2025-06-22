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

  return (
    <Overlay $isVisible={isVisible && solutionSteps.length > 0}>
      <Grid>
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 3 }).map((__, c) => {
            const key = `${r},${c}`;
            const steps = stepMap.get(key);

            return (
              <Tile key={`${r}-${c}`}>
                {steps && (
                  <span>
                    {steps.length === 1 ? `${steps[0]}` : steps.join(", ")}
                  </span>
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
