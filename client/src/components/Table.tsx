//import axios from 'axios'
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";

import Edit from "../crud_components/edit";

export interface Subtask {
  subtask_id: number;
  subtask_name: string;
  ritual_name: string;
  ritual_id: number;
  subtask_state: number;
  subtask_priority: number;
  subtask_startdate: string;
  subtask_deadline: string;
}

export interface Table_Props {
  data: Subtask[];
  refresh: boolean;
  setRefresh: CallableFunction;
}

function getState(i: number) {
  switch (i) {
    case 0:
      return "Backlog";
    case 1:
      return "To Do";
    case 2:
      return "In Progress";
    case 3:
      return "Done";
    case 4:
      return "Cancelled";
    case 5:
      return "On Hold";
  }
}

function getPriority(i: number) {
  switch (i) {
    case 0:
      return "None";
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Urgent";
  }
}

function Table(props: Table_Props) {
  //fix this
  let data = props.data;
  const [edit_popup, set_edit_popup] = useState(false);
  const [update_id, set_update_id] = useState(0);
  data.push({
    subtask_id: 1,
    subtask_name: "Test",
    subtask_deadline: "test",
    subtask_priority: 1,
    subtask_startdate: "test",
    subtask_state: 1,
    ritual_id: 0,
    ritual_name: "Test",
  });

  useEffect(() => {
    if (!edit_popup) props.setRefresh(!props.refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit_popup]);

  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">Subtask</th>
          <th scope="col">Ritual</th>
          <th scope="col">State</th>
          <th scope="col">Priority</th>
          <th scope="col">Start</th>
          <th scope="col">Deadline</th>
          <th scope="col" style={{ width: 100 }}>
            {" "}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((subtask: Subtask) => (
          <tr key={subtask.subtask_id} className="align-middle">
            <td>{subtask.subtask_name}</td>
            <td>{subtask.ritual_name}</td>
            <td>{getState(subtask.subtask_priority)}</td>
            <td>{getPriority(subtask.subtask_priority)}</td>
            <td>{subtask.subtask_startdate}</td>
            <td>{subtask.subtask_deadline}</td>
            <td className="d-flex justify-content-center">
              <button
                id="edit_subtask_btn"
                name="edit_btn"
                title=" Edit"
                className="btn btn-outline-warning me-1"
                onClick={() => {
                  set_edit_popup(true);
                  set_update_id(subtask.subtask_id);
                }}
              >
                <Icon.Shadows />
              </button>
              <Edit
                trigger={edit_popup}
                setTrigger={set_edit_popup}
                update_id={update_id}
                subtask_id={subtask.subtask_id}
                set_update_id={set_update_id}
              />
              <button
                name="delete_btn"
                title="Delete"
                className="btn btn-outline-danger me-0"
              >
                <Icon.XDiamondFill />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      {data.length === 0 && (
        <tfoot>
          <tr>
            <td colSpan={7} className="text-center text-secondary-emphasis">
              HEE! HEE! HEE! All tasks are done, Happy Cursing!
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

export default Table;
