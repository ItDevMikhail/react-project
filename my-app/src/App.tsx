import "./App.css";
import AppRouter from "./routes/RootRouter";
import Header from "./commponents/header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchingUserData, fetchisAuthorization } from "./redux/actions/actionsUser";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingUserData());
    dispatch(fetchisAuthorization());
  }, [])

  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
