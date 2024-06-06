import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [response, setResponse] = useState({
    message: "Fetching vote results ...",
    status: "loading",
  });

  useEffect(() => {
    const fetchDate = async () => {
      const apiEndpoint = "/api/v1/results";
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResponse({ message: data?.message, status: data?.status });
      setTotalVotes(data?.totalVotes);
      setVotes(data?.votes);
    };

    fetchDate();
  }, []);

  if (response.status !== "success") {
    return <p>{response.message}</p>;
  }

  if (response.status === "success")
    return (
      <div className="container">
        <div className="results-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Bike Company</th>
                <th>Total Votes</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{vote.itemName}</td>
                    <td>{vote.value}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total Votes</td>
                <td>{totalVotes}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
};

export default App;
