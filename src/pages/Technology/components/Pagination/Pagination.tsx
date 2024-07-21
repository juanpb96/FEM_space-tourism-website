import styles from "./styles/pagination.module.scss";

export const Pagination = () => {
  return (
    <ol className={styles["wrapper"]}>
      <li className={styles["active"]}>1</li>
      <li>2</li>
      <li>3</li>
    </ol>
  );
};
