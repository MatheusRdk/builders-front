import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Engineer from './Engineer';
import Architect from './Architect';
import { Link } from 'react-router-dom';


const TelaPrincipal = () => {
  const [casas, setCasas] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const [token, setToken] = useState(localStorage.getItem('token'));


  
  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
    } else {
      fazerChamadaAPI();
    }
  }, [token]);

  const fazerChamadaAPI = async () => {
    try {
      const apiResponse = await axios.get('http://ec2-52-91-90-91.compute-1.amazonaws.com:80/houses/all',
      { headers: { 'Authorization':  `Bearer ${token}`} });

      setCasas(apiResponse.data);

    } catch (error) {
      console.error('Erro ao carregar casas:', error);
    }
  };

  return (
    <div className='flex-container'>
      <nav className="bg-gray-800 text-white p-4 w-full">
        <div className="flex justify-center">
          <Link className="mr-11 font-urbanist" to="/casas">Casas</Link>
          <Link className="mr-10 font-urbanist" to="/arquitetos">Arquitetos</Link>
          <Link className="mr-7 font-urbanist" to="/engenheiros">Engenheiros</Link>
        </div>
      </nav>

      <div className='flex-container p-8 rounded-md'>
        <h1 className="text-4xl font-bold mb-4 text-center font-urbanist">Gestão de Casas, Arquitetos e Engenheiros</h1>
        <table className="custom-table font-urbanist font-bold">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Projeto</th>
              <th className="border p-2">Engenheiro</th>
              <th className="border p-2">Arquiteto</th>
            </tr>
          </thead>
          <tbody>
            {casas.map((casa) => (
              <tr key={casa.id}>
                <td className="border p-2">{casa.projectName}</td>
                <td className="border p-2">{casa.engineer ? <Engineer engineerId={casa.engineer} /> : ''}</td>
                <td className="border p-2">{casa.architect ? <Architect architectId={casa.architect} /> : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TelaPrincipal;