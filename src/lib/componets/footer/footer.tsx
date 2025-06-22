import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  FooterContainer,
  FooterContent,
  FooterLink,
  FooterText,
} from "./footer.styles";

const BASE_GITHUB_URL = "https://github.com/Zuk310";
const GITHUB_URL = `${BASE_GITHUB_URL}/mora-jai-solver`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterLink
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
        >
          <FaGithub />
        </FooterLink>

        <FooterText>
          All credit goes to Dogubomb and Dogubomb Inc. This is an unofficial
          fan project.
        </FooterText>

        <FooterText>
          Developed by{" "}
          <a href={BASE_GITHUB_URL} target="_blank" rel="noopener noreferrer">
            Zuk
          </a>{" "}
          &copy; {currentYear}
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};
