import { useState } from "react";
import "./App.css";

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function App() {
  const [records, setRecords] = useState(
    localStorage.getItem("records")
      ? JSON.parse(localStorage.getItem("records"))
      : []
  );
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Name cannot be empty.");
    } else if (email.length === 0) {
      setError("Email cannot be empty.");
    } else if (!emailRegex.test(email)) {
      setError("Email not in the right format.");
    } else if (mobile.length === 0) {
      setError("Mobile cannot be empty.");
    } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
      setError("Mobile not in the right format.");
    } else {
      setRecords((v) => {
        v = [
          ...v,
          {
            name,
            email,
            mobile,
          },
        ];
        localStorage.setItem("records", JSON.stringify(v));
        return v;
      });
    }
  };

  return (
    <div className="App">
      {!!error.length && <p>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <table>
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
          {records.flatMap((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.mobile}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
