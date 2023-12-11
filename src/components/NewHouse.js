import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewHouse = () => {
    const [projectName, setProjectName] = useState('');
    const [architectId, setArchitectId] = useState();
    const [engineerId, setEngineerId] = useState();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [message, setMessage] = useState('');


    const handleCreation = async () => {
      try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.post(
            'http://ec2-52-91-90-91.compute-1.amazonaws.com:80/houses',
            { projectName, architectId, engineerId },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (res.status === 201) {
            // Se o status for 201, consideramos como sucesso
            setMessage('Projeto criado com sucesso!');
          } else {
            setMessage('Erro ao criar casa. Por favor, tente novamente. \nVerifique o id do engenheiro ou arquiteto.');
          }
        } catch (error) {
          console.error('Erro ao criar casa:', error);
          setMessage('Erro ao criar casa. Por favor, tente novamente. \nVerifique o id do engenheiro ou arquiteto.');
        }
      };

      return (
        <div className='flex-container p-6 rounded-md mx-auto max-w-md'>
          <h1 className="text-3xl font-bold mb-4 text-center font-urbanist">Criar novo projeto de casa</h1>
    
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Nome:
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
    
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Id do arquiteto:
            <input
              type="text"
              value={architectId}
              onChange={(e) => setArchitectId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
    
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Id do engenheiro:
            <input
              type="text"
              value={engineerId}
              onChange={(e) => setEngineerId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
    
          <button
            onClick={handleCreation}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 mb-2"
          >
            Criar
          </button>
          {message && (
              <p className={`text-center font-bold ${message.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
          )}
            <button className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300 mb-2">
          <Link to="/casas">Voltar</Link>
          </button>
        </div>
      );
    };

export default NewHouse;