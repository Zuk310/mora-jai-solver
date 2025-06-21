import styled from "styled-components";

export const StyledRealmCore = styled.div<{
  corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}>`
  position: absolute;
  width: 5rem;
  height: 5rem;
  background-color: rgb(120, 53, 15);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(254, 240, 138);
  font-size: 2.25rem;
  font-weight: 700;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 2px solid rgb(252, 211, 77);
  cursor: pointer;
  transform: scale(1);
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  &:hover {
    transform: scale(1.05);
  }

  span {
    position: absolute;
    font-size: 0.75rem;
    bottom: 0.25rem;
    font-weight: 400;
    color: rgb(253, 224, 71);
  }

  ${(props) => {
    if (props.corner === "topLeft") return `top: -24px; left: -24px;`;
    if (props.corner === "topRight") return `top: -24px; right: -24px;`;
    if (props.corner === "bottomLeft") return `bottom: -24px; left: -24px;`;
    if (props.corner === "bottomRight") return `bottom: -24px; right: -24px;`;
    return "";
  }}
`;
