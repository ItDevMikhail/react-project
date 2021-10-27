import { useSelector } from 'react-redux';

export default function MessageBoxComponent() {
  const errorMessage = useSelector((state: any) => state.fetch.error);

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
