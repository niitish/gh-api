import { useState, useEffect } from "react";

const IssuesList = ({ loadingState, data }) => {
  // used to set search parameter
  const [search, setSearch] = useState("");

  // used to store filtered data
  const [issues, setIssues] = useState(data);

  // filters the data based on search query
  useEffect(() => {
    const filteredData = data.filter((issue) => {
      return issue.title.toLowerCase().includes(search.toLowerCase());
    });

    setIssues(filteredData);
  }, [search]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearch(query);
  };

  return (
    <>
      <section className="search_box">
        <label htmlFor="search">Search</label>
        <input
          value={search}
          type="text"
          name="search"
          id="search"
          onChange={handleSearch}
          placeholder="Search for issues"
          autoFocus
        />
      </section>

      {/* display issues */}
      {issues.length !== 0 && (
        <ul className="issues_list">
          {issues.map((issue, i) => {
            return (
              <li key={issue.id} className="issue">
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {i + 1 + ". " + issue.title}
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {/* fallback: when search text doesn't exist in issues list */}
      {loadingState.length === 0 && issues.length === 0 && (
        <p>No results found.</p>
      )}
    </>
  );
};

export default IssuesList;
