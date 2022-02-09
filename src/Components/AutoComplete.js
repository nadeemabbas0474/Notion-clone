import { useState } from "react";

export const AutoComplete = ({ data, onChangeInput }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    let query = e.target.value
    setValue(query);
    if (query.length > -1) {
      const filterSuggestions = data.filter(
        (suggestion) =>
          suggestion.indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
    document.getElementsByName("insertInputBlocks").value=""

  };
  
  const handleClick = (e) => {
    setSuggestions([]);
    onChangeInput(e.target.innerText)
    setValue(e.target.innerText);
    setSuggestionsActive(false);
    document.getElementsByName("insertInputBlocks").value=""
    setValue("")
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
    // e.target.value=""
  };

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={`list-style-type ${index === suggestionIndex ? "active" : ""}`}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      <input className="insertInputBlocks"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type ' / ' to insert blocks"
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );
  
};