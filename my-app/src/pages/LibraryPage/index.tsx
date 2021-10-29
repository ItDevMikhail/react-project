import { useState, useEffect } from "react";
import { IBookListProps, IBookListPropsItem } from "../../models/iBooks";
import { CircularProgress } from "@material-ui/core";
import SearchInputComponent from "../../commponents/searchInput";
import BooksListComponent from "../../commponents/booksList";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/actions/actionsBooks";
import { fetchgetLibFavorites } from "../../redux/actions/actionsFavorite";

export default function LibraryPage() {
  const [filter, setFilter] = useState<string>("");
  const dispatch = useDispatch();
  const books = useSelector((state: IBookListProps) => state.books.data);
  const loading = useSelector((state: any) => state.books.loading);

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
        <h2>Library page</h2>
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
