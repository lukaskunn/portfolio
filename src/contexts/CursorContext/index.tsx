'use client'
import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import type { CursorContextType, SetIsHoveringProps, ModalProps, CursorSize } from '@/types';

const sizes: Record<CursorSize, string> = {
  big: "120px",
  medium: "80px",
  small: "40px",
  keep: "20px",
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [hoverImportantText, setHoverImportantText] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, scrollX: 0, scrollY: 0 });
  const [hoverSize, setHoverSize] = useState(sizes.big);
  const [modalProps, setModalProps] = useState<ModalProps>({
    isOpen: false,
    content: "",
    scramble: false,
  });

  const setIsHovering = useCallback(({ value, size }: SetIsHoveringProps) => {
    setHoverImportantText(value);
    if (!size) return;

    setHoverSize(sizes[size]);
  }, []);

  const handleModalPropsEnter = useCallback((content: string, scramble: boolean) => {
    setModalProps({ content, isOpen: true, scramble: scramble || false });
  }, []);

  const handleModalPropsLeave = useCallback((content: string) => {
    setModalProps({ content: content, isOpen: false, scramble: false });
  }, []);

  React.useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setPosition((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
    }

    function handleScroll() {
      setPosition((prev) => ({ ...prev, scrollX: window.scrollX, scrollY: window.scrollY }));
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const value = useMemo<CursorContextType>(() => ({
    hoverImportantText,
    setHoverImportantText,
    position,
    setPosition,
    hoverSize,
    setIsHovering,
    modalProps,
    setModalProps,
    handleModalPropsEnter,
    handleModalPropsLeave,
  }), [hoverImportantText, position, hoverSize, modalProps, setIsHovering, handleModalPropsEnter, handleModalPropsLeave]);

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
