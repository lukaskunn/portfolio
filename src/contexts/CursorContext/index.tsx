'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

const sizes = {
  big: "120px",
  medium: "80px",
  small: "40px",
  keep: "20px",
};

type setIsHoveringProps = {
  value: boolean;
  size?: "big" | "medium" | "small" | "keep";
};

type ModalProps = {
  isOpen: boolean;
  content: string;
  scramble?: boolean;
};

type CursorContextType = {
  hoverImportantText: boolean;
  setHoverImportantText: (value: boolean) => void;
  position: { x: number; y: number };
  setPosition: (value: { x: number; y: number }) => void;
  hoverSize: string;
  setIsHovering: ({ value, size }: setIsHoveringProps) => void;
  modalProps: ModalProps;
  setModalProps: (value: ModalProps) => void;
  handleModalPropsEnter: (content: string, scramble: boolean) => void;
  handleModalPropsLeave: (content: string) => void;
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

  const setIsHovering = ({ value, size }: setIsHoveringProps) => {
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
