import { useAppSelector } from "../../redux/hooks";

export default function MessageBoxComponent() {
  const errorMessage = useAppSelector(state => state.fetch.error);

  return (
    <>
      {errorMessage && (
        <div className="messageBox">
          <div className="messageTitle">Сообщение</div>
          <div className="messageText">ошибка:{errorMessage}</div>
        </div>
      )}
    </>
  );
}
