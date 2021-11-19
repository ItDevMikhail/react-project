import { useState, useEffect } from "react";
import { IBookListPropsItem } from "../../models/iBooks";
import { CircularProgress } from "@material-ui/core";
import SearchInputComponent from "../../commponents/searchInput";
import BooksListComponent from "../../commponents/booksList";
import { fetchBooks } from "../../redux/actions/actionsBooks";
import { fetchgetLibFavorites } from "../../redux/actions/actionsFavorite";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

export default function LibraryPage() {
  const [filter, setFilter] = useState<string>("");
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.data);
  const loading = useAppSelector((state) => state.books.loading);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchgetLibFavorites());
    dispatch(fetchBooks());
    return () => { };
  }, []);

  const onFilterChanged = (val: string) => {
    setFilter(val.trim());
  };

  let filtredTodos =
    filter.length > 0
      ? books.filter((book: IBookListPropsItem) =>
        book.name.toUpperCase().includes(filter.toUpperCase())
      )
      : books;

  return (
    <>
      <div className="container libraryPage">
        <h2>{t("Library.LibraryPage")}</h2>
        <SearchInputComponent onFilterChanged={onFilterChanged} />
        <br />
        <br />
        <div className={loading ? "progressBar active" : "progressBar"}>
          <CircularProgress />
        </div>
        <BooksListComponent todos={filtredTodos} />
      </div>
    </>
  );
}
