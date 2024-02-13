import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Tabs = ({ tabs, darkMode = true }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div
      className={`tabs-container sticky top-3 ${darkMode ? "dark" : ""} mb-8`}>
      <div className={`flex flex-wrap space-x-4 ${darkMode ? "dark" : ""}`}>
        {tabs?.map((tab, index) => (
          <Link key={index} to={tab.href}>
            <div
              className={`w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto cursor-pointer px-4 py-2 rounded-md mb-2 ${
                index === activeTab
                  ? darkMode
                    ? "bg-cyan-500 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleTabClick(index)}>
              {tab.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),
  darkMode: PropTypes.bool,
};

export default Tabs;
