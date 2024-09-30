import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const CommentsSection = ({ comments }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 3;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * commentsPerPage;
  const currentComments = comments.slice(offset, offset + commentsPerPage);

  return (
    <div>
      <div className="comments-list">
        {currentComments.map((comment, index) => (
          <div key={index} className="comment">
            {comment.text}
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(comments.length / commentsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default CommentsSection;
