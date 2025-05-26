import React, { useContext } from "react";

import useDevice from "../../hooks/useDevice";

interface DeviceContextProps {
  device: string;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isSmallTablet: boolean;
  isSmallDesktop: boolean;
  isUltraWide: boolean;
}

export const DeviceContext = React.createContext<DeviceContextProps>({
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
