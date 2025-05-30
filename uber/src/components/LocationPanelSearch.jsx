import React from 'react';

function LocationPanelSearch(props) {
  const locations = [
    '24B, Near Kapoor’s cafe, Sheryians Coding School, Bhopal',
    '14A, Opposite DB Mall, MP Nagar, Bhopal',
    '63C, Near RRL Ground, Habibganj Station, Bhopal',
    '88D, Beside AIIMS Hospital, Saket Nagar, Bhopal',
  ];

  return (
    <div className="space-y-3">
      {locations.map((loc, index) => {
        const parts = loc.split(',');
        const title = parts[0];
        const subtitle = parts.slice(1).join(',');

        return (
          <div
            onClick={() => {
              if (props.activeInput === 'pickup') {
                props.setPickupLocation(loc);
              } else if (props.activeInput === 'dropoff') {
                props.setDropoffLocation(loc);
              }
              
              // Do NOT open vehicle panel here!
            }}
            key={index}
            className="flex items-start space-x-2 cursor-pointer hover:bg-zinc-400 p-2 py-4 rounded-md"
          >
            <i className="ri-map-pin-line text-lg mt-1 text-gray-700"></i>
            <div>
              <p className="text-sm font-medium text-gray-800">{title}</p>
              <p className="text-xs text-gray-600">{subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LocationPanelSearch;


