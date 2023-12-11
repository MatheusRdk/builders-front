import React, { useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



    const AtualizarArquiteto = () => {
        const { id, name } = useParams();
        const [token, setToken] = useState(localStorage.getItem('token'));
        const [currentName, setCurrentName] = useState(name);
        const [message, setMessage] = useState('');
        
        const handleAtualizar = async () => {
            try {
              const res = await axios.put('http://ec2-52-91-90-91.compute-1.amazonaws.com:80/architects',
              { id, name: currentName },
              { headers: { 'Authorization':  `Bearer ${token}`} });
        
              if (res.status === 204) {
                // Se o status for 204, consideramos como sucesso
                setMessage('Arquiteto atualizado com sucesso!');
              } else {
                setMessage('Erro ao atualizar arquiteto. Por favor, tente novamente. \nVerifique o id do engenheiro ou arquiteto.');
              }
            } catch (error) {
              console.error('Erro ao atualizar arquiteto:', error);
              setMessage('Erro ao atualizar arquiteto. Por favor, tente novamente. \nVerifique o id do engenheiro ou arquiteto.');
            }
          };

          return(
            <div className="flex-container p-6 rounded-md mx-auto max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-center font-urbanist">Atualizar arquiteto</h1>
            <label className="block text-sm font-medium text-gray-600 mb-2">
                Id:
                <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="text" value={id} readOnly />
            </label>
            <br />
            <label className="block text-sm font-medium text-gray-600 mb-2">
                Nome:
                <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="text" value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
            </label>
            <br />
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 mb-2" onClick={handleAtualizar}>Atualizar</button>
            {message && (
              <p className={`text-center font-bold ${message.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>
              )}
            <button className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300 mb-2">
          <Link to="/arquitetos">Voltar</Link>
          </button>
          </div>
        )
    }

export default AtualizarArquiteto;
