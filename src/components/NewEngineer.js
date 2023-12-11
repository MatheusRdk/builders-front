import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewEngineer = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [message, setMessage] = useState('');


    async function  handleCreation() {
      try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const res = await axios.post(
            'http://ec2-52-91-90-91.compute-1.amazonaws.com:80/engineers',
            { name },
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (res.status === 201) {
            // Se o status for 201, consideramos como sucesso
            setMessage('Engenheiro cadastrado com sucesso!');
          } else {
            setMessage('Erro ao cadastrar engenheiro. Por favor, tente novamente.');
          }
        } catch (error) {
          console.error('Erro ao cadastrar engenheiro:', error);
          setMessage('Erro ao cadastrar engenheiro. Por favor, tente novamente.');
        }
      };

      return (
        <div className='flex-container p-6 rounded-md mx-auto max-w-md'>
          <h1 className="text-3xl font-bold mb-4 text-center font-urbanist">Cadastrar novo engenheiro</h1>
    
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
    
          <button
            onClick={handleCreation}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 mb-2"
          >
            Cadastrar
          </button>
          {message && (
              <p className={`text-center font-bold ${message.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
          )}
            <button className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300 mb-2">
          <Link to="/engenheiros">Voltar</Link>
          </button>
        </div>
      );
    };

export default NewEngineer;