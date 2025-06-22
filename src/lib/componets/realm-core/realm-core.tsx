import React from "react";
import { Container, RealmIconWrapper } from "./realm-core.styles";
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
    <Container
      corner={corner}
      onClick={onClick}
      title={`Target: ${targetColor}`}
    >
      <RealmIconWrapper>{REALM_SHAPES[targetColor]}</RealmIconWrapper>
    </Container>
  );
};

export default RealmCore;
