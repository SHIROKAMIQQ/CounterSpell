import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";

import Create from "../crud_components/create";

export interface Sidebar_Props {
  refresh: boolean;
  setRefresh: CallableFunction;
  searchInput: string;
  setSearchInput: CallableFunction;
}

function Sidebar(props: Sidebar_Props) {
  const [add_subtask_popup, set_popup] = useState(false);

  useEffect(() => {
    props.setRefresh(!props.refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add_subtask_popup, props.searchInput]);

  return (
    <div className="d-flex flex-column px-3 pt-2 text-white min-vh-100">
      <h3 className="py-0">Tools</h3>
      <hr className="my-2" />
      <input
        className="form-control"
        placeholder="Search subtask"
        value={props.searchInput}
        onChange={(e) => props.setSearchInput(e.target.value)}
      />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item py-1">
          <a href="#" className="nav-link active">
            View All Tasks
          </a>
        </li>
        <li className="nav-item py-1">
          <a href="#" className="nav-link">
            View By Ritual
          </a>
        </li>
      </ul>
      <hr className="my-2" />
      <button
        id="add_subtask_btn"
        onClick={() => set_popup(true)}
        className="btn btn-warning"
      >
        ADD SUBTASK
      </button>
      <Create trigger={add_subtask_popup} setTrigger={set_popup} />
    </div>
  );
}

export default Sidebar;
