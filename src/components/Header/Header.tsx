import styles from './styles/header.module.scss';
import { Logo } from '../Logo/Logo';
import { NavigationBar } from '../NavigationBar/NavigationBar';

export const Header = () => {
  return (
    <div className={styles['wrapper']}>
      <Logo />
      <NavigationBar />
    </div>
  );
};
