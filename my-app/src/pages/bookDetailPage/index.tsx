import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { CircularProgress } from "@material-ui/core";
import FancyBox from "../../commponents/galleryPopup";
import { IBookListPropsItem } from "./../../models/iBooks";
import { useHttp } from "../../hooks/http.hook";
import { FetchApi } from "../../services/fetch.services";

export default function BookDetailPage() {
  const [todos, setTodos] = useState<IBookListPropsItem>({
    _id: "",
    name: "",
    description: "",
  });
  const location = useLocation();
  const { request, loading } = useHttp();

  const getBook = async () => {
    try {
      const data = await FetchApi(`/api${location.pathname}`, 'GET');
      if (data) setTodos(data);
      return data;
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
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
            <FancyBox>
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
            </FancyBox>
          )}
        </div>
      </div>
    </>
  );
}
