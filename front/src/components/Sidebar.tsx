import { useState } from "react";

import Create from "./crud_components/create";

const Sidebar = () => {
  const [add_subtask_popup, set_popup] = useState(false);
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <h1>Sidebar</h1>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item p-3">Search</li>
        <button id="add_subtask_btn" onClick={() => set_popup(true)}>
          ADD SUBTASK
        </button>
        <Create trigger={add_subtask_popup} setTrigger={set_popup} />
      </ul>
    </div>
  );
};

export default Sidebar;
