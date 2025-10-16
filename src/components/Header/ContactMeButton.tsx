import React from "react";
import styles from "./header.module.css"
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

const ContactMeButton = () => {
  return (
    <Link href="/contact" className={styles["header-button"]}>
      / Contact Me
    </Link>
  );
};

export default ContactMeButton;
