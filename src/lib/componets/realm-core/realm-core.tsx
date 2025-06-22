import React from "react";
import { Container, InnerCircle } from "./realm-core.styles";
import { COLORS } from "../../constants";

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
      $corner={corner}
      onClick={onClick}
      title={`Target: ${targetColor}`}
    >
      <InnerCircle color={targetColor} />
    </Container>
  );
};

export default RealmCore;
