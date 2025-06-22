import { useState, useEffect } from "react";
import { Icon } from "./black.styles";

export const Black = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: 24, height: 24 }}></div>;
  }

  return (
    <div>
      <Icon />
    </div>
  );
};
