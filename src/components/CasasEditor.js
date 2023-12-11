import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Engineer from './Engineer';
import Architect from './Architect';    
import { Link } from 'react-router-dom';
import DropdownHouse from './DropdownHouse';
import { IoClipboardSharp } from "react-icons/io5";



const CasasEditor = () => {
    const [casas, setCasas] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
  
    useEffect(() => {
      if (!token) {
        console.error('Invalid token');
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
        <div className='flex-container p-6 rounded-md'>
          <h1 className="text-5xl font-bold mb-4 text-center font-urbanist">Projetos</h1>
          <Link className="mr-auto mt-3 bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300" to="/CriarNovaCasa">
            Criar novo projeto
          </Link>
          <br />
          <table className="custom-table font-urbanist font-bold">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Projeto</th>
                <th className="border p-2">Engenheiro</th>
                <th className="border p-2">Arquiteto</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody className="custom-table font-urbanist font-bold">
              {casas.map((casa) => (
                <tr key={casa.id}>
                  <td className="border p-2">{casa.id}</td>
                  <td className="border p-2">{casa.projectName}</td>
                  <td className="border p-2">{casa.engineer ? <Engineer engineerId={casa.engineer} /> : ''}</td>
                  <td className="border p-2">{casa.architect ? <Architect architectId={casa.architect} /> : ''}</td>
                  <td className="border p-2">
                    <DropdownHouse id={casa.id} projectName={casa.projectName} engineerId={casa.engineer} architectId={casa.architect} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mr-auto mt-3 bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300">
            <Link to="/">Voltar</Link>
          </div>
        </div>
      );
      
}

export default CasasEditor;