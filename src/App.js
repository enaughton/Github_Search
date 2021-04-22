import { React, useState } from "react";
// import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import useAxios from "axios-hooks";
import "tailwindcss/tailwind.css";

function List({ data: { items, total_count, page } }) {
  return (
    <div>
      <h3 class="flex justify-center ">Total: {total_count}</h3>
      <div class="grid gap-4 grid-cols-4 space-x-2 w-full bg-white shadow-md rounded-lg md:overflow- mx-auto">
        {items.map((item) => (
          <div>
            <div class="card  min-w-sm border px-4 rounded border-gray-700 bg-gray-700 text-gray-50 transition-shadow shadow-xl hover:shadow-xl min-w-max">
              <a href={item.html_url}>
                <div class="flex items-center p-4">
                  <div class="relative flex flex-col items-center w-full">
                    <div class="h-24 w-24 md rounded-full relative avatar flex items-end justify-end text-purple-400 min-w-max flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
                      <img
                        class=" flex h-24 w-24 md rounded-full relative"
                        src={item.avatar_url}
                        alt="space"
                      />
                      <div class="absolute"></div>
                    </div>

                    <p class="text-sm text-gray-200">{item.login}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [text, setText] = useState("q");
  const [page, setPage] = useState(1);
  const [value] = useDebounce(text, 1000);
  const [{ data, error }] = useAxios({
    url: `https://api.github.com/search/users?page=${page}&&per_page=32`,
    params: {
      q: `${value}`,
      page,
    },
  });

  console.log(data);

  return (
    <div class="w-full px-3 mb-6">
      <div class="flex justify-center">
        <input
          type="search"
          name="q"
          onChange={(e) => {
            setText(e.target.value);
          }}
          class="flex appearance-none justify-center block w-half items-center bg-gray-200 text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
          placeholder="Search..."
          autocomplete="off"
        />
      </div>

      {data && !error ? <List data={data} /> : null}

      <div class="flex py-4 m-4 max-w-max justify-center bg-gry-50 shadow-md rounded-lg overflow-hidden mx-auto">
        <button
          class="flex py-4 m-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous Page
        </button>

        <button
          class=" flex py-4 m-4 bg-blue-500 hover:bg-blue-700 text-white center font-bold py-2 px-4 rounded"
          onClick={() => setPage((page) => page + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
