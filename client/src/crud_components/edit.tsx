import { useState, useEffect } from 'react';
import axios from 'axios';

import "./edit.css";
import {Subtask} from '../components/Table.tsx'

interface Edit_Props {
  trigger: boolean;
  setTrigger: CallableFunction;
	subtask_id: number;
  update_id: number;
	set_update_id: CallableFunction;
}

function Edit(props: Edit_Props){

  const [values, setValues] = useState([]);
    
  useEffect(() => {
		console.log(props)
    axios.get("http://localhost:3000/fetch_singlesubtask", {
      params: {
        subtask_id: props.update_id
      }
    })
    .then((res) => {
      setValues(res.data);
    })
    .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.trigger]);

	function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		props.setTrigger(false);
		axios.put("http://localhost:3000/edit_subtask", values, {
			params: {
				subtask_id: props.subtask_id
			}
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => console.log(err));
	}

  return (props.trigger && props.update_id == props.subtask_id) ? (
  	<div className="create_popup container-fluid z-3">
      <div className="create_popup_inner row">
        <h3>Edit Subtask</h3>
				{values.map((subtask: Subtask) => {
					console.log(props.update_id);
					return (
					<form onSubmit={handleSubmit}>
          <div className="row my-2">
            <label className="col-3 fw-bold" htmlFor="subtask_name">
              Subtask Name:
            </label>
            <input
							value={subtask.subtask_name}
              className="col form-control"
              type="text"
              name="subtask_name"
              onChange={(e) =>
                setValues([{...values[0], subtask_name: e.target.value }])
              }
              required
              placeholder="eg. Collect 5 Knackleberries"
            />
          </div>
          <div className="row my-2">
            <label className="col-3 fw-bold" htmlFor="ritual_name">
              Ritual Name:
            </label>
            <input
							value={subtask.ritual_name}
              className="col form-control"
              type="text"
              name="ritual_name"
              onChange={(e) =>
                setValues([{ ...values[0], ritual_name: e.target.value }])
              }
              required
              placeholder="eg. Summon Walpurgisnacht"
							disabled
            />
          </div>
          <div className="row my-2">
            <label className="col-3 fw-bold" htmlFor="subtask_startdate">
              Start:
            </label>
            <input
							value={subtask.subtask_startdate}
              className="col form-control"
              type="text"
              id="subtask_startdate"
              name="subtask_startdate"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_startdate: e.target.value }])
              }
              required
              placeholder="eg. On the 13th Witching Hour"
            />
          </div>
          <div className="row my-2">
            <label className="col-3 fw-bold" htmlFor="subtask_deadline">
              Deadline:
            </label>
            <input
							value={subtask.subtask_deadline}
              className="col form-control"
              type="text"
              id="subtask_deadline"
              name="subtask_deadline"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_deadline: e.target.value }])
              }
              required
              placeholder="eg. Before the Last Sundrop"
            />
          </div>
          <div className="form-group my-1">
            <label className="fw-bold px-0">State</label>
            <br />
            <input
              type="radio"
              id="backlog_radio"
              name="subtask_state"
              value="0"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_state: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_state) == 0}
            />
            <label htmlFor="backlog_radio">Backlog</label>
            <input
              type="radio"
              id="todo_radio"
              name="subtask_state"
              value="1"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_state: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_state) == 1}
            />
            <label htmlFor="todo_radio">To Do </label>
            <input
              type="radio"
              id="inprogress_radio"
              name="subtask_state"
              value="2"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_state: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_state) == 2}
            />
            <label htmlFor="inprogress_radio">In Progress</label>
            <input
              type="radio"
              id="done_radio"
              name="subtask_state"
              value="3"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_state: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_state) == 3}
            />
            <label htmlFor="done_radio">Done</label>
            <input
              type="radio"
              id="cancelled_radio"
              name="subtask_state"
              value="4"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_state: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_state) == 4}
            />
            <label htmlFor="cancelled_radio">Cancelled</label>
            <input
              type="radio"
              id="onhold_radio"
              name="subtask_state"
              value="5"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_state: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_state) == 5}
            />
            <label htmlFor="onhold_radio">On Hold</label>
          </div>
          <div className="form-group my-2">
            <label className="fw-bold px-0">Priority</label>
            <br />
            <input
              type="radio"
              id="none_radio"
              name="subtask_priority"
              value="0"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_priority: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_priority) == 0}
            />
            <label htmlFor="none_radio">None</label>
            <input
              type="radio"
              id="low_radio"
              name="subtask_priority"
              value="1"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_priority: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_priority) == 1}
            />
            <label htmlFor="low_radio">Low</label>
            <input
              type="radio"
              id="medium_radio"
              name="subtask_priority"
              value="2"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_priority: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_priority) == 2}
            />
            <label htmlFor="medium_radio">Medium</label>
            <input
              type="radio"
              id="high_radio"
              name="subtask_priority"
              value="3"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_priority: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_priority) == 3}
            />
            <label htmlFor="high_radio">High</label>
            <input
              type="radio"
              id="urgent_radio"
              name="subtask_priority"
              value="4"
              onChange={(e) =>
                setValues([{ ...values[0], subtask_priority: e.target.value }])
              }
              required
							checked = {Number(subtask.subtask_priority) == 4}
            />
            <label htmlFor="urgent_radio">Urgent</label>
          </div>
          <div className="form-group my-3">
            <button
              className="close-btn btn-close"
              onClick={() => props.setTrigger(false)}
            />
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>	
				)})}
        
      </div>
    </div>
    ) : ("");
}

export default Edit;