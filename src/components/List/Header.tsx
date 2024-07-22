import styles from "./Header.module.css";

interface Props {
  countTasks: number;
  countDoneTasks: number;
}

export function Header({ countTasks = 0, countDoneTasks = 0 }: Props) {
  return (
    <header className={styles.container}>
      <aside>
        <p>Tarefas criadas</p>
        <span>{countTasks}</span>
      </aside>

      <aside>
        <p>Concluídas</p>
        <span>{`${countDoneTasks} de ${countTasks}`}</span>
      </aside>
    </header>
  );
}
