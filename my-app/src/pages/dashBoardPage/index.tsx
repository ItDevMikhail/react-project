import { useEffect } from "react";
import UserFavoriteComponent from "../../commponents/userFavorite";
import UserDataComponent from "../../commponents/userData";
import { CircularProgress } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserData } from "../../redux/actions/actionsUser";
import { fetchgetFavorites } from "../../redux/actions/actionsFavorite";
import { useTranslation } from "react-i18next";

export default function DashBoardPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const userData = useAppSelector((state) => state.user.data);

  const { t } = useTranslation();

  useEffect(() => {
    if (!userData.name) {
      dispatch(fetchUserData());
    }
    dispatch(fetchgetFavorites());
    return () => { };
  }, []);

  return (
    <div className="dashboard">
      <h1>{t("Dashboard.Dashboard")}</h1>
      <div className="container">
        <div className="dashboardTop">
          <div className="dashboardTopBlock">
            <p>
              <strong>{t("Dashboard.Data")}</strong>
            </p>
            <div
              className={
                loading ? "dashboardProgressBar active" : "dashboardProgressBar"
              }
            >
              <CircularProgress />
            </div>
            <UserDataComponent />
          </div>
          <div className="dashboardTopBlock">
            <p>
              <strong>{t("Dashboard.Favorite")}</strong>
            </p>
            <UserFavoriteComponent />
          </div>
          <div className="dashboardTopBlock">
            <p>
              <strong>{t("Dashboard.Others")}</strong>
            </p>
            <p>{t("Dashboard.Stab1")}</p>
            <p>{t("Dashboard.Stab2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
