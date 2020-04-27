import Link from "../link";
import styles from "./Logo.module.styl";

const Logo = () => (
  <div className={styles.logo}>
    <Link href="/">
      <a>
        <img src="/images/logo.svg" alt="Logo" />
      </a>
    </Link>
  </div>
);

export default Logo;
