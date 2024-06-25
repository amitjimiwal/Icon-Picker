import React, { useState } from "react";
import { IconType } from "react-icons";
import * as Icons from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
interface IconPickerProps {
  rowsInOnePage: number;
  columnsInOnePage: number;
  iconHeight: number;
  iconWidth: number;
  pickerHeight?: number;
  pickerWidth?: number;
  onSelectIcon: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = 300,
  pickerWidth = 300,
  onSelectIcon,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const iconList = Object.values(Icons);
  const totalPages = Math.ceil(iconList.length / iconsPerPage);
  const handleIconSelect = (icon: IconType) => {
    console.log(icon.name);
    onSelectIcon(icon.name);
  };

  const renderIcons = () => {
    const startIndex = (currentPage - 1) * iconsPerPage;
    const endIndex = startIndex + iconsPerPage;
    return iconList.slice(startIndex, endIndex).map((Icon, index) => (
      <button
        key={index}
        className="text-center w-full bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200"
        style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
        onClick={() => handleIconSelect(Icon)}
      >
        <div className="w-full">
          <Icon className="w-6 h-6" />
        </div>
      </button>
    ));
  };

  return (
    <div
      className="bg-white border border-gray-300 rounded-md shadow-lg mx-auto w-content flex flex-col items-center"
      style={{ width: `${pickerWidth}px`, height: `${pickerHeight}px` }}
    >
      <h1 className=" bg-gray-400 w-full text-lg font-bold p-3 text-center">
        Select an icon
      </h1>
      <div
        className={`grid grid-cols-${columnsInOnePage} gap-3 w-full place-content-center p-4 overflow-y-auto`}
        style={{ gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)` }}
      >
        {renderIcons()}
      </div>
      <div className="flex justify-between mt-4 gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default IconPicker;
