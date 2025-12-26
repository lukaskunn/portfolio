'use client'
import { usePathname } from "next/navigation";
import HeaderDesktop from "@/components/Header/components/HeaderDesktop/HeaderDesktop";
import HeaderMobile from "@/components/Header/components/HeaderMobile";
import styles from "@/styles/css/header.module.css";

import type { HeaderProps } from '@/types';

function Header({ data }: HeaderProps) {
  const pathName = usePathname();

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <header className={styles.header} role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <HeaderDesktop data={data} />
        <HeaderMobile data={data} />
      </nav>
    </header>
  );
}

export default Header;
