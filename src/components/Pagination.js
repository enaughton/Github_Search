import React, { useState } from "react";
import useAxios from "axios-hooks";
import { useDebounce } from "use-debounce";

function Pagination() {
  const [text] = useState("q");
  const [page, setPage] = useState(1);
  const [value] = useDebounce(text, 500);
  const [{ data, loading, error }] = useAxios({
    url: "https://api.github.com/search/users",
    params: {
      q: `${value}`,
      page,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <button onClick={() => setPage((p) => Math.max(1, p - 1))}>&lt;</button>
      <button onClick={() => setPage((p) => p + 1)}>&gt;</button>

      <pre>{JSON.stringify(data?.data, null, 2)}</pre>
    </div>
  );
}
export default Pagination;
