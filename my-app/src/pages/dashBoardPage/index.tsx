import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import UserFavoriteComponent from "../../commponents/userFavorite";
import UserDataComponent from "../../commponents/userData";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/actions/actionsUser";
import { fetchgetFavorites } from "../../redux/actions/actionsFavorite";

export default function DashBoardPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.user.loading);
  const userData = useSelector((state: any) => state.user.data);
  const state = useSelector((state: any) => state);

  const { request } = useHttp();

  useEffect(() => {
    if (!userData.name) {
      dispatch(fetchUserData());
    }
    dispatch(fetchgetFavorites(request));
    console.log(state);
    return () => { };
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="container">
        <div className="dashboardTop">
          <div className="dashboardTopBlock">
            <p>
              <strong>My data</strong>
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
              <strong>My Favorite Books</strong>
            </p>
            <UserFavoriteComponent />
          </div>
          <div className="dashboardTopBlock">
            <p>
              <strong>Others</strong>
            </p>
            <p>Пока ничего не придумал</p>
            <p>Два блока как-то мало было</p>
          </div>
        </div>
      </div>
    </div>
  );
}
