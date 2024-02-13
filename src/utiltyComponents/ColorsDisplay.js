import React, { useState } from "react";
import colors from "../colors"; // Update the path accordingly

const ColorDisplay = () => {
  const [copiedColor, setCopiedColor] = useState("");

  const copyToClipboard = (color) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(""), 2000); // reset after 2 seconds
      })
      .catch((err) => {
        console.error("Error copying to clipboard: ", err);
      });
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      {Object.entries(colors).map(([colorKey, shades]) => (
        <div
          key={colorKey}
          className="flex flex-col md:flex-row items-center md:items-start">
          <h2 className="text-md text-gray-400 font-bold mb-2 w-full md:w-28">
            {colorKey}
          </h2>
          <div className="flex flex-wrap w-full md:w-auto">
            {Object.entries(shades).map(([shadeKey, value]) => (
              <div
                key={shadeKey}
                className="cursor-pointer overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
                onClick={() => copyToClipboard(value)}>
                <div
                  className={`w-full h-40 sm:h-32 md:h-40 lg:h-48 xl:h-56 bg-${colorKey}-${shadeKey} min-w-20 min-h-20 max-h-20 rounded-lg`}
                  style={{ backgroundColor: value }}>
                  <span className="bg-black text-white p-2 h-fit rounded">
                    {copiedColor === value ? "Copied" : "Copy"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorDisplay;
