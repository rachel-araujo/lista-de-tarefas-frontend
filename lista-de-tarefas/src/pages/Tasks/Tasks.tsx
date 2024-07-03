import React from 'react';
import TaskList from '../../components/TaskList';

import './Tasks.scss';


const Tasks: React.FC = () => {
  return (
    <div className='container-task'>
      <h1>Lista de Tarefas</h1>
      <TaskList />
    </div>
  );
};

export default Tasks;
