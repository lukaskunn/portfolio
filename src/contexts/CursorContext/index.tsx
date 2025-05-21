import React, { createContext, useContext, useState, ReactNode } from 'react';

type CursorContextType = {
    hoverImportantText: boolean;
    setHoverImportantText: (value: boolean) => void;
    position: { x: number; y: number };
    setPosition: (value: { x: number; y: number }) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
    const [hoverImportantText, setHoverImportantText] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            setPosition({ x: event.clientX, y: event.clientY });
        }
        window.addEventListener('mousemove', handleMouseMove);
        handleMouseMove({
            clientX: position.x,
            clientY: position.y,
        } as MouseEvent); // Trigger the function once to set initial position
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    return (
        <CursorContext.Provider value={{ hoverImportantText, setHoverImportantText, position, setPosition }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
};