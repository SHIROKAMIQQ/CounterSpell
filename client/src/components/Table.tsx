import axios from 'axios'
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Icon from 'react-bootstrap-icons'

function Table() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/fetch_subtasks')
    .then((res) => {
        setData(res.data)
        console.log("FETCHED")
        console.log(data)
    })
    .catch((err) => console.log(err))
  }, [])

  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope = "col">Subtask</th>
          <th scope = "col">Ritual</th>
          <th scope = "col">State</th>
          <th scope = "col">Priority</th>
          <th scope = "col">Start</th>
          <th scope = "col">Deadline</th>
          <th scope = "col"> </th>
        </tr>
      </thead>
      <tbody>
        {data.map((subtask) => (
          <tr key = {subtask.subtask_id}>
            <td>{subtask.subtask_name}</td>
            <td>{subtask.ritual_name}</td>
            <td>{subtask.subtask_state}</td>
            <td>{subtask.subtask_priority}</td>
            <td>{subtask.subtask_startdate}</td>
            <td>{subtask.subtask_deadline}</td>
            <td>
              <button name = "edit_btn" title = " Edit" className = "btn btn-outline-warning"><Icon.Shadows /></button>
              <button name = "delete_btn" title = "Delete" className = "btn btn-outline-danger"><Icon.XDiamondFill /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;