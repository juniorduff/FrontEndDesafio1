import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);


  async function handleAddRepository() {
    // TODO
  api.post("repositories",{
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    },  
    ).then(response =>{
      setRepository([...repository,response.data]);
    })    
  }
  
  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    setRepository(repository.filter(rep => rep.id !== id))
  }

  return (
    <div>
     
      <ul data-testid="repository-list">
        {
          repository.map(repo=>{
          return  (      
          <li key={repo.id}>
            <div>
            {repo.title}
            </div>
          
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )})
        }
    </ul>      <button onClick={handleAddRepository}>Adicionar</button>
     
    </div>
  );
}

export default App;
