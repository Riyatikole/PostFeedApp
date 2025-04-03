import React from "react";
import Search from "./Search";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";

export default function MainPage({ isSearch }) {
 
  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <Search />
        {isSearch ? <SearchPage /> : <HomePage />}
      </div>
    </>
  );
}
