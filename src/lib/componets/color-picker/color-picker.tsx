import React from "react";
import { COLORS } from "../../constants";
import {
  StyledColorPickerContainer,
  StyledColorPickerButton,
  StyledCloseButton,
} from "./color-picker.styles";

interface ColorPickerProps {
  onSelectColor: (color: COLORS) => void;
  onClose: () => void;
  position: { top: number; left: number };
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSelectColor,
  onClose,
  position,
}) => {
  const colorsArray = Object.values(COLORS);
  return (
    <StyledColorPickerContainer style={position}>
      {colorsArray.map((color) => (
        <StyledColorPickerButton
          key={color}
          color={color}
          onClick={() => onSelectColor(color)}
          title={color}
        >
          {color.charAt(0)}
        </StyledColorPickerButton>
      ))}
      <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
    </StyledColorPickerContainer>
  );
};

export default ColorPicker;
