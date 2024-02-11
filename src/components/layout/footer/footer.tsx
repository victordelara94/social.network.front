import styles from './footer.module.scss';
const Footer = () => {
  return (
    <>
      <footer className={styles['footer']}>
        <address className={styles['address']}>By Victor &copy;</address>
      </footer>
    </>
  );
};
export default Footer;
