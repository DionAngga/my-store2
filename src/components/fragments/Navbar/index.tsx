import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
const Navbar = () => {
  const { data } = useSession();
  return (
    <div className={styles.navbar}>
      <p className={styles.navbar__text}>
        name : {data ? data.user?.fullname : "kosong"}
      </p>
      <p className={styles.navbar__text}>
        role : {data ? data.user?.role : "kosong"}
      </p>
      <button
        className={styles.navbar__button}
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "LOGOUT" : "LOGIN"}
      </button>
    </div>
  );
};

export default Navbar;
