import React from "react";
import { StyledRealmCore } from "./realm-core.styles";
import { COLORS, REALM_SHAPES } from "../../constants";

interface RealmCoreProps {
  corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  targetColor: COLORS;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const RealmCore: React.FC<RealmCoreProps> = ({
  corner,
  targetColor,
  onClick,
}) => {
  return (
    <StyledRealmCore
      corner={corner}
      onClick={onClick}
      title={`Target: ${targetColor}`}
    >
      {REALM_SHAPES[targetColor]}
      <span>{targetColor}</span>
    </StyledRealmCore>
  );
};

export default RealmCore;
