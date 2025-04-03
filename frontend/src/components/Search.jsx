import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import MainPage from "./MainPage";
import SearchPage from "./SearchPage";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
    }

    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchPosts(debouncedQuery);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedQuery, isSearch]);

  const searchPosts = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search?q=${searchTerm}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query == "") {
      setIsSearch(false);
    }
  }, [query]);

  return (
    <>
      <div className="w-full max-w-lg mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full p-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setIsSearch(true);
            }}
            className="absolute right-3 top-2 text-gray-500"
          >
            <FaSearch />
          </button>
        </div>

        {loading && (
          <div className="mt-2 flex justify-center">
            <svg
              className="w-5 h-5 animate-spin text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"
              ></path>
            </svg>
          </div>
        )}

        {!loading &&
          !isSearch &&
          query.trim() !== "" &&
          (results.length > 0 ? (
            <div className="mt-2 border rounded-md p-2 bg-white shadow-sm">
              {results.map((post) => (
                <div
                  key={post._id}
                  className="p-2 border-b last:border-none text-left"
                >
                  <strong>{post.author}:</strong> {post.content}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-gray-500">No results found</p>
          ))}
      </div>
      {isSearch && <SearchPage results={results} />}
      {isSearch && <MainPage isSearch={isSearch} />}
    </>
  );
}
