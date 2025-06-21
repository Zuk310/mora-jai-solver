"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import ColorPicker from "../../componets/color-picker/color-picker";
import RealmCore from "../../componets/realm-core/realm-core";
import Tile from "../../componets/tile/tile";
import { COLORS, INITIAL_GRID, TARGET_REALM_COLORS } from "../../constants";
import { deepCopyGrid, solvePuzzleBFS } from "../../utils/solver";
import { applyTileEffect } from "../../utils/tiles";
import {
  StyledSolverOverlay,
  StyledSolverTile,
  StyledAppContainer,
  StyledTitle,
  StyledPuzzleContainer,
  StyledGridContainer,
  StyledButtonContainer,
  StyledButton,
  StyledMessageArea,
  SolverStepsGrid,
  LoadingSpinner,
  SpinnerCircle,
  SpinnerPath,
  MessageText,
} from "./solver.styles";

interface SavedState {
  grid: COLORS[][];
  realmColors: {
    topLeft: COLORS;
    topRight: COLORS;
    bottomLeft: COLORS;
    bottomRight: COLORS;
  };
}

interface SolutionStep {
  r: number;
  c: number;
}

interface ColorPickerState {
  type: "tile" | "realm";
  row?: number;
  col?: number;
  corner?: string;
  position: { top: number; left: number };
}

interface SolverResult {
  solution: SolutionStep[] | null;
  iterations: number;
}

const Solver: React.FC = () => {
  // State management
  const [grid, setGrid] = useState<COLORS[][]>(deepCopyGrid(INITIAL_GRID));
  const [realmColors, setRealmColors] = useState(TARGET_REALM_COLORS);
  const [solveOverlay, setSolveOverlay] = useState<boolean>(false);
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
  const [solving, setSolving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<ColorPickerState | null>(null);

  const [lastUserProvidedState, setLastUserProvidedState] =
    useState<SavedState>({
      grid: deepCopyGrid(INITIAL_GRID),
      realmColors: { ...TARGET_REALM_COLORS },
    });

  const puzzleContainerRef = useRef<HTMLDivElement>(null);

  // Utility functions
  const resetPuzzleState = useCallback(() => {
    setSolveOverlay(false);
    setSolutionSteps([]);
    setMessage("");
  }, []);

  const updateLastUserState = useCallback(
    (newGrid: COLORS[][], newRealmColors: typeof realmColors) => {
      setLastUserProvidedState({
        grid: deepCopyGrid(newGrid),
        realmColors: { ...newRealmColors },
      });
    },
    []
  );

  const calculateColorPickerPosition = useCallback(
    (rect: DOMRect, puzzleRect: DOMRect): { top: number; left: number } => {
      const pickerWidth = 160;
      const pickerHeight = 150;

      let left = rect.left - puzzleRect.left + rect.width / 2 - pickerWidth / 2;
      let top = rect.top - puzzleRect.top + rect.height + 10;

      // Horizontal bounds checking
      if (left < 0) left = 0;
      if (left + pickerWidth > puzzleRect.width) {
        left = puzzleRect.width - pickerWidth;
      }

      // Vertical bounds checking
      const potentialBottom = puzzleRect.top + top + pickerHeight;
      if (
        potentialBottom > window.innerHeight &&
        top > rect.top - puzzleRect.top
      ) {
        top = rect.top - puzzleRect.top - pickerHeight - 10;
      }

      return { top, left };
    },
    []
  );

  // Event handlers
  const handleTileClick = useCallback(
    (row: number, col: number, event: React.MouseEvent<HTMLButtonElement>) => {
      if (editingMode) {
        const rect = event.currentTarget.getBoundingClientRect();
        const puzzleRect = puzzleContainerRef.current?.getBoundingClientRect();

        if (!puzzleRect) return;

        const position = calculateColorPickerPosition(rect, puzzleRect);

        setColorPicker({
          type: "tile",
          row,
          col,
          position,
        });
      } else {
        setGrid((prevGrid) => {
          const tileColor = prevGrid[row][col];
          const effectiveColor =
            tileColor === COLORS.BLUE ? prevGrid[1][1] : tileColor;
          return applyTileEffect(prevGrid, row, col, effectiveColor);
        });
        resetPuzzleState();
      }
    },
    [editingMode, calculateColorPickerPosition, resetPuzzleState]
  );

  const handleRealmCoreClick = useCallback(
    (
      corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      if (editingMode) {
        const rect = event.currentTarget.getBoundingClientRect();
        const puzzleRect = puzzleContainerRef.current?.getBoundingClientRect();

        if (!puzzleRect) return;

        const position = calculateColorPickerPosition(rect, puzzleRect);

        setColorPicker({
          type: "realm",
          corner,
          position,
        });
      } else {
        // Determine adjacent tile coordinates
        const adjacentCoords = {
          topLeft: { row: 0, col: 0 },
          topRight: { row: 0, col: 2 },
          bottomLeft: { row: 2, col: 0 },
          bottomRight: { row: 2, col: 2 },
        };

        const { row: adjacentRow, col: adjacentCol } = adjacentCoords[corner];

        if (grid[adjacentRow][adjacentCol] !== realmColors[corner]) {
          // Reset puzzle to last saved state
          setGrid(deepCopyGrid(lastUserProvidedState.grid));
          setRealmColors({ ...lastUserProvidedState.realmColors });
          setMessage("Puzzle reset!");
          resetPuzzleState();
        } else {
          setMessage(`Realm core ${corner} is matched!`);
        }
      }
    },
    [
      grid,
      realmColors,
      editingMode,
      lastUserProvidedState,
      calculateColorPickerPosition,
      resetPuzzleState,
    ]
  );

  const handleColorSelect = useCallback(
    (color: COLORS) => {
      if (!colorPicker) return;

      if (
        colorPicker.type === "tile" &&
        colorPicker.row !== undefined &&
        colorPicker.col !== undefined
      ) {
        const updatedGrid = deepCopyGrid(grid);
        updatedGrid[colorPicker.row][colorPicker.col] = color;
        setGrid(updatedGrid);
        updateLastUserState(updatedGrid, realmColors);
      } else if (colorPicker.type === "realm" && colorPicker.corner) {
        const updatedRealmColors = { ...realmColors };
        updatedRealmColors[
          colorPicker.corner as keyof typeof updatedRealmColors
        ] = color;
        setRealmColors(updatedRealmColors);
        updateLastUserState(grid, updatedRealmColors);
      }

      setColorPicker(null);
      setMessage("Color updated!");
    },
    [colorPicker, grid, realmColors, updateLastUserState]
  );

  const solvePuzzle = useCallback(async () => {
    if (solveOverlay) {
      resetPuzzleState();
      return;
    }

    setSolving(true);
    setMessage("Solving puzzle...");
    setSolutionSteps([]);

    try {
      // Use setTimeout to allow UI to update before heavy computation
      const result: SolverResult = await new Promise((resolve) => {
        setTimeout(() => {
          const solverResult = solvePuzzleBFS(grid, realmColors, 1000000);
          resolve(solverResult);
        }, 10);
      });

      setSolving(false);

      if (result.solution) {
        setSolutionSteps(result.solution);
        setSolveOverlay(true);
        setMessage(
          `Solution found in ${result.solution.length} steps after ${result.iterations} iterations!`
        );
      } else {
        setMessage(
          "No solution found within the iteration limit. Try a different puzzle configuration or reset!"
        );
      }
    } catch (error) {
      setSolving(false);
      setMessage("An error occurred during solving.");
      console.error("Solver error:", error);
    }
  }, [grid, realmColors, solveOverlay, resetPuzzleState]);

  const handleReset = useCallback(() => {
    setGrid(deepCopyGrid(lastUserProvidedState.grid));
    setRealmColors({ ...lastUserProvidedState.realmColors });
    setMessage("Puzzle reset to last saved state!");
    resetPuzzleState();
    setSolving(false);
  }, [lastUserProvidedState, resetPuzzleState]);

  const handleClearAll = useCallback(() => {
    const emptyGrid = Array(3)
      .fill(null)
      .map(() => Array(3).fill(COLORS.GREY));
    const emptyRealmColors = {
      topLeft: COLORS.GREY,
      topRight: COLORS.GREY,
      bottomLeft: COLORS.GREY,
      bottomRight: COLORS.GREY,
    };

    setGrid(emptyGrid);
    setRealmColors(emptyRealmColors);
    setMessage("Board and target colors cleared to Grey!");
    resetPuzzleState();
    setSolving(false);
  }, [resetPuzzleState]);

  const toggleEditingMode = useCallback(() => {
    setEditingMode((prev) => !prev);
  }, []);

  // Effects
  useEffect(() => {
    if (!editingMode) {
      setMessage("Puzzle configuration saved.");
    } else {
      setMessage("Editing mode active.");
    }
    resetPuzzleState();
  }, [editingMode, resetPuzzleState]);

  useEffect(() => {
    // Apply body styles using styled-components approach
    const originalBodyStyle = document.body.style.cssText;

    Object.assign(document.body.style, {
      backgroundColor: "#f3f4f6",
      fontFamily: "system-ui, -apple-system, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      margin: "0",
      padding: "0",
    });

    return () => {
      document.body.style.cssText = originalBodyStyle;
    };
  }, []);

  // Memoized components
  const solverStepsDisplay = useMemo(() => {
    if (!solveOverlay || solutionSteps.length === 0) return null;

    const stepMap = new Map<string, number[]>();
    solutionSteps.forEach((step, index) => {
      const key = `${step.r},${step.c}`;
      if (!stepMap.has(key)) {
        stepMap.set(key, []);
      }
      stepMap.get(key)!.push(index + 1);
    });

    return (
      <StyledSolverOverlay>
        <SolverStepsGrid>
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 3 }).map((__, c) => {
              const key = `${r},${c}`;
              const steps = stepMap.get(key);

              return (
                <StyledSolverTile key={`${r}-${c}`}>
                  {steps && (
                    <div>
                      {steps.length === 1 ? `${steps[0]}` : steps.join(", ")}
                    </div>
                  )}
                </StyledSolverTile>
              );
            })
          )}
        </SolverStepsGrid>
      </StyledSolverOverlay>
    );
  }, [solveOverlay, solutionSteps, grid]);

  const loadingSpinner = (
    <LoadingSpinner>
      <SpinnerCircle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <SpinnerPath
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </LoadingSpinner>
  );

  return (
    <StyledAppContainer>
      <StyledTitle>Mora Jai Puzzle Solver</StyledTitle>

      <StyledPuzzleContainer ref={puzzleContainerRef}>
        <RealmCore
          corner="topLeft"
          targetColor={realmColors.topLeft}
          onClick={(e) => handleRealmCoreClick("topLeft", e)}
        />
        <RealmCore
          corner="topRight"
          targetColor={realmColors.topRight}
          onClick={(e) => handleRealmCoreClick("topRight", e)}
        />
        <RealmCore
          corner="bottomLeft"
          targetColor={realmColors.bottomLeft}
          onClick={(e) => handleRealmCoreClick("bottomLeft", e)}
        />
        <RealmCore
          corner="bottomRight"
          targetColor={realmColors.bottomRight}
          onClick={(e) => handleRealmCoreClick("bottomRight", e)}
        />

        <StyledGridContainer>
          {grid.map((row, rIdx) =>
            row.map((color, cIdx) => (
              <Tile
                key={`${rIdx}-${cIdx}`}
                color={color}
                isEditingMode={editingMode}
                onClick={(e) => handleTileClick(rIdx, cIdx, e)}
              />
            ))
          )}
        </StyledGridContainer>

        {solverStepsDisplay}

        <AnimatePresence mode="wait">
          {colorPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <ColorPicker
                onSelectColor={handleColorSelect}
                onClose={() => setColorPicker(null)}
                position={colorPicker.position}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </StyledPuzzleContainer>

      <StyledButtonContainer>
        <StyledButton
          $variant="edit"
          $isActive={editingMode}
          onClick={toggleEditingMode}
        >
          {editingMode ? "Exit Edit Mode" : "Edit puzzle"}
        </StyledButton>

        <StyledButton
          $variant="solve"
          onClick={solvePuzzle}
          disabled={solving || editingMode}
        >
          {solving
            ? "Solving..."
            : solveOverlay
            ? "Hide solution"
            : "Show solution"}
        </StyledButton>

        <StyledButton
          $variant="reset"
          disabled={editingMode || solving}
          onClick={handleReset}
        >
          Reset
        </StyledButton>

        <StyledButton
          $variant="clear"
          disabled={editingMode || solving}
          onClick={handleClearAll}
        >
          Clear All to Grey
        </StyledButton>
      </StyledButtonContainer>

      <StyledMessageArea>
        {message && (
          <MessageText $isSuccess={solutionSteps.length > 0}>
            {message}
          </MessageText>
        )}
      </StyledMessageArea>
    </StyledAppContainer>
  );
};

export default Solver;
