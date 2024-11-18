import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        Electrical Workbench
      </div>
      <div className={styles.userActions}>
        {user ? (
          <div>
            <span style={{ color: "white" }}>{user.signInDetails?.loginId}</span>
            <button className={styles.button} onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <button className={styles.button}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;