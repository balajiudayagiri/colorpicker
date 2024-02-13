import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { tabsLinks } from "./constant";
import Tabs from "./Tabs";

function App() {
  return (
    <div className="bg-black sm:p-10 p-3">
      <h1 className="bg-black text-white text-center text-7xl my-9 sticky top-0 font-bold">
        PureUI Pallete
      </h1>
      <Tabs tabs={tabsLinks} darkMode={true} />
      <Outlet />
    </div>
  );
}

export default App;
