'use client'
import React from 'react'
import styles from "./Home.module.css";

const LocationTime = () => {
  const [currentLocalTime, setCurrentLocalTime] = React.useState<string>("");

  // Update local time
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

    updateLocalTime(); // Initialize immediately
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles["location-container"]}>
          <p className={styles["location"]}>
            / Based in São Paulo, <span>{currentLocalTime}</span>
          </p>
        </div>
  )
}

export default LocationTime