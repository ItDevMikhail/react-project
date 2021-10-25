import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IBookListPropsItem,
  IFavoritesBooksLibProps,
} from "../../models/iBooks";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchaddFavorites } from "../../redux/actions/actionsFavorite";
import { fetchdeleteBooks } from "../../redux/actions/actionsBooks";
import { useHttp } from "./../../hooks/http.hook";

interface IBooksList {
  todos: IBookListPropsItem[];
}

export default function BooksListComponent({ todos }: IBooksList) {
  const [open, setOpen] = useState(false);
  const [delBookId, setDelBookId] = useState<string>("");

  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: IFavoritesBooksLibProps) => state.favorite.dataLib
  );
  const { request } = useHttp();

  const handleModalOpen = (itemId: string) => {
    setOpen(true);
    setDelBookId(itemId);
  };

  const handleDeclineClose = () => {
    setOpen(false);
  };
  const handleAcceptClose = () => {
    setOpen(false);
    dispatch(fetchdeleteBooks(delBookId));
  };
  const addFavorite = (itemId: string) => {
    dispatch(fetchaddFavorites(request, itemId));
  };
  const checkFavorite = (itemId: string) => {
    if (favorites.length) {
      let favor = favorites.filter((data: any) => data.bookId === itemId);
      if (favor.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <ul>
        {todos && todos.map((item: IBookListPropsItem, index) => (
          <li key={index.toString()}>
            <Link to={`/library/detail/${item._id}`}>{item.name}</Link>
            <div className={checkFavorite(item._id) ? "addedFavorite" : ""}>
              <span
                className="material-icons starIcon"
                onClick={() => addFavorite(item._id)}
              >
                star
              </span>
              <span
                className="material-icons deleteIcon"
                onClick={() => handleModalOpen(item._id)}
              >
                delete
              </span>
            </div>
          </li>
        ))}
      </ul>
      <Dialog
        open={open}
        onClose={handleDeclineClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Вы точно хотите удалить эту книгу?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeclineClose} id="cancelBtn">
            Отмена
          </Button>
          <Button onClick={handleAcceptClose} id="acceptBtn">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
