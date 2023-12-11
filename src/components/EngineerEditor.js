import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import DropdownEngineer from './DropdownEngineer';


const EngineerEditor = () => {
    const [engenheiros, setEngenheiros] = useState([]);
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
          const apiResponse = await axios.get('http://ec2-52-91-90-91.compute-1.amazonaws.com:80/engineers/all',
          { headers: { 'Authorization':  `Bearer ${token}`} });
    
          setEngenheiros(apiResponse.data);
    
        } catch (error) {
          console.error('Erro ao carregar engenheiros:', error);
        }
      };

      return (
        <div className='flex-container p-6 rounded-md'>
          <h1 className="text-5xl font-bold mb-4 text-center font-urbanist">Engenheiros</h1>
          <Link className="mr-auto mt-3 bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-300" to="/CadastrarEngenheiro">
            Cadastrar novo engenheiro
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
              {engenheiros.map((engenheiro) => (
                <tr key={engenheiro.id}>
                  <td className="border p-2">{engenheiro.id}</td>
                  <td className="border p-2">{engenheiro.name}</td>
                  <td className="border p-2">
                    <DropdownEngineer id={engenheiro.id} name={engenheiro.name} />
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

export default EngineerEditor;