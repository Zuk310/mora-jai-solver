import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;

  background-color: rgba(18, 18, 18, 0.75);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  margin-top: auto;
  padding: 0 24px;
  box-sizing: border-box;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1200px;
  height: 100%;

  margin: 0 auto;
`;

export const FooterText = styled.p`
  margin: 0;

  font-size: 13px;
  color: #8e8e93;
  text-align: center;

  em {
    font-style: normal;
    color: #c7c7cc;
  }

  a {
    font-style: normal;
    font-weight: 600;
    color: #c7c7cc;
    text-decoration: none;

    &:hover {
      color: #fff;
    }

    transition: color 0.2s ease;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    &:nth-of-type(2) {
      display: none;
    }
  }
`;

export const FooterLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #a0aec0;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }

  transition: color 0.2s ease, transform 0.2s ease;
`;
