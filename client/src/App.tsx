//import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./App.css";

import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Table from "./components/Table.jsx";

function App() {
  return (
    <div className="bg-dark" data-bs-theme="dark">
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto bg-body-tertiary shadow">
            <Sidebar />
          </div>
          <div className="col py-3">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
