import styles from "./Select.module.scss";

type option = {
  label: string;
  value: string;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: option[];
  className?: string;
};

const Select = (props: Proptypes) => {
  const { label, name, defaultValue, disabled, options, className } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={styles.container__select}
      >
        {options.map((option) => (
          <option
            value={option.value}
            key={option.label}
            className={`${styles.container__select__option} ${defaultValue === option.value && styles.container__select__selected}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
