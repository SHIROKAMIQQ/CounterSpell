import React from 'react'
//import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Table from "./components/Table.tsx";

function App() {
  let heading = ["Subtask", "Ritual", "Priority", "State", "Start", "Due"];
  let items = [
    {
      name: "Collect 5 Bramblesnout",
      ritual: "Summon Kranklemaw",
      priority: 3,
      state: 3,
      start: "Night of the Bloodcresent",
      end: "On the Morrow",
    },
    {
      name: "Collect 7 Yawberries",
      ritual: "Curse of Rot",
      priority: 2,
      state: 4,
      start: "Sumpter Eve",
      end: "Come Brightlight",
    },
    {
      name: "Draw Krat Circles",
      ritual: "Summon Kranklemaw",
      priority: 3,
      state: 2,
      start: "Night of the Bloodcresent",
      end: "On the Morrow",
    },
  ];
  return (
    <div className="bg-dark">
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto shadow">
            <Sidebar />
          </div>
          <div className="col py-3">
            <Table items={items} heading={heading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;