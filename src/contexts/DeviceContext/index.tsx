'use client'
import React, { useContext } from "react";
import type { DeviceContextType } from '@/types';

import useDevice from "../../hooks/useDevice";

export const DeviceContext = React.createContext<DeviceContextType>({
  device: "desktop",
  isMobile: false,
  isDesktop: true,
  isTablet: false,
  isSmallTablet: false,
  isSmallDesktop: false,
  isUltraWide: false,
});

export const useDeviceContext = () => useContext(DeviceContext);
interface DeviceContextProviderProps {
  children: React.ReactNode;
}

export const DeviceContextProvider = ({
  children,
}: DeviceContextProviderProps) => {
  const {
    device,
    isDesktop,
    isMobile,
    isSmallDesktop,
    isSmallTablet,
    isTablet,
    isUltraWide,
  } = useDevice();

  return (
    <DeviceContext.Provider
      value={{
        device,
        isMobile,
        isDesktop,
        isTablet,
        isSmallTablet,
        isSmallDesktop,
        isUltraWide,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
