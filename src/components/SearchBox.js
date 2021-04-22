import { useState } from "react";
import { useDebounce } from "use-debounce";
import useAxios from "axios-hooks";
import "../App.css";
import List from "./List";

export default function SearchBox() {
  const [text, setText] = useState("q");
  const [value] = useDebounce(text, 500);
  const [{ data, loading, error }] = useAxios({
    url: "https://api.github.com/search/users",
    params: {
      q: `${value}`,
    },
  });
  console.log(data);

  return (
    <div className="App">
      <input
        placeholder="Search..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error!</p> : null}
      <h3> </h3>
      {data && !error ? <List data={data} /> : null}
    </div>
  );
}
