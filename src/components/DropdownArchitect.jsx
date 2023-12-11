import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai";
import Dialog from './Dialog.jsx';
import { Link } from 'react-router-dom';


function DropdownArchitect({ id, name }) {
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');


  const handleCloseDialog = () => {
    setIsOpen(false)
    setIsShowDialog(!isShowDialog)
    setDeleteMessage('');
  }

  async function handleDelete() {
    try {
      const res = await axios.delete(`http://ec2-52-91-90-91.compute-1.amazonaws.com:80/architects/${id}`, {
        headers: { 'Authorization':  `Bearer ${token}`} 
      });
      if (res.status === 204) {
        setDeleteMessage('Arquiteto deletado com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setDeleteMessage('Erro ao deletar arquiteto. Por favor, tente novamente.\nVerifique se o arquiteto está atrelado a algum projeto.');
      }
    } catch (error) {
      console.error('Error deleting arquiteto:', error);
      setDeleteMessage('Erro ao deletar arquiteto. Por favor, tente novamente.\nVerifique se o arquiteto está atrelado a algum projeto.');
    }
  }

  const DialogActions = (btnColor) => {
    return (
      <div>
        <button
          type="button"
          
          onClick={handleDelete}
        >
          Deletar
        </button>
        <button
          type="button"
          
          onClick={handleCloseDialog}
        >
        </button>
      </div>
    );
  };

  return (
    <div>
        <button onClick ={() => setIsOpen((prev) => !prev)} className="p-1">
          {!isOpen ? (
            <AiOutlineCaretDown />
          ) : (
            <AiOutlineCaretUp />
          )
        }
          </button>

          {isOpen &&
            <div>
              <div className='flex-container font-bold mb-1 text-center font-urbanist compact-dropdown'>
                <button onClick={handleCloseDialog} className='font-bold p-1'>Deletar</button>
                <Link to={`/AtualizarArquiteto/${id}/${name}`}>Atualizar</Link>
              </div>
            </div>
          }

          {isShowDialog && (
        <Dialog
          handleCloseDialog={handleCloseDialog}
          actionsPannel={DialogActions('bg-green')}
          color={'bg-green'}
        >
          {deleteMessage || 'Tem certeza que quer deletar?'}
        </Dialog>
      )}
    </div >
  )
}


export default DropdownArchitect