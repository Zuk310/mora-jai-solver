import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorPicker from "../../componets/color-picker/color-picker";
import RealmCore from "../../componets/realm-core/realm-core";
import SolutionOverlay from "@mora-jai/lib/componets/solution-overlay/solution-overlay";
import Tile from "../../componets/tile/tile";
import { COLORS, INITIAL_GRID, TARGET_REALM_COLORS } from "../../constants";
import { deepCopyGrid, SolverResult } from "../../utils/solver";
import { applyTileEffect } from "../../utils/tiles";
import {
  ButtonContainer,
  CenterColumn,
  Container,
  ControlsMessage,
  GridContainer,
  GuideList,
  GuideListContainer,
  GuideListItem,
  GuideListTitle,
  GuideText,
  InfoGroup,
  MessageArea,
  MessageText,
  PuzzleContainer,
  SideContainer,
  StyledButton,
  Subtitle,
  Title,
  Wrapper,
} from "./solver.styles";
import { Footer } from "@mora-jai/lib/componets";

const SOLUTION_RESET_DELAY = 100;
const MESSAGE_VISIBILITY_DURATION = 3000;
const Z_INDEX_COLOR_PICKER = 200;
const GRID_SIZE = 3;

type ColorPickerType = "tile" | "corner";
type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

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
  const workerRef = useRef<Worker | null>(null);

  const [grid, setGrid] = useState<COLORS[][]>(deepCopyGrid(INITIAL_GRID));
  const [realmColors, setRealmColors] = useState(TARGET_REALM_COLORS);
  const [solveOverlay, setSolveOverlay] = useState<boolean>(false);
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
  const [solving, setSolving] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    msg: string;
    status: "good" | "bad" | "info";
    visible: boolean;
  }>({ msg: "", status: "info", visible: false });
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<ColorPickerState | null>(null);
  const [lastUserProvidedState, setLastUserProvidedState] =
    useState<SavedState>({
      grid: deepCopyGrid(INITIAL_GRID),
      realmColors: { ...TARGET_REALM_COLORS },
    });
  const puzzleContainerRef = useRef<HTMLDivElement>(null);

  const setupWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const newWorker = new Worker(
      new URL("../../utils/solver.worker.ts", import.meta.url)
    );

    newWorker.onmessage = (event: MessageEvent<SolverResult>) => {
      const result = event.data;
      setSolving(false);

      if (result.solution) {
        setSolutionSteps(result.solution);
        setSolveOverlay(true);
        setMessage({
          msg: `Solution found in ${result.solution.length} steps after ${result.iterations} iterations!`,
          status: "good",
          visible: true,
        });
      } else {
        setMessage({
          msg: "No solution found within the set limits.",
          status: "bad",
          visible: true,
        });
      }
    };

    workerRef.current = newWorker;
  };

  useEffect(() => {
    setupWorker();
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const resetPuzzleState = useCallback(() => {
    setSolveOverlay(false);
    setTimeout(() => {
      setSolutionSteps([]);
    }, SOLUTION_RESET_DELAY);
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
    (
      rect: DOMRect,
      puzzleRect: DOMRect,
      options: {
        isBottomElement: boolean;
        type: ColorPickerType;
        corner?: Corner;
        cornerSide?: "left" | "right";
      }
    ): { top: number; left: number } => {
      const COLOR_PICKER_WIDTH = 220;
      const COLOR_PICKER_HEIGHT = 140;
      const GAP = 5;
      const BOTTOM_GAP = 72;

      const CORNER_HORIZONTAL_ADJUST = 50;

      const { isBottomElement, type, corner } = options;

      const elementCenterX = rect.left + rect.width / 2;
      const elementTopY = rect.top;
      const elementBottomY = rect.bottom;

      let left = elementCenterX - puzzleRect.left - COLOR_PICKER_WIDTH / 2;

      let top: number;
      if (isBottomElement) {
        const gap = BOTTOM_GAP + GAP;

        top = elementTopY - puzzleRect.top - COLOR_PICKER_HEIGHT - gap;
      } else {
        top = elementBottomY - puzzleRect.top + GAP;
      }

      if (type === "corner" && corner) {
        const isLeft = options.cornerSide === "left";
        const horizontalAdjust = isLeft
          ? CORNER_HORIZONTAL_ADJUST
          : -CORNER_HORIZONTAL_ADJUST;
        left += horizontalAdjust;
      }

      return { top, left };
    },
    []
  );

  const handleTileClick = useCallback(
    (row: number, col: number, event: React.MouseEvent<HTMLButtonElement>) => {
      if (editingMode) {
        const rect = event.currentTarget.getBoundingClientRect();
        const puzzleRect = puzzleContainerRef.current?.getBoundingClientRect();

        if (!puzzleRect) return;

        const position = calculateColorPickerPosition(rect, puzzleRect, {
          isBottomElement: row === 2,
          type: "tile",
        });

        setColorPicker({
          type: "tile",
          row,
          col,
          position,
        });
      } else {
        if (solving) return;
        setGrid((prevGrid) => {
          const tileColor = prevGrid[row][col];
          const effectiveColor =
            tileColor === COLORS.BLUE ? prevGrid[1][1] : tileColor;
          return applyTileEffect(prevGrid, row, col, effectiveColor);
        });
        resetPuzzleState();
      }
    },
    [editingMode, solving, calculateColorPickerPosition, resetPuzzleState]
  );

  const handleRealmCoreClick = useCallback(
    (
      corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight",
      event: React.MouseEvent<HTMLDivElement>
    ) => {
      if (editingMode) {
        const rect = event.currentTarget.getBoundingClientRect();
        const puzzleRect = puzzleContainerRef.current?.getBoundingClientRect();

        const isBottom = corner === "bottomLeft" || corner === "bottomRight";

        if (!puzzleRect) return;
        const position = calculateColorPickerPosition(rect, puzzleRect, {
          isBottomElement: isBottom,
          type: "corner",
          cornerSide: corner.includes("Left") ? "left" : "right",
          corner,
        });
        setColorPicker({ type: "realm", corner, position });
      } else {
        if (solving) return;
        const adjacentCoords = {
          topLeft: { row: 0, col: 0 },
          topRight: { row: 0, col: 2 },
          bottomLeft: { row: 2, col: 0 },
          bottomRight: { row: 2, col: 2 },
        };

        const { row: adjacentRow, col: adjacentCol } = adjacentCoords[corner];

        if (grid[adjacentRow][adjacentCol] !== realmColors[corner]) {
          setGrid(deepCopyGrid(lastUserProvidedState.grid));
          setRealmColors({ ...lastUserProvidedState.realmColors });
          setMessage({ msg: "Puzzle reset!", status: "info", visible: true });
          resetPuzzleState();
        } else {
          setMessage({
            msg: "Corner color is matched!",
            status: "good",
            visible: true,
          });
        }
      }
    },
    [
      editingMode,
      solving,
      grid,
      realmColors,
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
      setMessage({ msg: "Color updated!", status: "info", visible: true });
    },
    [colorPicker, grid, realmColors, updateLastUserState]
  );

  const solvePuzzle = useCallback(() => {
    if (solving) {
      workerRef.current?.terminate();
      setupWorker();
      setSolving(false);
      setMessage({ msg: "Solver cancelled.", status: "info", visible: true });
      return;
    }

    if (solveOverlay) {
      resetPuzzleState();
      return;
    }

    setSolving(true);
    setSolutionSteps([]);
    setMessage({ msg: "Solving puzzle...", status: "info", visible: true });

    workerRef.current?.postMessage({ grid, realmColors });
  }, [grid, realmColors, solveOverlay, resetPuzzleState, solving]);

  const handleReset = useCallback(() => {
    if (solving) return;
    setGrid(deepCopyGrid(lastUserProvidedState.grid));
    setRealmColors({ ...lastUserProvidedState.realmColors });
    setMessage({
      msg: "Puzzle reset to last saved state!",
      status: "info",
      visible: true,
    });
    resetPuzzleState();
  }, [lastUserProvidedState, resetPuzzleState, solving]);

  const handleClearAll = useCallback(() => {
    if (solving) return;
    const emptyGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(COLORS.GREY));
    const emptyRealmColors = {
      topLeft: COLORS.GREY,
      topRight: COLORS.GREY,
      bottomLeft: COLORS.GREY,
      bottomRight: COLORS.GREY,
    };

    setGrid(emptyGrid);
    setRealmColors(emptyRealmColors);
    setMessage({
      msg: "Board and target colors cleared!",
      status: "info",
      visible: true,
    });
    resetPuzzleState();
    setSolving(false);
  }, [resetPuzzleState, solving]);

  const toggleEditingMode = useCallback(() => {
    if (solving) return;
    setEditingMode((prev) => !prev);
  }, [solving]);

  useEffect(() => {
    if (message.visible && !solving) {
      const timer = setTimeout(() => {
        setMessage((prev) => ({ ...prev, visible: false }));
      }, MESSAGE_VISIBILITY_DURATION);
      return () => clearTimeout(timer);
    }
  }, [message, solving]);

  return (
    <Wrapper>
      <Title>Mora Jai Puzzle Solver</Title>
      <Container>
        <SideContainer>
          <InfoGroup>
            <Subtitle>Guide</Subtitle>
            <GuideText>
              The objective of the Mora Jai Puzzle is to match the colors of the
              four corner tiles on the 3x3 grid with their respective corner
              colors.
            </GuideText>
          </InfoGroup>
          <InfoGroup>
            <GuideListContainer>
              <GuideListTitle>Colors Mechanics:</GuideListTitle>
              <GuideList>
                <GuideListItem>
                  <b>Grey:</b> Does nothing.
                </GuideListItem>
                <GuideListItem>
                  <b>Black:</b> Shifts its row right.
                </GuideListItem>
                <GuideListItem>
                  <b>Green:</b> Swaps with the opposite tile.
                </GuideListItem>
                <GuideListItem>
                  <b>Pink:</b> Rotates neighboring tiles clockwise.
                </GuideListItem>
                <GuideListItem>
                  <b>Yellow:</b> Swaps with the tile above.
                </GuideListItem>
                <GuideListItem>
                  <b>Violet:</b> Swaps with the tile below.
                </GuideListItem>
                <GuideListItem>
                  <b>White:</b> Turns adjacent gray tiles white; if none, turns
                  itself gray.
                </GuideListItem>
                <GuideListItem>
                  <b>Red:</b> White becomes Black; Black becomes Red.
                </GuideListItem>
                <GuideListItem>
                  <b>Orange:</b> Becomes the majority color of its neighbors.
                </GuideListItem>
                <GuideListItem>
                  <b>Blue:</b> Triggers the center tile effect.
                </GuideListItem>
              </GuideList>
            </GuideListContainer>
          </InfoGroup>
        </SideContainer>
        <CenterColumn>
          <PuzzleContainer ref={puzzleContainerRef} $isSolving={solving}>
            <RealmCore
              corner="topLeft"
              targetColor={realmColors.topLeft}
              onClick={(e) => handleRealmCoreClick("topLeft", e)}
              isEditingMode={editingMode}
            />
            <RealmCore
              corner="topRight"
              targetColor={realmColors.topRight}
              onClick={(e) => handleRealmCoreClick("topRight", e)}
              isEditingMode={editingMode}
            />
            <RealmCore
              corner="bottomLeft"
              targetColor={realmColors.bottomLeft}
              onClick={(e) => handleRealmCoreClick("bottomLeft", e)}
              isEditingMode={editingMode}
            />
            <RealmCore
              corner="bottomRight"
              targetColor={realmColors.bottomRight}
              onClick={(e) => handleRealmCoreClick("bottomRight", e)}
              isEditingMode={editingMode}
            />
            <GridContainer>
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
            </GridContainer>
            <SolutionOverlay
              solutionSteps={solutionSteps}
              isVisible={solveOverlay}
            />
            <AnimatePresence mode="wait">
              {colorPicker && (
                <motion.div
                  key={"color-picker"}
                  style={{
                    position: "absolute",
                    top: colorPicker.position.top,
                    left: colorPicker.position.left,
                    zIndex: Z_INDEX_COLOR_PICKER,
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <ColorPicker
                    onSelectColor={handleColorSelect}
                    onClose={() => setColorPicker(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </PuzzleContainer>
          <MessageArea>
            <AnimatePresence>
              {message.visible && (
                <motion.div
                  key="message_popup"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <MessageText $status={message.status} $isSolving={solving}>
                    {message.msg}
                  </MessageText>
                </motion.div>
              )}
            </AnimatePresence>
          </MessageArea>
        </CenterColumn>
        <SideContainer>
          <InfoGroup>
            <Subtitle>Puzzle Controls</Subtitle>
            <ControlsMessage>
              Use the controls below to <b>edit</b> the puzzle, <b>solve</b> it,{" "}
              <b>reset it to last edit</b> or <b>clear all</b> tiles.
            </ControlsMessage>
            <ButtonContainer>
              <StyledButton
                $variant="edit"
                $isActive={editingMode}
                onClick={toggleEditingMode}
                disabled={solving}
              >
                {editingMode ? "Exit Edit Mode" : "Edit puzzle"}
              </StyledButton>
              <StyledButton
                $variant={solving ? "clear" : "solve"}
                onClick={solvePuzzle}
                disabled={editingMode}
              >
                {solving
                  ? "Cancel"
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
                Clear All
              </StyledButton>
            </ButtonContainer>
          </InfoGroup>
        </SideContainer>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Solver;
