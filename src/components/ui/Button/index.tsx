import styles from "./Button.module.scss";

type Proptypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean;
};

const Button = (props: Proptypes) => {
  const {
    type,
    onClick,
    children,
    variant = "warning",
    className,
    disabled = false,
  } = props;
  return (
    <div className={styles.container}>
      {!disabled && (
        <button
          type={type}
          onClick={onClick}
          className={`${styles.button} ${styles[variant]} ${className}`}
        >
          {children}
        </button>
      )}
    </div>
  );
};
export default Button;
