import { Check, Trash } from "@phosphor-icons/react";
import styles from "./Item.module.css";
import { ITask } from "../../App";

interface Props {
  data: ITask;
  removeTask: (id: number) => void;
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  const handleTaskToggle = () => {
    toggleTaskStatus({ id: data.id, value: !data.isChecked });
  };

  const checkboxCheckedClassName = data.isChecked
    ? styles["checkbox-checked"]
    : styles["checkbox-unchecked"];

  const paragraphCheckedClassName = data.isChecked
    ? styles["paragraph-checked"]
    : "";

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleTaskToggle}>
          <input readOnly type="checkbox" checked={true} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassName}`}>
            {data.isChecked && <Check size={12} />}
          </span>
        </label>
        <p className={`${styles.paragraph} ${paragraphCheckedClassName}`}>
          {data.text}
        </p>
      </div>
      <button>
        <Trash size={32} onClick={() => removeTask(data.id)} />
      </button>
    </div>
  );
}
