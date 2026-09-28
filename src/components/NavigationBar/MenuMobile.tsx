import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { optionsVariants } from "./animations/menu.variants";
import styles from "./styles/menu-mobile.module.scss";
import { MenuButton } from "./MenuButton";

const PAGES = ["Home", "Destination", "Crew", "Technology"];

interface MenuMobileProps {
  isOpen: boolean;
  onToggle: () => void;
}

// TODO: Check full-bleed menu on 200% zoom (try remote debugging) - Issue #48

// TODO: Reduce dependency between MenuMobile and Menu - Issue #50
export const MenuMobile = ({ isOpen, onToggle }: MenuMobileProps) => {
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] = useState(-1);
  const olRef = useRef<HTMLOListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const activeElement = document.activeElement as HTMLElement | null;
  const interactiveElementsRef = useRef<
    (HTMLAnchorElement | HTMLButtonElement | null)[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      activeElement?.focus();
      document.body.style.overflow = "revert";
      document.documentElement.style.overflow = "revert";
    };
  }, [isOpen, activeElement]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        onToggle();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onToggle]);

  // Preferred way compared to onAnimationComplete since it ensures the focus is set during the animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        interactiveElementsRef.current[0]?.focus();
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    const newIndex = PAGES.map((item) => item.toLowerCase()).indexOf(
      location.pathname.slice(1).toLowerCase()
    );

    if (newIndex >= 0) {
      setActiveMenuOptionIndex(newIndex);
    }
  }, [location.pathname, setActiveMenuOptionIndex]);

  // TODO: Refactor this code to use a more declarative approach and commit changes - Issue #50
  useEffect(() => {
    let focusCloseButton = true;
    let focusFirstLink = false;

    if (!interactiveElementsRef.current.includes(buttonRef.current)) {
      interactiveElementsRef.current.push(buttonRef.current);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      if (document.activeElement === interactiveElementsRef.current[0]) {
        focusCloseButton = true;
      }

      if (
        document.activeElement ===
        interactiveElementsRef.current[
          interactiveElementsRef.current.length - 1
        ]
      ) {
        focusFirstLink = true;
      }

      if (event.key === "Tab") {
        if (event.shiftKey) {
          focusFirstLink = false;
          if (focusCloseButton) {
            event.preventDefault();
            buttonRef.current?.focus();
            focusCloseButton = false;
          } else if (
            document.activeElement === interactiveElementsRef.current[1]
          ) {
            focusCloseButton = true;
          }
        } else {
          focusCloseButton = false;
          if (focusFirstLink) {
            event.preventDefault();
            interactiveElementsRef.current[0]?.focus();
            focusFirstLink = false;
          } else if (
            document.activeElement ===
            interactiveElementsRef.current[
              interactiveElementsRef.current.length - 2
            ]
          ) {
            focusFirstLink = true;
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const onLinkClick = (index: number) => {
    setActiveMenuOptionIndex(index);
    onToggle();
  };

  return (
    <nav
      className={styles["menu"]}
      role="navigation"
      aria-label="Main Navigation"
    >
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.ol
            ref={olRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={optionsVariants}
          >
            {PAGES.map((page, index) => (
              <li key={page}>
                <NavLink
                  to={`/${page}`}
                  ref={(el) => (interactiveElementsRef.current[index] = el)}
                  onClick={() => onLinkClick(index)}
                >
                  <span className={styles["counter"]}>0{index}</span>
                  {page}
                </NavLink>
                {activeMenuOptionIndex === index && (
                  <div className={styles["bar"]} />
                )}
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>

      <MenuButton ref={buttonRef} isOpen={isOpen} onToggle={onToggle} />
    </nav>
  );
};
