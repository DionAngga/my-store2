import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./Toaster.module.scss";

type PropTypes = {
  variant?: string;
  message: string;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const toasterVariant: any = {
  success: {
    title: "Success",
    icon: "bx-check-circle",
    color: "#005959",
    barColor: "#2efd00",
  },
  danger: {
    title: "Error",
    icon: "bx-x-circle",
    color: "#005959",
    barColor: "#ff0000",
  },
  warning: {
    title: "Warning",
    icon: "bx-error-circle",
    color: "#005959",
    barColor: "#ffd87e",
  },
};

const Toaster = (props: PropTypes) => {
  const { variant = "danger", message, setToaster } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.17);
      //setLengthBar((prevLength) => prevLength - 0.05);
    }, 10);
  };

  useEffect(() => {
    timerStart();
  }, []);

  return (
    <div
      className={`${styles.toaster} 
      ${styles[`toaster--${variant}`]}`}
    >
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__icon}>
          <i className={`bx ${toasterVariant[variant]?.icon}`} />
        </div>
        <div className={styles.toaster__main__text}>
          <p className={styles.toaster__main__text__title}>
            {toasterVariant[variant]?.title}
          </p>
          <p className={styles.toaster__main__text__message}>{message}</p>
        </div>
        <i
          onClick={() => {
            setToaster({});
          }}
          className={`bx bx-x ${styles.toaster__main__close}`}
        />
      </div>
      <div
        className={`${styles.toaster__timer}`}
        style={{ backgroundColor: toasterVariant[variant]?.color }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: toasterVariant[variant]?.barColor,
          }}
        />
      </div>
    </div>
  );
};
export default Toaster;
