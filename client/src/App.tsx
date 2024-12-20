import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";

function App() {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [backlog_checked, setBacklogChecked] = useState(false);
  const [todo_checked, setTodoChecked] = useState(false);
  const [inprogress_checked, setInprogressChecked] = useState(false);
  const [done_checked, setDoneChecked] = useState(false);
  const [cancelled_checked, setCancelledChecked] = useState(false);
  const [onhold_checked, setOnholdChecked] = useState(false);
  const [none_checked, setNoneChecked] = useState(false);
  const [low_checked, setLowChekced] = useState(false);
  const [medium_checked, setMediumChecked] = useState(false);
  const [high_checked, setHighChecked] = useState(false);
  const [urgent_checked, setUrgentChecked] = useState(false);
  const [rituals_checked, setRitualsChecked] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_subtasks",{
        params: {
          searchInput: searchInput,
          backlog_checked: backlog_checked,
          todo_checked: todo_checked,
          inprogress_checked: inprogress_checked,
          done_checked: done_checked,
          cancelled_checked: cancelled_checked,
          onhold_checked: onhold_checked,
          none_checked: none_checked,
          low_checked: low_checked,
          medium_checked: medium_checked,
          high_checked: high_checked,
          urgent_checked: urgent_checked,
          rituals_checked: rituals_checked
        }
      })
      .then((res) => {
        setData(res.data);
        console.log("FETCHED");
        //console.log(data)
      })
      .catch((err) => console.log(err));
  }, [refresh, searchInput, backlog_checked, todo_checked, inprogress_checked, done_checked, cancelled_checked, onhold_checked, none_checked, low_checked, medium_checked, high_checked, urgent_checked, rituals_checked]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-dark" data-bs-theme="dark">
              <Navbar />
              <div className="container-fluid">
                <div className="row flex-nowrap">
                  <div className="col-auto bg-body-secondary shadow">
                    <Sidebar 
                      refresh={refresh} 
                      setRefresh={setRefresh} 
                      searchInput={searchInput}
                      setSearchInput={setSearchInput}
                      backlog_checked={backlog_checked}
                      setBacklogChecked={setBacklogChecked}
                      todo_checked={todo_checked}
                      setTodoChecked={setTodoChecked}
                      inprogress_checked={inprogress_checked}
                      setInprogressChecked={setInprogressChecked}
                      done_checked={done_checked}
                      setDoneChecked={setDoneChecked}
                      cancelled_checked={cancelled_checked}
                      setCancelledChecked={setCancelledChecked}
                      onhold_checked={onhold_checked}
                      setOnholdChecked={setOnholdChecked}
                      none_checked={none_checked}
                      setNoneChecked={setNoneChecked}
                      low_checked={low_checked}
                      setLowChecked={setLowChekced}
                      medium_checked={medium_checked}
                      setMediumChecked={setMediumChecked}
                      high_checked={high_checked}
                      setHighChecked={setHighChecked}
                      urgent_checked={urgent_checked}
                      setUrgentChecked={setUrgentChecked}
                      rituals_checked={rituals_checked}
                      setRitualsChecked={setRitualsChecked}
                    />
                  </div>
                  <div className="col py-3">
                    <Table
                      data={data}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
