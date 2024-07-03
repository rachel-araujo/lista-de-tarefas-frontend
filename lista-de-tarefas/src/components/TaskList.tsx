import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, completeTask, deleteTask } from '../services/api';
import { Button, TextField, Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
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
    fetchTasks().then(response => {
      setTasks(response.data);
    }).catch(error => {
      console.error('There was an error fetching the tasks!', error);
    });
  }, []);

  //Adicionar nova tarefa
  const handleAddTask = () => {
    createTask(newTask).then(response => {
      setTasks(prevTasks => [...prevTasks, response.data]);
      setNewTask('');
    }).catch(error => {
      console.error('There was an error creating the task!', error);
    });
  };
  
  //Definir status da tarefa
  const handleCompleteTask = (taskId: number) => {
    completeTask(taskId).then(() => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    }).catch(error => {
      console.error('There was an error completing the task!', error);
    });
  };

  //Excluir tarefa
  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId).then(() => {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }).catch(error => {
      console.error('There was an error deleting the task!', error);
    });
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'TAREFA', width: 300 },
    {
      field: 'completed',
      headerName: 'CONCLUÍDA',
      type: 'boolean',
      width: 300,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={() => handleCompleteTask(params.row.id)}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'EXCLUIR',
      width: 100,
      renderCell: (params) => (
        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container>
      <TextField
        label="Nova Tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        fullWidth
      />
      <Button onClick={handleAddTask} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
        Adicionar Tarefa
      </Button>
      <div style={{ height: 'auto', maxHeight: 600, width: '100%', marginTop: '2rem' }} >
        <DataGrid
          rows={tasks}
          columns={columns}
          paginationModel={{ page: 0, pageSize: 5 }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default TaskList;
