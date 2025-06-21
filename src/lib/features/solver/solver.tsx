"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import ColorPicker from "../../componets/color-picker/color-picker";
import RealmCore from "../../componets/realm-core/realm-core";
import Tile from "../../componets/tile/tile";
import { COLORS, INITIAL_GRID, TARGET_REALM_COLORS } from "../../constants";
import {
  deepCopyGrid,
  COORDS_TO_INDEX,
  ALL_AROUND_COORDS_LOOKUP,
  CROSS_AROUND_COORDS_LOOKUP,
} from "../../utils/solver";
import {
  applyTileEffect,
  rotateColorsInCoords,
  invertColor,
} from "../../utils/tiles";
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

const Solver: React.FC = () => {
  const [grid, setGrid] = useState<COLORS[][]>(deepCopyGrid(INITIAL_GRID));
  const [realmColors, setRealmColors] = useState(TARGET_REALM_COLORS);
  const [solveOverlay, setSolveOverlay] = useState<boolean>(false);
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
  const [solving, setSolving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [editingMode, setEditingMode] = useState<boolean>(false);

  const [lastUserProvidedState, setLastUserProvidedState] =
    useState<SavedState>({
      grid: deepCopyGrid(INITIAL_GRID),
      realmColors: { ...TARGET_REALM_COLORS },
    });

  const [colorPicker, setColorPicker] = useState<ColorPickerState | null>(null);
  const puzzleContainerRef = useRef<HTMLDivElement>(null);

  const handleTileClick = useCallback(
    (row: number, col: number, event: React.MouseEvent<HTMLButtonElement>) => {
      if (editingMode) {
        const rect = event.currentTarget.getBoundingClientRect();
        const puzzleRect = puzzleContainerRef.current!.getBoundingClientRect();
        const pickerWidth = 160;
        const pickerHeight = 150;

        let left =
          rect.left - puzzleRect.left + rect.width / 2 - pickerWidth / 2;
        let top = rect.top - puzzleRect.top + rect.height + 10;

        if (left < 0) left = 0;
        if (left + pickerWidth > puzzleRect.width)
          left = puzzleRect.width - pickerWidth;

        const potentialBottom = puzzleRect.top + top + 150;
        if (
          potentialBottom > window.innerHeight &&
          top > rect.top - puzzleRect.top
        ) {
          top = rect.top - puzzleRect.top - 150 - 10;
        }

        setColorPicker({
          type: "tile",
          row,
          col,
          position: { top, left },
        });
      } else {
        setGrid((prevGrid) => {
          const tileColor = prevGrid[row][col];
          const effectiveColor =
            tileColor === COLORS.BLUE ? prevGrid[1][1] : tileColor;
          return applyTileEffect(prevGrid, row, col, effectiveColor);
        });
        setSolveOverlay(false);
        setSolutionSteps([]);
        setMessage("");
      }
    },
    [editingMode, applyTileEffect]
  );

  const handleRealmCoreClick = useCallback(
    (
      corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      let targetKey: keyof typeof TARGET_REALM_COLORS;

      switch (corner) {
        case "topLeft":
          targetKey = "topLeft";
          break;
        case "topRight":
          targetKey = "topRight";
          break;
        case "bottomLeft":
          targetKey = "bottomLeft";
          break;
        case "bottomRight":
          targetKey = "bottomRight";
          break;
        default:
          return;
      }

      if (editingMode) {
        const rect = event.currentTarget.getBoundingClientRect();
        const puzzleRect = puzzleContainerRef.current!.getBoundingClientRect();
        const pickerWidth = 160;
        const pickerHeight = 150;

        let left =
          rect.left - puzzleRect.left + rect.width / 2 - pickerWidth / 2;
        let top = rect.top - puzzleRect.top + rect.height + 10;

        if (left < 0) left = 0;
        if (left + pickerWidth > puzzleRect.width)
          left = puzzleRect.width - pickerWidth;

        const potentialBottom = puzzleRect.top + top + 150;
        if (
          potentialBottom > window.innerHeight &&
          top > rect.top - puzzleRect.top
        ) {
          top = rect.top - puzzleRect.top - 150 - 10;
        }

        setColorPicker({
          type: "realm",
          corner: targetKey,
          position: { top, left },
        });
      } else {
        let adjacentRow: number, adjacentCol: number;
        switch (corner) {
          case "topLeft":
            adjacentRow = 0;
            adjacentCol = 0;
            break;
          case "topRight":
            adjacentRow = 0;
            adjacentCol = 2;
            break;
          case "bottomLeft":
            adjacentRow = 2;
            adjacentCol = 0;
            break;
          case "bottomRight":
            adjacentRow = 2;
            adjacentCol = 2;
            break;
        }

        if (grid[adjacentRow!][adjacentCol!] !== realmColors[targetKey]) {
          setGrid(deepCopyGrid(lastUserProvidedState.grid));
          setRealmColors({ ...lastUserProvidedState.realmColors });
          setMessage("Puzzle reset!");
          setSolveOverlay(false);
          setSolutionSteps([]);
        } else {
          setMessage(`Realm core ${corner} is matched!`);
        }
      }
    },
    [grid, realmColors, editingMode, lastUserProvidedState]
  );

  const solvePuzzle = useCallback(() => {
    if (solveOverlay) {
      setSolveOverlay(false);
      setSolutionSteps([]);
      setMessage("");
      return;
    }

    setSolving(true);
    setMessage("Solving puzzle...");
    setSolutionSteps([]);

    const maxIterations = 1000000;

    const worker = new Worker(
      URL.createObjectURL(
        new Blob(
          [
            `
      const COLORS = ${JSON.stringify(COLORS)};
      const COORDS_TO_INDEX = ${JSON.stringify(COORDS_TO_INDEX)};
      const ALL_AROUND_COORDS_LOOKUP = ${JSON.stringify(
        ALL_AROUND_COORDS_LOOKUP
      )};
      const CROSS_AROUND_COORDS_LOOKUP = ${JSON.stringify(
        CROSS_AROUND_COORDS_LOOKUP
      )};

      const deepCopyGrid = (grid) => grid.map(row => [...row]);
      const stringifyGrid = (g) => JSON.stringify(g);
      const rotateColorsInCoords = ${rotateColorsInCoords.toString()};
      const invertColor = ${invertColor.toString()};
      const applyTileEffect = (currentGrid, row, col, triggeredColor) => {
          let newGrid = deepCopyGrid(currentGrid);
          const tileColor = triggeredColor;
          const clickedIndex = COORDS_TO_INDEX[\`\${row},\${col}\`];

          switch (tileColor) {
              case COLORS.GREY:
                  break;
              case COLORS.BLACK:
                  const rowToRotate = newGrid[row];
                  const lastTile = rowToRotate.pop();
                  rowToRotate.unshift(lastTile);
                  break;
              case COLORS.GREEN:
                  if (row === 1 && col === 1) {
                      break;
                  }
                  const oppositeRow = 2 - row;
                  const oppositeCol = 2 - col;
                  [newGrid[row][col], newGrid[oppositeRow][oppositeCol]] =
                      [newGrid[oppositeRow][oppositeCol], newGrid[row][col]];
                  break;
              case COLORS.PINK:
                  const adjCoords = ALL_AROUND_COORDS_LOOKUP[clickedIndex];
                  if (adjCoords && adjCoords.length > 0) {
                      rotateColorsInCoords(newGrid, adjCoords);
                  }
                  break;
              case COLORS.YELLOW:
                  if (row > 0) {
                      [newGrid[row][col], newGrid[row - 1][col]] =
                          [newGrid[row - 1][col], newGrid[row][col]];
                  }
                  break;
              case COLORS.VIOLET:
                  if (row < 2) {
                      [newGrid[row][col], newGrid[row + 1][col]] =
                          [newGrid[row + 1][col], newGrid[row][col]];
                  }
                  break;
              case COLORS.WHITE:
                  const clickedOriginalColor = currentGrid[row][col];
                  const crossAdjCoordsWhite = CROSS_AROUND_COORDS_LOOKUP[clickedIndex];
                  newGrid[row][col] = invertColor(clickedOriginalColor, clickedOriginalColor, COLORS.GREY);
                  if (crossAdjCoordsWhite) {
                      crossAdjCoordsWhite.forEach(coord => {
                          const adjOriginalColor = currentGrid[coord.r][coord.c];
                          newGrid[coord.r][coord.c] = invertColor(adjOriginalColor, clickedOriginalColor, COLORS.GREY);
                      });
                  }
                  break;
              case COLORS.RED:
                  for (let r = 0; r < 3; r++) {
                      for (let c = 0; c < 3; c++) {
                          if (newGrid[r][c] === COLORS.WHITE) {
                              newGrid[r][c] = COLORS.BLACK;
                          } else if (newGrid[r][c] === COLORS.BLACK) {
                              newGrid[r][c] = COLORS.RED;
                          }
                      }
                  }
                  break;
              case COLORS.ORANGE:
                  const orangeCrossAdjCoords = CROSS_AROUND_COORDS_LOOKUP[clickedIndex];
                  if (orangeCrossAdjCoords && orangeCrossAdjCoords.length > 0) {
                      const colorCounts = {};
                      orangeCrossAdjCoords.forEach(coord => {
                          const adjColor = currentGrid[coord.r][coord.c];
                          colorCounts[adjColor] = (colorCounts[adjColor] || 0) + 1;
                      });
                      let majorityColor = null;
                      let maxCount = 0;
                      let isStrictMajority = true;
                      for (const color in colorCounts) {
                          if (colorCounts[color] > maxCount) {
                              maxCount = colorCounts[color];
                              majorityColor = color;
                              isStrictMajority = true;
                          } else if (colorCounts[color] === maxCount) {
                              isStrictMajority = false;
                          }
                      }
                      if (isStrictMajority && majorityColor) {
                          newGrid[row][col] = majorityColor;
                      }
                  }
                  break;
              case COLORS.BLUE:
                  const centerTileColor = currentGrid[1][1];
                  if (centerTileColor !== COLORS.BLUE) {
                      newGrid = applyTileEffect(newGrid, row, col, centerTileColor);
                  }
                  break;
              default:
                  console.warn(\`Unknown tile color: \${tileColor} at (\${row}, \${col})\`);
                  break;
          }
          return newGrid;
      };
      const isGoalReached = (currentGrid, realmColors) => {
        return (
          currentGrid[0][0] === realmColors.topLeft &&
          currentGrid[0][2] === realmColors.topRight &&
          currentGrid[2][0] === realmColors.bottomLeft &&
          currentGrid[2][2] === realmColors.bottomRight
        );
      };
      const CURRENT_REALM_COLORS = ${JSON.stringify(realmColors)};

      self.onmessage = (e) => {
        const { initialGrid, maxIterations } = e.data;
        const queue = [[deepCopyGrid(initialGrid), []]];
        const visited = new Set([stringifyGrid(initialGrid)]);
        let iterations = 0;

        while (queue.length > 0 && iterations < maxIterations) {
          const [currentGrid, path] = queue.shift();
          iterations++;

          if (isGoalReached(currentGrid, CURRENT_REALM_COLORS)) {
            self.postMessage({ solution: path, iterations });
            return;
          }

          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              const tileColor = currentGrid[r][c];
              const effectiveColor = tileColor === COLORS.BLUE ? currentGrid[1][1] : tileColor;
              
              if (tileColor === COLORS.BLUE && currentGrid[1][1] === COLORS.BLUE) {
                 continue;
              }

              const nextGrid = applyTileEffect(deepCopyGrid(currentGrid), r, c, effectiveColor);
              const nextGridString = stringifyGrid(nextGrid);

              if (!visited.has(nextGridString)) {
                visited.add(nextGridString);
                queue.push([nextGrid, [...path, { r, c }]]);
              }
            }
          }
        }
        self.postMessage({ solution: null, iterations });
      };
    `,
          ],
          { type: "application/javascript" }
        )
      )
    );

    worker.postMessage({ initialGrid: grid, maxIterations: maxIterations });

    worker.onmessage = (e) => {
      const { solution, iterations } = e.data;
      setSolving(false);
      if (solution) {
        setSolutionSteps(solution);
        setSolveOverlay(true);
        setMessage(
          `Solution found in ${solution.length} steps after ${iterations} iterations!`
        );
      } else {
        setMessage(
          "No solution found within the iteration limit. Try a different puzzle configuration or reset!"
        );
      }
      worker.terminate();
    };

    worker.onerror = (e) => {
      setSolving(false);
      setMessage("An error occurred during solving.");
      console.error("Worker error:", e);
      worker.terminate();
    };
  }, [grid, realmColors]);

  useEffect(() => {
    if (!editingMode) {
      // Removed setLastUserProvidedState from here
      setMessage("Puzzle configuration saved.");
    } else {
      setMessage("Editing mode active.");
    }
    setSolveOverlay(false);
    setSolutionSteps([]);
  }, [editingMode]); // Simplified dependencies

  useEffect(() => {
    document.body.classList.add(
      "bg-gray-100",
      "font-sans",
      "flex",
      "items-center",
      "justify-center",
      "min-h-screen"
    );
    return () => {
      document.body.classList.remove(
        "bg-gray-100",
        "font-sans",
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen"
      );
    };
  }, []);

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
        <div className="grid grid-cols-3 gap-4 p-6 w-full h-full">
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 3 }).map((__, c) => {
              const key = `${r},${c}`;
              const steps = stepMap.get(key);
              const tileColor = grid[r][c];
              const textColor =
                tileColor === COLORS.BLACK ||
                tileColor === COLORS.GREEN ||
                tileColor === COLORS.PINK ||
                tileColor === COLORS.VIOLET ||
                tileColor === COLORS.RED ||
                tileColor === COLORS.ORANGE ||
                tileColor === COLORS.BLUE ||
                tileColor === COLORS.GREY
                  ? "text-white"
                  : "text-gray-800";

              return (
                <StyledSolverTile key={`${r}-${c}`} className={textColor}>
                  {steps && (
                    <div>
                      {steps.length === 1 ? `${steps[0]}` : steps.join(", ")}
                    </div>
                  )}
                </StyledSolverTile>
              );
            })
          )}
        </div>
      </StyledSolverOverlay>
    );
  }, [solveOverlay, solutionSteps, grid]);

  const handleColorSelect = useCallback(
    (color: COLORS) => {
      if (!colorPicker) return;

      let updatedGrid = deepCopyGrid(grid);
      let updatedRealmColors = { ...realmColors };

      if (colorPicker.type === "tile") {
        updatedGrid[colorPicker.row!][colorPicker.col!] = color;
        setGrid(updatedGrid);
      } else if (colorPicker.type === "realm") {
        updatedRealmColors[colorPicker.corner!] = color;
        setRealmColors(updatedRealmColors);
      }

      // Update lastUserProvidedState only when an actual color edit happens
      setLastUserProvidedState({
        grid: deepCopyGrid(updatedGrid),
        realmColors: { ...updatedRealmColors },
      });

      setColorPicker(null);
      setMessage("Color updated!");
    },
    [colorPicker, grid, realmColors]
  ); // Keep grid and realmColors as dependencies for current state access

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
                editingMode={editingMode}
                onClick={(e) => handleTileClick(rIdx, cIdx, e)}
              />
            ))
          )}
        </StyledGridContainer>
        {solverStepsDisplay}
        {colorPicker && (
          <ColorPicker
            onSelectColor={handleColorSelect}
            onClose={() => setColorPicker(null)}
            position={colorPicker.position}
          />
        )}
      </StyledPuzzleContainer>

      <StyledButtonContainer>
        <StyledButton
          className={editingMode ? "edit-mode-active" : "edit-mode-inactive"}
          onClick={() => setEditingMode((prev) => !prev)}
        >
          {editingMode ? "Exit Edit Mode" : "Edit puzzle"}
        </StyledButton>

        <StyledButton
          className="show-solution"
          onClick={solvePuzzle}
          disabled={solving || editingMode}
        >
          {solving ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : solveOverlay ? (
            "Hide solution"
          ) : (
            "Show solution"
          )}
        </StyledButton>

        <StyledButton
          className="reset"
          onClick={() => {
            setGrid(deepCopyGrid(lastUserProvidedState.grid));
            setRealmColors({ ...lastUserProvidedState.realmColors });
            setMessage("Puzzle reset to last saved state!");
            setSolveOverlay(false);
            setSolutionSteps([]);
            setSolving(false);
          }}
        >
          Reset
        </StyledButton>

        <StyledButton
          className="clear-all"
          onClick={() => {
            setGrid(
              Array(3)
                .fill(null)
                .map(() => Array(3).fill(COLORS.GREY))
            );
            setRealmColors({
              topLeft: COLORS.GREY,
              topRight: COLORS.GREY,
              bottomLeft: COLORS.GREY,
              bottomRight: COLORS.GREY,
            });
            setMessage("Board and target colors cleared to Grey!");
            setSolveOverlay(false);
            setSolutionSteps([]);
            setSolving(false);
          }}
        >
          Clear All to Grey
        </StyledButton>
      </StyledButtonContainer>

      <StyledMessageArea>
        {message && (
          <p className={solutionSteps.length > 0 ? "success" : "error"}>
            {message}
          </p>
        )}
      </StyledMessageArea>
    </StyledAppContainer>
  );
};

export default Solver;
