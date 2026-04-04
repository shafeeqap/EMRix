import { useEffect, useRef, useState, useCallback } from "react";

export const useDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  // Click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [close]);

  // ESC key support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [close]);

  return { open, toggle, close, ref };
};
