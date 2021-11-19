import React, { SyntheticEvent } from "react";
import {
  Button,
  Input,
  InputLabel,
  FormGroup,
  Card,
  CardHeader,
} from "@material-ui/core";
import { useAppDispatch } from "../../redux/hooks";
import { useREST } from "../../hooks/useREST";
import { useRegisterForm } from '../../hooks/useRegisterForm'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { isAuthorization } from "../../redux/actions/actionsUser";

export default function RegisterPage() {
  const { state, changeLogin, changeName,
    changeLastName, changeEmail, changePassword,
    changeConfirmPassword, cleanUp, validate,
    getFieldError } = useRegisterForm();

  const { loading, request } = useREST();

  const dispatch = useAppDispatch();

  let history = useHistory();


  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(state)) {
      // const body = {
      //   login: state.login,
      //   name: state.name,
      //   lastName: state.lastName,
      //   email: state.email,
      //   password: state.password,
      // };
      // try {
      //   const data = await axios.post('api/users/reg', body);
      //   console.log("data axios", data.data);
      //   if (data) {
      //     cleanUp()
      //     history.push("/login");
      //   }
      // } catch (e: unknown) {
      //   e instanceof Error && console.log(e.message);
      // }
      const body = JSON.stringify({
        login: state.login,
        name: state.name,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
      });
      const data = await request("/api/users/reg", "POST", body);
      if (data) {
        const body = JSON.stringify({ login: state.login, password: state.password });
        const data = await request("/api/users/login", "POST", body);
        if (data) {
          cleanUp()
          dispatch(isAuthorization(true));
          history.push("/library");
        }
      }
    }
  };

  return (
    <>
      <Card className="registerCard">
        <CardHeader
          title="Регистрация"
          className="registerCardHeader"
        ></CardHeader>
        <form className="registerForm" onSubmit={handleSubmit}>
          <FormGroup>
            <InputLabel htmlFor="login">Логин*</InputLabel>
            <Input
              id="login"
              type="text"
              name="login"
              placeholder="Введите логин"
              onChange={changeLogin}
              value={state.login}
              className={getFieldError('login') ? "inputErrors" : ""}
              required
            />
            <div className="regErrors">{getFieldError('login')}</div>

          </FormGroup>
          <br />
          <FormGroup>
            <InputLabel htmlFor="name">Имя*</InputLabel>
            <Input
              id="name"
              type="text"
              placeholder="Введите имя"
              name="name"
              onChange={changeName}
              value={state.name}
              required
              className={getFieldError('name') ? "inputErrors" : ""}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <InputLabel htmlFor="lastName">Фамилия*</InputLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Введите фамилию"
              name="lastName"
              onChange={changeLastName}
              value={state.lastName}
              required
              className={getFieldError('lastName') ? "inputErrors" : ""}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <InputLabel htmlFor="email">E-mail*</InputLabel>
            <Input
              id="email"
              type="text"
              placeholder="Введите e-mail"
              name="email"
              onChange={changeEmail}
              value={state.email}
              className={getFieldError('email') ? "inputErrors" : ""}
              required
            />
            <div className="regErrors">{getFieldError('email')}</div>
          </FormGroup>
          <br />
          <FormGroup>
            <InputLabel htmlFor="password">
              Пароль* (окно с правилами ввода)
            </InputLabel>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              name="password"
              onChange={changePassword}
              value={state.password}
              className={getFieldError('password') ? "inputErrors" : ""}
              required
            />
            <div className="regErrors">{getFieldError('password')}</div>
          </FormGroup>
          <br />
          <FormGroup>
            <InputLabel htmlFor="confPassword">Подтвердите пароль*</InputLabel>
            <Input
              id="confPassword"
              type="password"
              placeholder="Подтвердите пароль"
              name="confPassword"
              onChange={changeConfirmPassword}
              value={state.confirmPassword}
              className={
                getFieldError('confirmPassword') ? "inputErrors" : ""
              }
              required
            />
            <div className="regErrors">{getFieldError('confirmPassword')}</div>
          </FormGroup>
          <br />
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Отправить
          </Button>
          <br />
        </form>
      </Card>
    </>
  );
}
