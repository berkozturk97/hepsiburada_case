import React from "react";
import styles from './pagination.module.css';

function Pagination({ dataPerPage, numberOfData, changePage, currentPage }) {
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(numberOfData / dataPerPage); index++) {
    pageNumbers.push(index);
  }
  return (
    <nav>
      <div className={styles.container}>
        {pageNumbers.map((number, index) => (
          <div className={styles.numberContainer} key={index}>
            <p className={currentPage === number ? styles.numberActive : styles.number} onClick={() => changePage(number)}>{number}</p>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Pagination;
