import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./searchItem.module.css";
import data from "../../constants/generated.json";
import Pagination from "../Pagination";
function SearchItem() {
  const { searchQuery } = useSelector((state) => state.search);
  const [searchData, setSearchData] = useState();
  const [showFilters, setShowFilters] = useState(false);
  const [searchDataBackUp, setSearchDataBackUp] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);
  useEffect(() => {
    const filteredData = (searchData || []).filter((value) => {
      if (searchQuery === "") {
        return data;
      } else if (value.title.toLocaleLowerCase().includes(searchQuery)) {
        return value;
      }
    });
    if (searchQuery === "") {
      return setSearchData(data);
    }
    setSearchData(filteredData);
  }, [searchQuery]);

  useEffect(() => {
    const jsonData = data.map((item) => {
      return item;
    });
    setSearchDataBackUp(jsonData);
    setSearchData(jsonData);
  }, []);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  //   const displayedData = (searchData || []).slice(
  //     indexOfFirstData,
  //     indexOfLastData
  //   );

  const changePage = (number) => {
    setCurrentPage(number);
  };

  function formatDate(date) {
    let formattedDate = new Date(date),
      year = formattedDate.getFullYear();

    return year;
  }

  const filterItems = (value) => {
    switch (value) {
      case 0:
        const ascendingName = [...searchData].sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        return setSearchData(ascendingName);
      case 1:
        const descendingName = [...searchData].sort(function (a, b) {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        });
        return setSearchData(descendingName);
      case 2:
        const ascendingYear = [...searchData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return setSearchData(ascendingYear);
      case 3:
        const descendingYear = [...searchData].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        return setSearchData(descendingYear);
      default:
        break;
    }
  };

  const renderData = () => {
    return (searchData || [])
      .slice(indexOfFirstData, indexOfLastData)
      .map((item, index) => {
        return (
          <div className={styles.container} key={index}>
            <div className={styles.textContainer}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.nameAndYear}>
                {item.name} - {formatDate(item.createdAt)}
              </div>
            </div>
            <hr />
          </div>
        );
      });
  };

  return (
    <>
      <div className={styles.orderContainer}>
        <div className={styles.iconContainer}>
          <img
            className={
              showFilters === false
                ? styles.filterIcon
                : styles.filterIconAnimated
            }
            src="/images/filter.png"
            alt="Filter"
          />
          <div
            className={styles.iconText}
            onClick={() => setShowFilters(!showFilters)}
          >
            Order by
          </div>
        </div>
        {showFilters && (
          <div className={styles.orderItemsContainer}>
            <div onClick={() => filterItems(0)}>Name ascending</div>
            <div onClick={() => filterItems(1)}>Name descending</div>
            <div onClick={() => filterItems(2)}>Year ascending</div>
            <div onClick={() => filterItems(3)}>Year descending</div>
          </div>
        )}
      </div>

      {renderData()}
      <Pagination
        dataPerPage={dataPerPage}
        numberOfData={searchData && searchData.length}
        changePage={changePage}
        currentPage={currentPage}
      />
    </>
  );
}

export default SearchItem;
