import { create } from "zustand";

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  setDevice: (width: number) => void;
}

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

const getDeviceType = (width: number) => {
  return {
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.tablet,
    width,
  };
};

export const useDeviceStore = create<DeviceState>((set) => ({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  width: typeof window !== "undefined" ? window.innerWidth : 1024,
  setDevice: (width: number) => set(getDeviceType(width)),
}));

// Initialize and listen to window resize
if (typeof window !== "undefined") {
  // Set initial value
  useDeviceStore.setState(getDeviceType(window.innerWidth));

  // Listen to resize events
  const handleResize = () => {
    useDeviceStore.getState().setDevice(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  // Cleanup is handled by the browser on page unload
}
