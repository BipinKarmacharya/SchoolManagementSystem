const SearchForm = ({ searchPlaceholder, options, optionLabel, onSearchChange, onSelectChange }) => {
  return (
    <form id="searchForm">
      <fieldset>
        <legend>Search</legend>
        <input
          type="search"
          name="searchInput"
          id="searchInput"
          placeholder={searchPlaceholder}
          onChange={onSearchChange} // ✅ Pass event correctly
        />
      </fieldset>
      <fieldset>
        <legend>{optionLabel}</legend>
        <select name="selectOption" id="selectOption" defaultValue="" onChange={onSelectChange}> 
          <option value="">All</option> 
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </fieldset>
    </form>
  );
};

export default SearchForm;
