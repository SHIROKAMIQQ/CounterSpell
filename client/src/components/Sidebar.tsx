import { useState, useEffect } from "react";

import Create from "../crud_components/create";

export interface Sidebar_Props {
  refresh: boolean;
  setRefresh: CallableFunction;
}

function Sidebar(props: Sidebar_Props) {
  const [add_subtask_popup, set_popup] = useState(false);

  useEffect(() => {
    props.setRefresh(!props.refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add_subtask_popup]);

  return (
    <div className="d-flex flex-column px-3 pt-2 text-white min-vh-100">
      <h2 className="py-2">Tools</h2>
      <hr className="my-0" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item p-3">Search</li>
        <li className="nav-item py-1">
          <button
            id="add_subtask_btn"
            onClick={() => set_popup(true)}
            className="btn btn-warning"
          >
            ADD SUBTASK
          </button>
        </li>
        <li className="nav-item py-1">
          <button className="btn btn-secondary">Task View</button>
        </li>
        <li className="nav-item py-1">
          <button className="btn btn-secondary">Ritual View</button>
        </li>
        <Create trigger={add_subtask_popup} setTrigger={set_popup} />
      </ul>
    </div>
  );
}

export default Sidebar;
