import React, { Fragment } from "react";
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
  position: { top: number; left: number };
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onSelectColor,
  onClose,
  position,
}) => {
  const colorsArray = Object.values(COLORS);
  return (
    <Fragment>
      <ModalBackground onClick={onClose} />
      <Container style={position}>
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
    </Fragment>
  );
};

export default ColorPicker;
