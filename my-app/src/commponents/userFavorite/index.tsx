import BookDetModalComponent from "./../bookDetModal/index";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  IFavoritesBooksProps,
  IFavoritesBooksPropsItem,
} from "../../models/iBooks";

export default function UserFavoriteComponent() {
  const favoriteBooks = useSelector(
    (state: IFavoritesBooksProps) => state.favorite.dataUser
  );

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const changeHandler = (index: number) => {
    setIndex(index);
    setOpen(!open);
  };

  return (
    <>
      {favoriteBooks[0].name && (
        <ul>
          {favoriteBooks.map(
            (item: IFavoritesBooksPropsItem, index: number) => (
              <li key={item.name}>
                <p>
                  {index + 1}
                  <a
                    className="userFavoriteLink"
                    onClick={() => changeHandler(index)}
                  >
                    {item.name}
                  </a>
                </p>
              </li>
            )
          )}
        </ul>
      )}
      {!favoriteBooks[0].name && <p>{t("Dashboard.NoFavorite")}</p>}
      <div>
        <BookDetModalComponent
          favoriteBooks={favoriteBooks}
          index={index}
          changeHandler={changeHandler}
          open={open}
        />
      </div>
    </>
  );
}
