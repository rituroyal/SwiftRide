
import React from 'react';

function LocationPanelSearch(props) {
  // Use suggestions prop instead of hardcoded locations
  const { suggestions, onSelectSuggestion, activeInput, setPickupLocation, setDropoffLocation } = props;

  return (
    <div className="space-y-3">
      {/* Map over suggestions instead of hardcoded locations */}
      {suggestions.map((suggestion, index) => {
        // Assuming suggestions are simple strings for now.
        // If suggestions are objects with title/subtitle, adjust parsing here.
        const parts = suggestion.display_name.split(',');
        const title = parts[0];
        const subtitle = parts.slice(1).join(',');


        return (
          <div
            onClick={() => {
              // Call the onSelectSuggestion prop with the selected suggestion
              onSelectSuggestion(suggestion.display_name);

            
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

      {/* Display a message if no suggestions are available */}
      {suggestions.length === 0 && activeInput && (
        <div className="p-4 text-center text-gray-500">
          Start typing to see suggestions.
        </div>
      )}
    </div>
  );
}

export default LocationPanelSearch;


