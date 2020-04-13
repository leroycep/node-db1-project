import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

function App() {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = () => {
    axios
      .get(`${API}/accounts`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.log("Failed to fetch accounts", err));
  };

  useEffect(fetchAccounts, []);

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <code>{JSON.stringify(account)}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
