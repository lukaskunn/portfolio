import { useEffect, useState } from 'react'

const useDevice = () => {
  const [device, setDevice] = useState('desktop')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isUltraWide, setIsUltraWide] = useState(false)
  const [isSmallTablet, setIsSmallTablet] = useState(false)
  const [isSmallDesktop, setIsSmallDesktop] = useState(false)

  const handleDeviceChange = (deviceType: string) => {
    setDevice(deviceType)
    setIsMobile(deviceType === 'mobile')
    setIsTablet(deviceType === 'tablet')
    setIsDesktop(deviceType === 'desktop')
    setIsUltraWide(deviceType === 'ultraWide')
    setIsSmallTablet(deviceType === 'smallTablet')
    setIsSmallDesktop(deviceType === 'smallDesktop')
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        handleDeviceChange('mobile')
      } else if (window.innerWidth <= 768) {
        handleDeviceChange('smallTablet')
      } else if (window.innerWidth <= 1024) {
        handleDeviceChange('tablet')
      } else if (window.innerWidth <= 1440) {
        handleDeviceChange('smallDesktop')
      } else if (window.innerWidth <= 1920) {
        handleDeviceChange('desktop')
      } else {
        handleDeviceChange('ultraWide')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    device,
    isMobile,
    isTablet,
    isDesktop,
    isUltraWide,
    isSmallTablet,
    isSmallDesktop,
  }
}

export default useDevice
