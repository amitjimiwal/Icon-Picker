import React, { useState } from "react";
import IconPicker from "./IconPicker";
import * as Icons from "react-icons/fa";
const App: React.FC = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [SelectedIcon, setSelectedIcon] = useState<string | null>(null);
  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon);
    setIsPickerOpen(false);
  };
  const DynamicFaIcon = ({ name }: { name: string }) => {
    const IconComponent = Icons[name as keyof typeof Icons];
    return <IconComponent className="w-16 h-16" />;
  };
  return (
    <div className="p-4">
      <div className="w-screen min-h-screen flex flex-col items-center gap-4">
        <div className="text-center h-80 self-stretch flex flex-col justify-end">
          <h1 className="text-xl sm:text-7xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
            Icon Picker
            <p className="text-gray-500 text-3xl font-medium">
              Click on the box to select an icon
            </p>
          </h1>
        </div>
        {SelectedIcon && <p>You picked {SelectedIcon}</p>}
        <div className="relative">
          <div
            onClick={() => setIsPickerOpen(true)}
            className="w-24 h-24 border border-indigo-600 grid place-items-center cursor-pointer rounded-md hover:bg-indigo-100 transition-colors duration-300 ease-in-out"
          >
            {SelectedIcon && <DynamicFaIcon name={SelectedIcon} />}
          </div>
          {isPickerOpen && (
            <div className="absolute top-0 -left-28 transition-transform duration-75">
              <IconPicker
                rowsInOnePage={5}
                columnsInOnePage={5}
                iconHeight={20}
                iconWidth={20}
                onSelectIcon={handleIconSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
