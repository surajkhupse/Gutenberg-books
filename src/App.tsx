import React, { useEffect, useState } from "react";
import fiction from "./assets/image/Fiction.svg";
import philosophy from "./assets/image/Philosophy.svg";
import drama from "./assets/image/Drama.svg";
import history from "./assets/image/History.svg";
import adventure from "./assets/image/Adventure.svg";
import politics from "./assets/image/Politics.svg";
import humour from "./assets/image/Humour.svg";
import next from "./assets/image/Next.svg";
import CategoryCard from "./Component/CategoryCard";
import CategoryDetail from "./Component/CategoryDetail";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showData, setShowData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    {
      id: 1,
      name: "FICTION",
      icon: fiction, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
    {
      id: 2,
      name: "PHILOSOPHY",
      icon: philosophy, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
    {
      id: 3,
      name: "DRAMA",
      icon: drama, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
    {
      id: 4,
      name: "HISTORY",
      icon: history, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
    {
      id: 5,
      name: "HUMOUR",
      icon: humour, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
    {
      id: 6,
      name: "ADVENTURE",
      icon: adventure, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
    {
      id: 7,
      name: "POLITICS",
      icon: politics, // Replace with actual image path or import
      linkIcon: next, // Replace with actual image path or import
      link: "#",
    },
  ];

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://skunkworks.ignitesol.com:8000/books"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBooks(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  const searchBooksByType = (typeKeyword: string) => {
    const keyword = typeKeyword.toLowerCase();

    return books.filter((book: any) => {
      return book.subjects.some((subject: any) =>
        subject.toLowerCase().includes(keyword)
      );
    });
  };

  const handleCategoryClick = (category: any) => {
    setShowData(category);
    setSelectedCategory(category);

    fetchBooks();
  };

  const foundBook = searchBooksByType(showData);

  return (
    <div>
      {!selectedCategory ? (
        <>
          <div className="bg-image d-flex justify-content-around mt-5">
            <div className="mt-4 pb-4">
              <div>
                <h1>Gutenberg Project</h1>
              </div>
              <div>
                <p>
                  A social cataloging website that allows you to freely search
                  its database of books, annotations, and reviews.
                </p>
              </div>
            </div>
          </div>
          <div className="container px-xl-5 text-center pt-4 pb-5">
            <div className="card-grid d-grid mx-auto px-xl-5">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  link={category.link}
                  linkIcon={category.linkIcon}
                  onClick={() => handleCategoryClick(category.name)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <CategoryDetail category={foundBook} selectCategory={showData} />
      )}
    </div>
  );
};

export default App;
