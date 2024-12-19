import { useState } from "react";
import axios from "axios";

import "./create.css";

interface Props {
  trigger: boolean;
  setTrigger: CallableFunction;
}

function Create(props: Props) {
  const [values, setValues] = useState({
    subtask_name: "",
    ritual_name: "",
    subtask_state: "",
    subtask_priority: "",
    subtask_startdate: "",
    subtask_deadline: "",
  });

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    props.setTrigger(false);
    axios.post("http://localhost:3000/add_subtask", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return props.trigger ? (
    <div className="create_popup container z-3">
      <div className="create_popup_inner row">
        <h3>Create New Subtask</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="subtask_name">Subtask Name</label>
            <input
              type="text"
              name="subtask_name"
              onChange={(e) =>
                setValues({ ...values, subtask_name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="ritual_name">Ritual Name</label>
            <input
              type="text"
              name="ritual_name"
              onChange={(e) =>
                setValues({ ...values, ritual_name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="subtask_startdate">Start</label>
            <input
              type="text"
              id="subtask_startdate"
              name="subtask_startdate"
              onChange={(e) =>
                setValues({ ...values, subtask_startdate: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="subtask_deadline">Deadline</label>
            <input
              type="text"
              id="subtask_deadline"
              name="subtask_deadline"
              onChange={(e) =>
                setValues({ ...values, subtask_deadline: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group my-3">
            <label>State</label>
            <br />
            <input
              type="radio"
              id="backlog_radio"
              name="subtask_state"
              value="0"
              onChange={(e) =>
                setValues({ ...values, subtask_state: e.target.value })
              }
              required
            />
            <label htmlFor="backlog_radio">Backlog</label>
            <input
              type="radio"
              id="todo_radio"
              name="subtask_state"
              value="1"
              onChange={(e) =>
                setValues({ ...values, subtask_state: e.target.value })
              }
              required
            />
            <label htmlFor="todo_radio">To Do </label>
            <input
              type="radio"
              id="inprogress_radio"
              name="subtask_state"
              value="2"
              onChange={(e) =>
                setValues({ ...values, subtask_state: e.target.value })
              }
              required
            />
            <label htmlFor="inprogress_radio">In Progress</label>
            <input
              type="radio"
              id="done_radio"
              name="subtask_state"
              value="3"
              onChange={(e) =>
                setValues({ ...values, subtask_state: e.target.value })
              }
              required
            />
            <label htmlFor="done_radio">Done</label>
            <input
              type="radio"
              id="cancelled_radio"
              name="subtask_state"
              value="4"
              onChange={(e) =>
                setValues({ ...values, subtask_state: e.target.value })
              }
              required
            />
            <label htmlFor="cancelled_radio">Cancelled</label>
            <input
              type="radio"
              id="onhold_radio"
              name="subtask_state"
              value="5"
              onChange={(e) =>
                setValues({ ...values, subtask_state: e.target.value })
              }
              required
            />
            <label htmlFor="onhold_radio">On Hold</label>
          </div>
          <div className="form-group my-3">
            <label>Priority</label>
            <br />
            <input
              type="radio"
              id="none_radio"
              name="subtask_priority"
              value="0"
              onChange={(e) =>
                setValues({ ...values, subtask_priority: e.target.value })
              }
              required
            />
            <label htmlFor="none_radio">None</label>
            <input
              type="radio"
              id="low_radio"
              name="subtask_priority"
              value="1"
              onChange={(e) =>
                setValues({ ...values, subtask_priority: e.target.value })
              }
              required
            />
            <label htmlFor="low_radio">Low</label>
            <input
              type="radio"
              id="medium_radio"
              name="subtask_priority"
              value="2"
              onChange={(e) =>
                setValues({ ...values, subtask_priority: e.target.value })
              }
              required
            />
            <label htmlFor="medium_radio">Medium</label>
            <input
              type="radio"
              id="high_radio"
              name="subtask_priority"
              value="3"
              onChange={(e) =>
                setValues({ ...values, subtask_priority: e.target.value })
              }
              required
            />
            <label htmlFor="high_radio">High</label>
            <input
              type="radio"
              id="urgent_radio"
              name="subtask_priority"
              value="4"
              onChange={(e) =>
                setValues({ ...values, subtask_priority: e.target.value })
              }
              required
            />
            <label htmlFor="urgent_radio">Urgent</label>
          </div>
          <div className="form-group my-3">
            <button
              className="close-btn"
              onClick={() => props.setTrigger(false)}
            >
              Close
            </button>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Create;
