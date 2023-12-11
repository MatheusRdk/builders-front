import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TelaPrincipal from './components/TelaPrincipal';
import CasasEditor from './components/CasasEditor';
import ArchitectEditor from './components/ArchitectEditor';
import EngineerEditor from './components/EngineerEditor';
import NewHouse from './components/NewHouse';
import NewEngineer from './components/NewEngineer';
import NewArchitect from './components/NewArchitect';
import AtualizarCasa from './components/AtualizarCasa';
import AtualizarArquiteto from './components/AtualizarArquiteto';
import AtualizarEngenheiro from './components/AtualizarEngenheiro';

const router = createBrowserRouter([
      { 
        path: "/",
        element: <App />
      },
      { 
        path: "home",
        element: <TelaPrincipal />
      },
      { 
        path: "casas",
        element: <CasasEditor />
      },
      { 
        path: "arquitetos",
        element: <ArchitectEditor />
      },
      { 
        path: "engenheiros",
        element: <EngineerEditor />
      },
      { 
        path: "CriarNovaCasa",
        element: <NewHouse />
      },
      { 
        path: "CadastrarEngenheiro",
        element: <NewEngineer />
      },
      { 
        path: "CadastrarArquiteto",
        element: <NewArchitect />
      },
      { 
        path: "AtualizarProjeto/:id/:projectName/:architectId/:engineerId",
        element: <AtualizarCasa />
      },
      { 
        path: "AtualizarArquiteto/:id/:name",
        element: <AtualizarArquiteto />
      },
      { 
        path: "AtualizarEngenheiro/:id/:name",
        element: <AtualizarEngenheiro />
      }
    ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

reportWebVitals();