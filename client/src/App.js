import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const API = "http://localhost:5000/api";

const AppContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const AccountsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  div {
      max-width: 45%;
      margin-bottom: 2%;
  }
`;

const AccountCard = styled.div`
  border: 1px solid black;
  padding: 0 2%;
`;

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
    <AppContainer>
      <h2>Accounts</h2>
      <AccountsContainer>
        {accounts.map((account) => (
          <AccountCard key={account.id}>
            <h3>{account.name}</h3>
            <p>${account.budget}</p>
          </AccountCard>
        ))}
      </AccountsContainer>
    </AppContainer>
  );
}

export default App;
