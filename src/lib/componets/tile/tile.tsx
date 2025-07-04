import React from "react";
import { StyledTile } from "./tile.styles";
import { COLORS } from "../../constants";

interface TileProps {
  color: COLORS;
  isEditingMode: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tile: React.FC<TileProps> = ({ color, isEditingMode, onClick }) => {
  return (
    <StyledTile color={color} $isEditingMode={isEditingMode} onClick={onClick}>
      {color.charAt(0)}
    </StyledTile>
  );
};

export default Tile;
