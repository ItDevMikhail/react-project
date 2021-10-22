interface MessProps {
  mess: string;
}

export default function MessageBoxComponent({ mess }: MessProps) {
  return (
    <>
      {mess && (
        <div className="messageBox">
          <div className="messageTitle">Сообщение</div>
          <div className="messageText">ошибка:{mess}</div>
        </div>
      )}
    </>
  );
}
