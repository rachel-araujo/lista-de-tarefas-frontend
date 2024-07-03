import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Home.scss';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='container-home'>
      <h1>Bem-vindo(a) à Lista de Tarefas!</h1>
      <Button variant="contained" color="primary" onClick={() => navigate('/tasks')}>
        Clique aqui para começar
      </Button>
    </div>
  );
};

export default Home;
