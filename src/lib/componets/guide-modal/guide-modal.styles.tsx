import { motion } from "motion/react";
import styled from "styled-components";

export const ModalOverlay = styled(motion.div)`
  z-index: 1000;
  position: fixed;
  top: 0;

  width: calc(100% - 40px);
  max-width: 600px;
  height: 100%;

  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateX(-50%);

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ModalContent = styled.div`
  position: relative;

  background: #1c1c1e;
  padding: 40px;

  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;

  color: #f2f2f7;
`;

export const CloseButton = styled.button`
  cursor: pointer;

  position: absolute;
  top: 16px;
  right: 16px;

  background: none;
  border: none;
  color: #8e8e93;
  font-size: 24px;

  &:hover {
    color: #fff;
    transform: rotate(90deg);
  }

  transition: color 0.2s ease, transform 0.2s ease;
`;

export const GuideTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;

  margin-top: 0;
  margin-bottom: 16px;
`;

export const GuideText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #c7c7cc;

  margin-bottom: 24px;
`;

export const GuideListContainer = styled.div``;

export const GuideListTitle = styled.h3`
  margin: 0 0 12px 0;

  font-size: 20px;
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.01em;
`;

export const GuideList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const GuideListItem = styled.li`
  padding: 8px 0;
  font-size: 15px;
  font-weight: 400;
  color: #8e8e93;
  line-height: 1.5;

  border-bottom: 1px solid #3a3a3c;

  &:last-child {
    border-bottom: none;
  }

  b {
    color: #c7c7cc;
    font-weight: 600;
  }
`;
