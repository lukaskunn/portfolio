'use client';

import { useRouter } from 'next/navigation';
import { useCursor } from '@/contexts/CursorContext';
import styles from '@/styles/css/not-found.module.css';
import BackgroundGrid from './home/BackgroundGrid';

export default function NotFound() {
  const router = useRouter();
  const { setIsHovering, handleModalPropsEnter, handleModalPropsLeave } =
    useCursor();

  const handleReturnHome = () => {
    router.push('/home');
  };

  const handleButtonHoverEnter = () => {
    setIsHovering({ value: true, size: 'medium' });
    handleModalPropsEnter('Go Home', true);
  };

  const handleButtonHoverLeave = () => {
    setIsHovering({ value: false });
    handleModalPropsLeave('Go Home');
  };

  return (
    <div className={styles['not-found-page']}>
      <div className={styles['content-wrapper']}>
        {/* Error Code - Top Left */}


        {/* Main Content */}
        <div className={styles['main-content']}>
          <div className={styles['error-container']}>
            <div className={styles['page-not-found-label']}>/ PAGE NOT FOUND</div>
            <h1 className={styles['error-number']}>404</h1>
          </div>

          <h2 className={styles['error-title']}>Lost in the Digital Void?</h2>

          <p className={styles['error-description']}>
            The page you are looking for has been moved, deleted, or possibly
            never existed in this dimension.
          </p>

          <button
            className={styles['return-button']}
            onClick={handleReturnHome}
            onMouseEnter={handleButtonHoverEnter}
            onMouseLeave={handleButtonHoverLeave}
            aria-label="Return to home page"
          >
            <span className={styles['button-text']}>RETURN HOME</span>
            <span className={styles['button-arrow']} aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <div className={styles["error-code-container"]}>
          <div className={styles['error-code']}>
            <span>ERROR: 404_NOT_FOUND</span>
          </div>

          {/* System Status - Bottom Left */}
          <div className={styles['system-status']}>
            <span>SYSTEM STATUS: OPTIMAL</span>
          </div>

          {/* Bug Info - Bottom Right */}
          <div className={styles['bug-info']}>
            <span>BUG FOUND?: EMAIL</span>
          </div>
        </div>
      </div>
      <BackgroundGrid opacity={0.4}/>
    </div>
  );
}
