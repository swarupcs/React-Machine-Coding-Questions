import Button from "./button";
import InputText from "./input-text";
import Suggestions from "./suggestions";

import "./style.css";
import { useCallback, useState } from "react";

function debounce(callback, delay) {
  let timeoutId = "";
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function AutoComplete({
  debounceInput = false,
  isLoading,
  suggestions,
  onChange = () => {},
}) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const debouncedFunction = useCallback(debounce(onChange, 200), [onChange]);

  function handleQueryChange(value) {
    setQuery(value);
    setShowList(true);
    manageDebouncing(value);
  }

  function manageDebouncing(value) {
    if (debounceInput) {
      debouncedFunction(value);
    } else {
      onChange(value);
    }
  }

  function handleClear() {
    setQuery("");
  }

  function handleSuggestionSelect(selectedSuggestion) {
    setQuery(selectedSuggestion);
    manageDebouncing(selectedSuggestion);
    setShowList(false);
  }

  const filteredQuery = suggestions.filter((suggestion) => {
    return suggestion.toLowerCase().includes(query.toLowerCase());
  });

  let showSuggestionsWithLoader = !!query.length && showList;

  if (isLoading && query.length) {
    showSuggestionsWithLoader = true;
  }

  return (
    <div className="autocomplete">
      <div>
        <InputText value={query} onChange={handleQueryChange} />
        <Button onClick={handleClear} label="Clear" />
      </div>

      {showSuggestionsWithLoader && (
        <Suggestions
          isLoading={isLoading}
          suggestions={filteredQuery}
          onSelect={handleSuggestionSelect}
          selectedSuggestion={query}
        />
      )}
    </div>
  );
}

export default AutoComplete;
