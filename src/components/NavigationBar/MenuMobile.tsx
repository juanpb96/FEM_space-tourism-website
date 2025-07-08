import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  getActiveClass,
  getBarAnimation,
  // getMobileAnimation, TODO: Check if this function is still needed - Issue #50
} from "./utils/Menu.utils";
import { motion, AnimatePresence } from "framer-motion";
import { menuVariants, optionsVariants } from "./animations/menu.variants";
import styles from "./styles/menu.module.scss";
import { MenuButton } from "./MenuButton";

const PAGES = ["Home", "Destination", "Crew", "Technology"];

interface MenuMobileProps {
  isOpen: boolean;
  onToggle: () => void;
}

// TODO: Reduce dependency between MenuMobile and Menu - Issue #50
export const MenuMobile = ({ isOpen, onToggle }: MenuMobileProps) => {
  const [activeMenuOptionIndex, setActiveMenuOptionIndex] = useState(-1);
  const olRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const activeElement = document.activeElement as HTMLElement | null;
  const interactiveElementsRef = useRef<
    (HTMLAnchorElement | HTMLButtonElement | null)[]
  >([]);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  if (!isOpen) {
    activeElement?.focus();
    document.body.style.overflow = "revert";
  }

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
    // TODO: Investigate if closing the Menu here enhances UX - Issue #48
    setActiveMenuOptionIndex(index);
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
                  className={getActiveClass}
                  onClick={() => onLinkClick(index)}
                >
                  <span className={styles["counter"]}>0{index}</span>
                  {page}
                </NavLink>
              </li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>

      {isOpen && activeMenuOptionIndex >= 0 && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={optionsVariants}
          className={styles["bar-wrapper"]}
        >
          <motion.div
            ref={barRef}
            className={styles["bar"]}
            initial={false}
            custom={{
              screenType: "mobile",
              index: activeMenuOptionIndex,
            }}
            animate={getBarAnimation("mobile")}
            variants={menuVariants}
          />
        </motion.div>
      )}
      <MenuButton ref={buttonRef} isOpen={isOpen} onToggle={onToggle} />
    </nav>
  );
};
