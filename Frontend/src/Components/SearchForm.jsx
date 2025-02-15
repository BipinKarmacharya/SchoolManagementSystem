// import "/src/assets/CSS/Pages/SearchForm.css";

const SearchForm = ({ searchPlaceholder, options, optionLabel }) => {
  return (
    <form method="post" action="" id="searchForm">
      <fieldset>
        <legend>Search</legend>
        <input
          type="search"
          name="searchInput"
          id="searchInput"
          placeholder={searchPlaceholder}
        />
      </fieldset>
      <fieldset>
        <legend>{optionLabel}</legend>
        <select name="selectOption" id="selectOption" defaultValue="">
          <option value="">All</option> {/* Allows optional selection */}
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