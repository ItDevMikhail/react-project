import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { CircularProgress } from "@material-ui/core";
import FancyBox from "../../commponents/galleryPopup";
import { IBookListPropsItem } from "./../../models/iBooks";
import { useREST } from "../../hooks/useREST";
import { useTranslation } from "react-i18next";

export default function BookDetailPage() {
  const [todos, setTodos] = useState<IBookListPropsItem>({
    _id: "",
    name: "",
    description: "",
  });
  const location = useLocation();
  const { request, loading } = useREST();

  const { t } = useTranslation();

  const getBook = async () => {
    try {
      const data = await request(`/api${location.pathname}`, 'GET');
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
        <h2>{t("Detail.BookPage")}</h2>
        <div className={loading ? "progressBar active" : "progressBar"}>
          <CircularProgress />
        </div>
        <div className={!loading ? "active" : "hidden"}>
          <h3>{t("Detail.BookName")}: {todos.name}</h3>
          <p className="descriptionText">
            <strong>{t("Detail.Description")}:</strong> {todos.description}
          </p>
          {todos.picture && (
            <FancyBox>
              <>
                <p>
                  <strong>{t("Detail.BookCover")}:</strong>
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
