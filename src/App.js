import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => setRepos(response.data));
  }, []);

  async function handleAddRepository() {
    const result = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    
    const repo = result.data;
    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`/repositories/${id}`);

    if (result.status === 204){
      setRepos(repos.filter(repo => repo.id !== id));
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
