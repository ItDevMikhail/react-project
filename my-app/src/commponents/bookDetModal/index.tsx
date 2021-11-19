import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IUserFavoriteProps {
  favoriteBooks: Array<any>;
  index: number;
  changeHandler: (index: number) => void;
  open: boolean;
}

export default function BookDetModalComponent({
  favoriteBooks,
  index,
  changeHandler,
  open,
}: IUserFavoriteProps) {

  const { t } = useTranslation();

  return (
    <>
      {open && (
        <div data-testid="element" className="bookDetModal" onClick={() => changeHandler(index)}>
          <div className="bookDetModalContent">
            <div className="modalClose"></div>
            <p>
              <strong>{t("Detail.BookName")}: </strong>{favoriteBooks[index].name}
            </p>
            <p className="descriptionText">
              <strong>{t("Detail.Description")}: </strong>
              {favoriteBooks[index].description}
            </p>
            {favoriteBooks[index].picture && (
              <div>
                <p>
                  <strong>{t("Detail.BookCover")}:</strong>
                </p>
                <img
                  alt="images"
                  className="bookDetModalImg"
                  src={`http://localhost:5000/${favoriteBooks[index].picture}`}
                />
              </div>
            )}
            <Link
              className="bookDetModalLink"
              to={`/library/detail/${favoriteBooks[index]._id}`}
            >
              {t("Detail.GoTo")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
