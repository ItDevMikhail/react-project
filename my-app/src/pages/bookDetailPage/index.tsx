import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { CircularProgress } from "@material-ui/core";
import FancyBox from "../../commponents/galleryPopup";
import { IBookListPropsItem } from "./../../models/iBooks";

export default function BookDetailPage() {
  const [todos, setTodos] = useState<IBookListPropsItem>({
    _id: "",
    name: "",
    description: "",
  });
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  const getBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api${location.pathname}`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "чёт не то");
      }
      setLoading(false);
      if (data) setTodos(data);
      return data;
    } catch (e: any) {
      setLoading(false);
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log(location.pathname);
    getBook();
    return () => {
      setTodos(todos);
    };
  }, []);

  return (
    <>
      <div className="container detailPage">
        <h2>Book page</h2>
        <div className={loading ? "progressBar active" : "progressBar"}>
          <CircularProgress />
        </div>
        <div className={!loading ? "active" : "hidden"}>
          <h3>Название книги: {todos.name}</h3>
          <p className="descriptionText">
            <strong>Описание книги:</strong> {todos.description}
          </p>
          {todos.picture && (
            // <FancyBox>
            <>
              <p>
                <strong>Обложка книги:</strong>
              </p>
              <a
                data-fancybox="gallery"
                className="detailBigImg"
                href={`http://localhost:5000/${todos.picture}`}
              >
                <img
                  alt="images"
                  className="detailImg"
                  src={`http://localhost:5000/${todos.picture}`}
                />
              </a>
            </>
            //  </FancyBox> 
          )}
        </div>
      </div>
    </>
  );
}
