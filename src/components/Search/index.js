import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/actions/searchAction";
import styles from "./search.module.css";
function Search() {
  const [hovered, setHovered] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearchQuery = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  };
  const searchInput = () => {
    dispatch(setSearchQuery(search));
  }
  return (
    <div className={styles.container}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={hovered === false ? styles.searchBox : styles.searchBoxHover}
      >
        <div className={styles.searchIconContainer}>
          <i className={styles.searchIcon}></i>
        </div>
        <div className={styles.inputContainer}>
          <input
            placeholder="Search title"
            className={styles.input}
            type="text"
            value={search}
            name="search"
            onChange={handleSearchQuery}
            id="search"
          />
        </div>
      </div>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={searchInput}
        className={
          hovered === false ? styles.searchButton : styles.searchButtonHover
        }
      >
        SEARCH
      </button>
    </div>
  );
}

export default Search;
