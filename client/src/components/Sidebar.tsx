import { useState } from "react";

import Create from "../crud_components/create";

const Sidebar = () => {
  const [add_subtask_popup, set_popup] = useState(false);
  return (
    <div className="d-flex flex-column px-3 pt-2 text-white min-vh-100">
      <h2 className="py-2">Tools</h2>
      <hr className="my-0" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item py-3">Search</li>
        <button
          className="btn btn-secondary"
          id="add_subtask_btn"
          onClick={() => set_popup(true)}
        >
          ADD SUBTASK
        </button>
        <Create trigger={add_subtask_popup} setTrigger={set_popup} />
      </ul>
    </div>
  );
};

export default Sidebar;
