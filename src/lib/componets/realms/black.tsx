import { useState, useEffect } from "react";
import SvgBlackOrindaAries from "../../assets/realm-core/black-orinda-aries.svg";
import { Icon } from "./black.styles";

export const Black = () => {
  const [mounted, setMounted] = useState(false);
  console.log({ SvgBlackOrindaAries });
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or nothing on the server
    return <div style={{ width: 24, height: 24 }}></div>;
  }

  // Render the SVG only on the client after mount
  return (
    <div>
      <Icon />
    </div>
  );
};
