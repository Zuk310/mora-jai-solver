import React from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  GuideTitle,
  GuideText,
  GuideListContainer,
  GuideList,
  GuideListItem,
  GuideListTitle as MechanicsTitle,
} from "./guide-modal.styles";
import { FaTimes } from "react-icons/fa";
import { AnimatePresence } from "motion/react";

interface GuideModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <ModalOverlay
          initial={{ opacity: 0, pointerEvents: "none", y: 10, x: "-50%" }}
          animate={{ opacity: 1, pointerEvents: "auto", y: 0 }}
          exit={{ opacity: 0, pointerEvents: "none", y: -10 }}
          onClick={onClose}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose} aria-label="Close guide">
              <FaTimes />
            </CloseButton>
            <GuideTitle>How to Play</GuideTitle>
            <GuideText>
              The objective of the Mora Jai Puzzle is to match the colors of the
              four corner tiles on the 3x3 grid with their respective corner
              colors, which are indicated by the larger circles at each corner.
            </GuideText>

            <GuideListContainer>
              <MechanicsTitle>Color Mechanics</MechanicsTitle>
              <GuideList>
                <GuideListItem>
                  <b>Grey:</b> Does nothing.
                </GuideListItem>
                <GuideListItem>
                  <b>Black:</b> Shifts its entire row to the right, wrapping
                  around.
                </GuideListItem>
                <GuideListItem>
                  <b>Green:</b> Swaps its position with the tile on the opposite
                  side of the grid.
                </GuideListItem>
                <GuideListItem>
                  <b>Pink:</b> Rotates all 8 of its neighboring tiles clockwise.
                </GuideListItem>
                <GuideListItem>
                  <b>Yellow:</b> Swaps its position with the tile directly above
                  it.
                </GuideListItem>
                <GuideListItem>
                  <b>Violet:</b> Swaps its position with the tile directly below
                  it.
                </GuideListItem>
                <GuideListItem>
                  <b>White:</b> Inverts the color of adjacent gray and white
                  tiles.
                </GuideListItem>
                <GuideListItem>
                  <b>Red:</b> Changes all White tiles to Black, and all Black
                  tiles to Red.
                </GuideListItem>
                <GuideListItem>
                  <b>Orange:</b> Becomes the majority color of its four cardinal
                  neighbors.
                </GuideListItem>
                <GuideListItem>
                  <b>Blue:</b> Triggers the effect of the tile located in the
                  center of the grid.
                </GuideListItem>
              </GuideList>
            </GuideListContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default GuideModal;
