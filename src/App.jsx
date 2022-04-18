import "./App.css";
import { useEffect, useState } from "react";
import IssuesList from "./components/IssuesList";

const App = () => {
  // stores the current status of api fetch
  const [loadingState, setLoadingState] = useState("");

  // stores the data from api
  const [data, setData] = useState([]);

  // fetches data from api
  useEffect(() => {
    setLoadingState("Fetching issues...");

    fetch(
      "https://api.github.com/repos/PHP-FFMpeg/PHP-FFMpeg/issues?per_page=100"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setLoadingState("Failed to fetch issues.");
        }
      })
      .then((issues) => {
        setData(issues);
        setLoadingState("");
      })
      .catch((error) => {
        console.log(error);
        setLoadingState("Failed to fetch issues.");
      });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>PHP FFMpeg Issues</h1>
      </header>
      <main>
        {/* display current status of api fetch */}
        {loadingState.length !== 0 && <p>{loadingState}</p>}

        {/* render issues list only when there's no error */}
        {loadingState.length === 0 && (
          <IssuesList loadingState={loadingState} data={data} />
        )}
      </main>
    </div>
  );
};

export default App;
