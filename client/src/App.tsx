import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";

function App() {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/fetch_subtasks")
      .then((res) => {
        setData(res.data);
        console.log("FETCHED");
        //console.log(data)
      })
      .catch((err) => console.log(err));
  }, [refresh]);

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
                    <Sidebar refresh={refresh} setRefresh={setRefresh} />
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
