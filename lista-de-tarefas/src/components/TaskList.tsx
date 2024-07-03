import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, completeTask, deleteTask } from '../services/api';
import { Button, TextField, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks().then(response => setTasks(response.data));
  }, []);

  const handleAddTask = () => {
    createTask(newTask).then(response => {
      setTasks([...tasks, response.data]);
      setNewTask('');
    });
  };

  const handleCompleteTask = (taskId: number) => {
    completeTask(taskId).then(() => {
      setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
    });
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId).then(() => {
      setTasks(tasks.filter(task => task.id !== taskId));
    });
  };

  return (
    <div>
      <TextField
        label="Nova Tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button onClick={handleAddTask}>Adicionar Tarefa</Button>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleCompleteTask(task.id)}
            />
            <ListItemText primary={task.title} />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
