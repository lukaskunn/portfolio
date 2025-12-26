'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverSize, setHoverSize] = useState(sizes.big);
  const [modalProps, setModalProps] = useState<ModalProps>({
    isOpen: false,
    content: "",
    scramble: false,
  });

  const setIsHovering = ({ value, size }: SetIsHoveringProps) => {
    setHoverImportantText(value);
    if (!size) return;

    setHoverSize(sizes[size]);
  };

  const handleModalPropsEnter = (content: string, scramble: boolean) => {
    setModalProps({ content, isOpen: true, scramble: scramble || false });
  };

  const handleModalPropsLeave = (content: string) => {
    setModalProps({ content: content, isOpen: false, scramble: false });
  };

  React.useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove({
      clientX: position.x,
      clientY: position.y,
    } as MouseEvent);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [position.x, position.y]);

  return (
    <CursorContext.Provider
      value={{
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
      }}
    >
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
