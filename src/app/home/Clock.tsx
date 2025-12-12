'use client'
import React from 'react'

const Clock = () => {
  const [currentLocalTime, setCurrentLocalTime] = React.useState<string>('00:00:00 AM');

  React.useEffect(() => {
    const updateLocalTime = () => {
      const localTime = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setCurrentLocalTime(localTime);
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>{currentLocalTime}</>
  )
}

export default Clock