import { motion } from "motion/react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 80%, 100% { 
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
`;

export const LoadingContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  background: linear-gradient(135deg, #101011 0%, #0a0a0a 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #59a6ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 24px;
`;

export const LoadingText = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  text-align: center;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Dot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  background-color: #59a6ff;
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;
