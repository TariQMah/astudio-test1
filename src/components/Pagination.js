import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import axios from "axios";

const Pagination = () => {
  const location = useLocation();
  const {
    setData,
    setLoading,
    setTotalPages,
    totalPages,
    pageSize,
    currentPage,
    setCurrentPage,
    pageRoute,
  } = useContext(DataContext);

  const handlePageChange = async (page) => {
    if (page < 1 || page > totalPages) return;
    setLoading(true);

    const response = await axios.get(`https://dummyjson.com/${pageRoute}`, {
      params: { limit: pageSize, skip: (page - 1) * pageSize },
    });

    setData(response.data.users);
    setCurrentPage(page);
    setLoading(false);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const range = 2;
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // Adjust start and end to always show 5 buttons if possible
    if (end - start + 1 < 5) {
      if (start === 1) {
        end = Math.min(5, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, totalPages - 4);
      }
    }

    // Add first page button if necessary
    if (start > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-400"
        >
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <button
            key="prev-ellipsis"
            className="bg-gray text-gray py-2 px-4 rounded-md"
          >
            ...
          </button>
        );
      }
    }

    // Add page buttons
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`py-2 px-4 rounded-md ${
            i === currentPage
              ? "bg-blue text-white"
              : "bg-blue text-white hover:bg-blue-400"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add last page button if necessary
    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(
          <button
            key="next-ellipsis"
            className="bg-gray text-gray py-2 px-4 rounded-md"
          >
            ...
          </button>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-400"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue"
      >
        Previous
      </button>
      {renderPageButtons()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-blue text-white py-2 px-4 rounded-md hover:bg-blue"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
