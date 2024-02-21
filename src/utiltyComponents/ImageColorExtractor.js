import React, { useState } from "react";
import { rgbStringToAllColors } from "../utilitys";

const ImageColorExtractor = () => {
  const isDarkMode = true;
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [contextMenuStyle, setContextMenuStyle] = useState({
    display: "none",
    position: "absolute",
  });
  const [contextMenuPosition, setContextMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const [selectedColor, setSelectedColor] = useState(null);

  const onDrop = (event) => {
    event.preventDefault();

    const file =
      (event.dataTransfer && event.dataTransfer.files[0]) ||
      (event.target.files && event.target.files[0]);

    console.log("File:", file);

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
        extractColors(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const extractColors = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, img.width, img.height).data;

      const colorMap = {};

      // Count occurrences of each color
      for (let i = 0; i < imageData.length; i += 4) {
        const color = [imageData[i], imageData[i + 1], imageData[i + 2]];
        const colorString = color.join(",");

        if (!colorMap[colorString]) {
          colorMap[colorString] = 1;
        } else {
          colorMap[colorString]++;
        }
      }

      // Convert colorMap to an array of objects for sorting
      const colorArray = Object.keys(colorMap).map((colorString) => ({
        color: colorString.split(",").map(Number),
        count: colorMap[colorString],
      }));

      // Sort colors by count in descending order
      colorArray.sort((a, b) => b.count - a.count);

      // Take the top 10 most used colors
      const topColors = colorArray.slice(0, 10);

      setColors(topColors.map((item) => `rgb(${item.color.join(",")})`));
    };
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(
      () => {
        console.log("Copied to clipboard:", value);
        hideContextMenu();
      },
      (error) => {
        console.error("Unable to copy to clipboard", error);
      }
    );
  };

  const showContextMenu = (event, color) => {
    event.preventDefault();

    const position = {
      top: event.clientY,
      left: event.clientX,
    };

    setContextMenuPosition(position);
    setContextMenuStyle({ display: "block" });
    setSelectedColor(color);
  };

  const hideContextMenu = () => {
    setContextMenuStyle({ display: "none" });
    setSelectedColor(null);
  };

  const handleCopy = (format) => {
    if (selectedColor) {
      switch (format) {
        case "rgb":
          copyToClipboard(rgbStringToAllColors(selectedColor).rgb);
          break;
        case "hex":
          copyToClipboard(rgbStringToAllColors(selectedColor).hex);
          break;
        case "hsl":
          copyToClipboard(rgbStringToAllColors(selectedColor).hsl);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={`${isDarkMode ? "text-white" : "text-black"}  mt-10`}>
      <label htmlFor="fileInput" className="cursor-pointer w-full">
        <div className="border-dashed border-2 border-gray-400 p-10 mb-2  min-w-full text-center cursor-pointer">
          Upload an Image
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onDrop}
          />
        </div>
      </label>

      {image && (
        <div className="flex gap-2 items-start">
          <img
            src={image}
            alt="Selected"
            className="border-dashed border-2 border-gray-400 p-4"
          />
          <div className="flex flex-wrap gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                onContextMenu={(e) => showContextMenu(e, color)}
                style={{
                  backgroundColor: color,
                }}
                className="border-dashed border-2 border-gray-400 transition-transform transform hover:scale-105">
                <p className="text-gray-700 flex flex-col p-4 gap-1 opacity-0 hover:opacity-100 transition-opacity text-[10px]">
                  <span>{rgbStringToAllColors(color).hex}</span>
                  <span>{rgbStringToAllColors(color).rgb}</span>
                  <span>{rgbStringToAllColors(color).hsl}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Context Menu */}
      <div
        className="context-menu"
        style={{
          ...contextMenuStyle,
          top: contextMenuPosition.top,
          left: contextMenuPosition.left,
        }}>
        <div onClick={() => handleCopy("rgb")}>Copy RGB</div>
        <div onClick={() => handleCopy("hex")}>Copy HEX</div>
        <div onClick={() => handleCopy("hsl")}>Copy HSL</div>
      </div>
    </div>
  );
};

export default ImageColorExtractor;
