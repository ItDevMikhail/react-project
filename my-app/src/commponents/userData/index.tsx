import { useAppSelector } from "../../redux/hooks";

export default function UserDataComponent() {
  const userData = useAppSelector(state => state.user.data);

  return (
    <>
      {userData?.login && (
        <p>
          My login: <strong>{userData.login}</strong>
        </p>
      )}
      {userData?.name && (
        <p>
          My name: <strong>{userData.name}</strong>
        </p>
      )}
      {userData?.name && (
        <p>
          My lName: <strong>{userData.lastName}</strong>
        </p>
      )}
      {userData?.name && (
        <p>
          My email: <strong>{userData.email}</strong>
        </p>
      )}
    </>
  );
}
