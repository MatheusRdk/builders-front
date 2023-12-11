import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import DropdownArchitect from './DropdownArchitect';


const ArchitectEditor = () => {
    const [arquitetos, setArquitetos] = useState([]);
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
          const apiResponse = await axios.get('http://ec2-52-91-90-91.compute-1.amazonaws.com:80/architects/all',
          { headers: { 'Authorization':  `Bearer ${token}`} });
    
          setArquitetos(apiResponse.data);
    
        } catch (error) {
          console.error('Erro ao carregar arquitetos:', error);
        }
      };

      return (
        <div className='flex-container p-6 rounded-md'>
          <h1 className="text-5xl font-bold mb-4 text-center font-urbanist">Arquitetos</h1>
          <Link className="mr-auto mt-3 bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300" to="/CadastrarArquiteto">
            Cadastrar novo arquiteto
          </Link>
          <br />
          <table className="custom-table font-urbanist font-bold">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Id</th>
                <th className="border p-2">Nome</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody className="custom-table font-urbanist font-bold">
              {arquitetos.map((arquiteto) => (
                <tr key={arquiteto.id}>
                  <td className="border p-2">{arquiteto.id}</td>
                  <td className="border p-2">{arquiteto.name}</td>
                  <td className="border p-2">
                    <DropdownArchitect id={arquiteto.id} name={arquiteto.name} />
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

export default ArchitectEditor;