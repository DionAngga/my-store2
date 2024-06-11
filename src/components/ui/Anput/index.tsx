import styles from "./Input.module.scss";

type Propstypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
};
const Input = (props: Propstypes) => {
  const { label, name, type, placeholder, defaultValue } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={styles.container__input}
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default Input;
