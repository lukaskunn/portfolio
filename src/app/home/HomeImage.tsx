import React from 'react';
import Image from 'next/image';
import styles from '@/styles/css/Homepage.module.css';

interface HomeImageProps {
  imageSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  lines?: string[];
}

const DEFAULT_LINES = [
  '/ WEB DESIGN (UI/UX)',
  '/ WEB DEVELOPER',
  '/ SOFTWARE ENGINEER',
];

const HomeImage: React.FC<HomeImageProps> = ({
  imageSrc = '/assets/images/homepage/test_1.jpg',
  alt = 'Profile portrait',
  width = 480,
  height = 480,
  lines = DEFAULT_LINES
}) => {
  return (
    <div className={styles['home-image-container']}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={styles['home-image']}
        priority
      />
      <div className={styles['block-box']} />
      <div className={styles['text-block']}>
        {lines.map((line) => (
          <span key={line} className={styles['text']}>{line}</span>
        ))}
      </div>
    </div>
  );
};

export default HomeImage;
