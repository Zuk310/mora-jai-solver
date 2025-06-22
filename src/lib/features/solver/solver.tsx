"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ColorPicker from "../../componets/color-picker/color-picker";
import RealmCore from "../../componets/realm-core/realm-core";
import SolutionOverlay from "@mora-jai/lib/componets/solution-overlay/solution-overlay";
import Tile from "../../componets/tile/tile";
import { COLORS, INITIAL_GRID, TARGET_REALM_COLORS } from "../../constants";
import { deepCopyGrid, solvePuzzleBFS } from "../../utils/solver";
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

const SOLUTION_RESET_DELAY = 100;
const MESSAGE_VISIBILITY_DURATION = 3000;
const SOLVER_TIMEOUT_DELAY = 10;
const COLOR_PICKER_WIDTH = 160;
const COLOR_PICKER_HEIGHT = 150;
const COLOR_PICKER_GAP = 10;
const Z_INDEX_COLOR_PICKER = 200;
const GRID_SIZE = 3;

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
  const loadRef = useRef<boolean>(false);
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
    (rect: DOMRect, puzzleRect: DOMRect): { top: number; left: number } => {
      let left =
        rect.left - puzzleRect.left + rect.width / 2 - COLOR_PICKER_WIDTH / 2;
      let top = rect.top - puzzleRect.top + rect.height + COLOR_PICKER_GAP;

      if (left < 0) {
        left = 0;
      }
      if (left + COLOR_PICKER_WIDTH > puzzleRect.width) {
        left = puzzleRect.width - COLOR_PICKER_WIDTH;
      }

      const potentialBottom = puzzleRect.top + top + COLOR_PICKER_HEIGHT;
      if (
        potentialBottom > window.innerHeight &&
        top > rect.top - puzzleRect.top
      ) {
        top =
          rect.top - puzzleRect.top - COLOR_PICKER_HEIGHT - COLOR_PICKER_GAP;
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
      setMessage({ msg: "Color updated!", status: "info", visible: true });
    },
    [colorPicker, grid, realmColors, updateLastUserState]
  );

  const solvePuzzle = useCallback(async () => {
    if (solveOverlay) {
      resetPuzzleState();
      return;
    }

    setSolving(true);
    setSolutionSteps([]);

    try {
      const result: SolverResult = await new Promise((resolve) => {
        setTimeout(() => {
          const solverResult = solvePuzzleBFS(grid, realmColors);
          resolve(solverResult);
        }, SOLVER_TIMEOUT_DELAY);
      });

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
          msg: "No solution found. Try a different configuration or reset.",
          status: "bad",
          visible: true,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setSolving(false);
      setMessage({
        msg: "An error occurred during solving.",
        status: "bad",
        visible: true,
      });
    }
  }, [grid, realmColors, solveOverlay, resetPuzzleState]);

  const handleReset = useCallback(() => {
    setGrid(deepCopyGrid(lastUserProvidedState.grid));
    setRealmColors({ ...lastUserProvidedState.realmColors });
    setMessage({
      msg: "Puzzle reset to last saved state!",
      status: "info",
      visible: true,
    });
    resetPuzzleState();
    setSolving(false);
  }, [lastUserProvidedState, resetPuzzleState]);

  const handleClearAll = useCallback(() => {
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
  }, [resetPuzzleState]);

  const toggleEditingMode = useCallback(() => {
    setEditingMode((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!loadRef.current) return;
    if (!editingMode) {
      setMessage({
        msg: "Puzzle configuration saved.",
        status: "info",
        visible: true,
      });
    } else {
      setMessage({
        msg: "Editing mode active.",
        status: "info",
        visible: true,
      });
    }
    resetPuzzleState();
  }, [editingMode, resetPuzzleState]);

  useEffect(() => {
    loadRef.current = true;
  }, []);

  useEffect(() => {
    if (message.visible) {
      const timer = setTimeout(() => {
        setMessage((prev) => ({ ...prev, visible: false }));
      }, MESSAGE_VISIBILITY_DURATION);

      return () => clearTimeout(timer);
    }
  }, [message]);

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
                  <b>Black:</b> Shifts its row left.
                </GuideListItem>
                <GuideListItem>
                  <b>Green:</b> Swaps with the opposite tile.
                </GuideListItem>
                <GuideListItem>
                  <b>Pink:</b> Rotates its 8 neighbors clockwise.
                </GuideListItem>
                <GuideListItem>
                  <b>Yellow:</b> Swaps with the tile above.
                </GuideListItem>
                <GuideListItem>
                  <b>Violet:</b> Swaps with the tile below.
                </GuideListItem>
                <GuideListItem>
                  <b>White:</b> Turns itself and 4 cross neighbors to Grey.
                </GuideListItem>
                <GuideListItem>
                  <b>Red:</b> White becomes Black; Black becomes Red.
                </GuideListItem>
                <GuideListItem>
                  <b>Orange:</b> Becomes the majority color of its 4 cross
                  neighbors.
                </GuideListItem>
                <GuideListItem>
                  <b>Blue:</b> Triggers the effect of the center tile.
                </GuideListItem>
              </GuideList>
            </GuideListContainer>
          </InfoGroup>
        </SideContainer>
        <CenterColumn>
          <PuzzleContainer ref={puzzleContainerRef}>
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
                  <MessageText status={message.status}>
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
                Clear All
              </StyledButton>
            </ButtonContainer>
          </InfoGroup>
        </SideContainer>
      </Container>
    </Wrapper>
  );
};

export default Solver;
