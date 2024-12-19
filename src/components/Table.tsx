export interface Subtask {
  name: string;
  ritual: string;
  priority: number;
  state: number;
  start: string;
  end: string;
}

interface Props {
  items: Subtask[];
  heading: string[];
}

const Table = ({ items, heading }: Props) => {
  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          {heading.map((item, index) => (
            <th scope="col" key={index + item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index + item.name}>
            <td>{item.name}</td>
            <td>{item.ritual}</td>
            <td>{item.priority}</td>
            <td>{item.state}</td>
            <td>{item.start}</td>
            <td>{item.end}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
