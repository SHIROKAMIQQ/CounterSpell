import { useState, useEffect } from "react";
import axios from 'axios';

import Create from "../crud_components/create";

export interface Sidebar_Props {
  refresh: boolean;
  setRefresh: CallableFunction;
  searchInput: string;
  setSearchInput: CallableFunction;
  backlog_checked: boolean;
  setBacklogChecked: CallableFunction;
  todo_checked: boolean;
  setTodoChecked: CallableFunction;
  inprogress_checked: boolean;
  setInprogressChecked: CallableFunction;
  done_checked: boolean;
  setDoneChecked: CallableFunction;
  cancelled_checked: boolean;
  setCancelledChecked: CallableFunction;
  onhold_checked: boolean;
  setOnholdChecked: CallableFunction;
  none_checked: boolean;
  setNoneChecked: CallableFunction;
  low_checked: boolean;
  setLowChecked: CallableFunction;
  medium_checked: boolean;
  setMediumChecked: CallableFunction;
  high_checked: boolean;
  setHighChecked: CallableFunction;
  urgent_checked: boolean;
  setUrgentChecked: CallableFunction;
  rituals_checked: number[];
  setRitualsChecked: CallableFunction;
}

interface Ritual {
  ritual_id: number;
  ritual_name: string;
}

function find_element(e: number, arr: number[]){
  const found = arr.find((a) => a == e);
  if (found === undefined) return false;
  return true;
}

function add_element(e: number, arr: number[]) {
  const ret = arr;
  ret.push(e);
  return ret;
}

function remove_element(e: number, arr: number[]) {
  return arr.filter((a) => a != e);
}

function Sidebar(props: Sidebar_Props) {
  const [add_subtask_popup, set_popup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);
  const [rituals, setRituals] = useState([]);
  const [ritual_click, setRitualClick] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/fetch_rituals")
    .then((res) => {
      setRituals(res.data);
      console.log("FETCHED RITUALS");
    })
    .catch((err) => console.log(err));
  }, [props.refresh]); 

  useEffect(() => {
    props.setRefresh(!props.refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add_subtask_popup, props.searchInput, ritual_click]);

  return (
    <div className="d-flex flex-column px-2 pt-2 text-white min-vh-100">
      <h3 className="py-0 mb-0">Tools</h3>
      <hr className="my-2" />
      <button
        id="add_subtask_btn"
        onClick={() => set_popup(true)}
        className="btn btn-secondary my-1"
      >
        ADD SUBTASK
      </button>
      <hr className="my-2" />
      <input
        className="form-control"
        placeholder="Search Subtask..."
        value={props.searchInput}
        onChange={(e) => props.setSearchInput(e.target.value)}
      />
      <ul className="nav nav-pills flex-column">
        <li className="nav-item py-1">
          <a
            href="#"
            className={selectedItem === 1 ? "nav-link active" : "nav-link"}
            onClick={() => {
              setSelectedItem(1);
            }}
          >
            View All Tasks
          </a>
        </li>
        <li className="nav-item py-1">
          <a
            href="#"
            className={selectedItem === 2 ? "nav-link active" : "nav-link "}
            onClick={() => {
              setSelectedItem(2);
            }}
          >
            View By Ritual
          </a>
        </li>
      </ul>
      <hr className="my-2" />
      <h3 className="py-0 mb-0">Filters</h3>
      <div className="checkbox-filters">
        <div className="ps-3 mt-2">
          <h5 className="py-0 mb-0">States</h5>
          <ul className="list-group borde mt-1">
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="backlog_checkbox"
                id="backlog_checkbox"
                checked={props.backlog_checked}
                onChange={() => props.setBacklogChecked(!props.backlog_checked)}
              />
              <label
                className="form-check-label py-0"
                htmlFor="backlog_checkbox"
              >
                Backlog
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="todo_checkbox"
                id="todo_checkbox"
                checked={props.todo_checked}
                onChange={() => props.setTodoChecked(!props.todo_checked)}
              />
              <label className="form-check-label py-0" htmlFor="todo_checkbox">
                To Do
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="inprogress_checkbox"
                id="inprogress_checkbox"
                checked={props.inprogress_checked}
                onChange={() =>
                  props.setInprogressChecked(!props.inprogress_checked)
                }
              />
              <label
                className="form-check-label py-0"
                htmlFor="inprogress_checkbox"
              >
                In Progress
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="done_checkbox"
                id="done_checkbox"
                checked={props.done_checked}
                onChange={() => props.setDoneChecked(!props.done_checked)}
              />
              <label className="form-check-label py-0" htmlFor="done_checkbox">
                Done
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="cancelled_checkbox"
                id="cancelled_checkbox"
                checked={props.cancelled_checked}
                onChange={() =>
                  props.setCancelledChecked(!props.cancelled_checked)
                }
              />
              <label
                className="form-check-label py-0"
                htmlFor="cancelled_checkbox"
              >
                Cancelled
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="onhold_checkbox"
                id="onhold_checkbox"
                checked={props.onhold_checked}
                onChange={() => props.setOnholdChecked(!props.onhold_checked)}
              />
              <label
                className="form-check-label py-0"
                htmlFor="onhold_checkbox"
              >
                On Hold
              </label>
            </li>
          </ul>
        </div>
        <div className="ps-3 mt-2">
          <h5 className="py-0 mb-0">Priorities</h5>
          <ul className="list-group flex-column border mt-1">
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="none_checkbox"
                id="none_checkbox"
                checked={props.none_checked}
                onChange={() => props.setNoneChecked(!props.none_checked)}
              />
              <label className="form-check-label py-0" htmlFor="none_checkbox">
                None
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="low_checkbox"
                id="low_checkbox"
                checked={props.low_checked}
                onChange={() => props.setLowChecked(!props.low_checked)}
              />
              <label className="form-check-label py-0" htmlFor="low_checkbox">
                Low
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="medium_checkbox"
                id="medium_checkbox"
                checked={props.medium_checked}
                onChange={() => props.setMediumChecked(!props.medium_checked)}
              />
              <label
                className="form-check-label py-0"
                htmlFor="medium_checkbox"
              >
                Medium
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="high_checkbox"
                id="high_checkbox"
                checked={props.high_checked}
                onChange={() => props.setHighChecked(!props.high_checked)}
              />
              <label className="form-check-label py-0" htmlFor="high_checkbox">
                High
              </label>
            </li>
            <li className="list-group-item bg-body-secondary py-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="urgent_checkbox"
                id="urgent_checkbox"
                checked={props.urgent_checked}
                onChange={() => props.setUrgentChecked(!props.urgent_checked)}
              />
              <label
                className="form-check-label py-0"
                htmlFor="urgent_checkbox"
              >
                Urgent
              </label>
            </li>
          </ul>
        </div>
        <div className="ps-3 mt-2">
          <h5 className="py-0 mb-0">Rituals</h5>
          <ul className="list-group flex-column border mt-1">
            {rituals.map((ritual: Ritual) => (
              <li className="list-group-item bg-body-secondary py-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={ritual.ritual_name + "_checkbox"}
                  id={ritual.ritual_name + "_checkbox"}
                  checked={find_element(ritual.ritual_id, props.rituals_checked)}
                  onChange={() => {
                    console.log(ritual.ritual_name, find_element(ritual.ritual_id, props.rituals_checked));
                    if (find_element(ritual.ritual_id, props.rituals_checked)) {
                      props.setRitualsChecked(remove_element(ritual.ritual_id, props.rituals_checked));
                      console.log("REMOVED" + ritual.ritual_id);
                    } else {
                      props.setRitualsChecked(add_element(ritual.ritual_id, props.rituals_checked));
                      console.log("ADDED" + ritual.ritual_id);
                    }
                    setRitualClick(!ritual_click)
                    console.log(props.rituals_checked);
                  }}
                />
                <label className="form-check-label py-0" htmlFor={ritual.ritual_name + "_checkbox"}>
                  {ritual.ritual_name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Create trigger={add_subtask_popup} setTrigger={set_popup} />
    </div>
  );
}

export default Sidebar;
