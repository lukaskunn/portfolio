'use client'
import { usePathname } from "next/navigation";
import HeaderDesktop from "@/components/Header/components/HeaderDesktop/HeaderDesktop";
import HeaderMobile from "@/components/Header/components/HeaderMobile";
import styles from "@/styles/css/header.module.css";


function Header() {
  const pathName = usePathname();

  if (pathName === "/all-my-links") {
    return null;
  }

  return (
    <header className={styles.header}>
      <HeaderDesktop />
      <HeaderMobile />
    </header>
  );
}

export default Header;
