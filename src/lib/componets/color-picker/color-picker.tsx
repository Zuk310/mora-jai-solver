import React from "react";
import { COLORS } from "../../constants";
import {
  Container,
  Button,
  CloseButton,
  ModalBackground,
} from "./color-picker.styles";

interface ColorPickerProps {
  onSelectColor: (color: COLORS) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSelectColor,
  onClose,
}) => {
  const colorsArray = Object.values(COLORS);
  return (
    <>
      <ModalBackground onClick={onClose} />
      <Container>
        {colorsArray.map((color) => (
          <Button
            key={color}
            color={color}
            onClick={() => onSelectColor(color)}
            title={color}
          >
            {color.charAt(0)}
          </Button>
        ))}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Container>
    </>
  );
};

export default ColorPicker;
