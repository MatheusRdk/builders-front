import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

    const AtualizarCasa = () => {
        const { id, projectName, architectId, engineerId } = useParams();
        const [token, setToken] = useState(localStorage.getItem('token'));
        const [currentProjectName, setCurrentProjectName] = useState(projectName);
        const [currentArchitectId, setCurrentArchitectId] = useState(architectId);
        const [currentEngineerId, setCurrentEngineerId] = useState(engineerId);
        const [message, setMessage] = useState('');

        
        const handleAtualizar = async () => {
            try {
              const res = await axios.put('http://ec2-52-91-90-91.compute-1.amazonaws.com:80/houses',
              { id, projectName: currentProjectName, architectId: currentArchitectId, engineerId: currentEngineerId },
              { headers: { 'Authorization':  `Bearer ${token}`} });
        
              if (res.status === 204) {
                // Se o status for 204, consideramos como sucesso
                setMessage('Projeto atualizado com sucesso!');
              } else {
                setMessage('Erro ao atualizar casa. Por favor, tente novamente. \nVerifique o id do engenheiro ou arquiteto.');
              }
            } catch (error) {
              console.error('Erro ao atualizar casa:', error);
              setMessage('Erro ao atualizar casa. Por favor, tente novamente. \nVerifique o id do engenheiro ou arquiteto.');
            }
          };

          return (
            <div className="flex-container p-6 rounded-md mx-auto max-w-md">
              <h1 className="text-3xl font-bold mb-4 text-center font-urbanist">Atualizar projeto de casa</h1>
        
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Id do projeto:
                <input type="text" value={id} readOnly className="w-full p-2 border border-gray-300 rounded-md focus:outline-none bg-gray-200" />
              </label>
        
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nome:
                <input
                  type="text"
                  value={currentProjectName}
                  onChange={(e) => setCurrentProjectName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </label>
        
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Id do arquiteto:
                <input
                  type="text"
                  value={currentArchitectId}
                  onChange={(e) => setCurrentArchitectId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </label>
        
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Id do engenheiro:
                <input
                  type="text"
                  value={currentEngineerId}
                  onChange={(e) => setCurrentEngineerId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </label>
        
              <button
                onClick={handleAtualizar}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 mb-2"
              >
                Atualizar
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

export default AtualizarCasa;
