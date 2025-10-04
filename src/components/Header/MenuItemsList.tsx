import React from "react";
import Link from "next/link";
import useDevice from "../../hooks/useDevice";
import MenuItem from "./components/MenuItem";
import styles from "./header.module.css";

interface MenuItemType {
  text: string;
  href: string;
}

interface MenuItemsListProps {
  menuItems: MenuItemType[];
}

const MenuItemsList = ({ menuItems }: MenuItemsListProps) => {
  const { isMobile, isSmallTablet } = useDevice();
  const isMobileView = isMobile || isSmallTablet;

  return (
    <>
      {menuItems.map((item: MenuItemType, index: number) => (
        <Link
          scroll={false}
          href={item.href}
          className={styles["menu-item"]}
          key={`menu-item-${index}-${isMobile ? "mobile" : "desktop"}`}
        >
          {isMobileView ? (
            item.text
          ) : (
            <MenuItem text={item.text} cursorSize="medium" />
          )}
        </Link>
      ))}
    </>
  );
};

export default MenuItemsList;
