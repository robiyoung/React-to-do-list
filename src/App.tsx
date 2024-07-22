import { useState } from "react";
import styles from "./App.module.css";

import { Button } from "./components/Button/Button";
import { Header } from "./components/Header/Header";
import { Input } from "./components/Input/Input";
import { Empty } from "./components/List/Empty";
import { Header as ListHeader } from "./components/List/Header";
import { Item } from "./components/List/Item";
import { PlusCircle } from "@phosphor-icons/react";

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [valueNewTask, setValueNewTask] = useState("");

  const countDoneTasks = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1;
    }
    return prevValue;
  }, 0);

  const handleRemoveTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    if (!valueNewTask) {
      return;
    }

    const newTask: ITask = {
      id: tasks.length + 1,
      text: valueNewTask,
      isChecked: false,
    };

    setTasks((state) => [...state, newTask]);
    setValueNewTask("");
  };

  const handleToggleTask = ({ id, value }: { id: number; value: boolean }) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value };
      }
      return { ...task };
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <Header />
      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setValueNewTask(e.target.value)}
            value={valueNewTask}
          />

          <Button onClick={handleAddTask}>
            Criar <PlusCircle size={16} weight="bold" />
          </Button>
        </div>
        <div className={styles.taskList}>
          <ListHeader
            countTasks={tasks.length}
            countDoneTasks={countDoneTasks}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </>
  );
}
