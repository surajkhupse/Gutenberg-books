import React, { useState } from "react";
import backButton from "../assets/image/Back.svg";

export interface CategoryDetailProps {
  category: any;
  selectCategory: any;
}

const CategoryDetail = (props: CategoryDetailProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredBooks = props.category.filter(
    (book: any) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some((author: any) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleBookClick = (book: any) => {
    const htmlFormatLink = book.formats["text/html"];
    if (htmlFormatLink) {
      window.open(htmlFormatLink, "_blank");
    } else {
      alert("HTML format is not available for this book.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="section mb-3">
          <div className="row">
            <div className="mt-5 pt-5 mb-3">
              <div className="d-flex ">
                <a href="">
                  <img src={backButton} alt="Back" />
                </a>
                <h2 className="fw-semibold mb-0 ms-3">
                  {props.selectCategory}
                </h2>
              </div>
            </div>

            <div className="row mb-4">
              <div className="search-box-container">
                <input
                  type="text"
                  className="form-control search-box-input"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <span className="search-icon">
                  <i className="fa fa-search" />
                </span>
                {searchTerm && (
                  <span className="clear-icon" onClick={clearSearch}>
                    <i className="fa fa-times" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section">
          <div className="row">
            {filteredBooks.map((book: any, index: any) => (
              <div
                className="col-md-2 mb-4 handCursor"
                key={index}
                onClick={() => handleBookClick(book)}
              >
                <div className="">
                  <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    className="card-img-top mb-2"
                    width="144px"
                    height="162px"
                  />
                  <div className="card-body">
                    <p className="card-title fw-semibold px-1">{book.title}</p>
                    <span className="card-text fw-semibold opacity-50 text-muted">
                      {book.authors[0].name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
