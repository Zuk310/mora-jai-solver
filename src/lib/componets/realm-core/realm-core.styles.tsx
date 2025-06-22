import styled, { css } from "styled-components";

const REALM_CORE_SIZE = "80px";
const REALM_ICON_SIZE = "45px";
const REALM_CORE_OFFSET = "-40px";
const Z_INDEX_REALM_CORE = 10;

export const Container = styled.div<{
  corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
}>`
  cursor: pointer;

  position: absolute;
  z-index: ${Z_INDEX_REALM_CORE};

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${REALM_CORE_SIZE};
  height: ${REALM_CORE_SIZE};

  color: #a0aec0;
  font-size: 36px;
  font-weight: 700;

  background-color: #111;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);

  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.3);
    color: #fff;
  }

  ${(props) => {
    if (props.corner === "topLeft")
      return css`
        top: ${REALM_CORE_OFFSET};
        left: ${REALM_CORE_OFFSET};
      `;
    if (props.corner === "topRight")
      return css`
        top: ${REALM_CORE_OFFSET};
        right: ${REALM_CORE_OFFSET};
      `;
    if (props.corner === "bottomLeft")
      return css`
        bottom: ${REALM_CORE_OFFSET};
        left: ${REALM_CORE_OFFSET};
      `;
    if (props.corner === "bottomRight")
      return css`
        bottom: ${REALM_CORE_OFFSET};
        right: ${REALM_CORE_OFFSET};
      `;
    return "";
  }}

  transition: all 0.2s ease-out;
`;

export const RealmIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${REALM_ICON_SIZE};
  height: ${REALM_ICON_SIZE};
`;
