import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Input, InputLabel, FormGroup, Card, CardHeader } from "@material-ui/core";
import { useREST } from "../../hooks/useREST";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuthorization } from "../../redux/actions/actionsUser";
import { useLoginForm } from "../../hooks/useLoginForm";


export default function LoginPage() {
  const dispatch = useDispatch();

  const { state, changeLogin, changePassword, cleanUp, setModel, validate, getFieldError } = useLoginForm();

  const { loading, request } = useREST();
  let history = useHistory();


  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(state)) {
      const body = JSON.stringify({ login: state.login, password: state.password });
      const data = await request("/api/users/login", "POST", body);
      if (data) {
        cleanUp()
        dispatch(isAuthorization(true));
        history.push("/library");
      }
    }
  };

  return (
    <>
      <Card className="loginCard">
        <CardHeader
          title="Авторизация"
          className="loginCardHeader"
        ></CardHeader>
        <form className="loginForm" onSubmit={handleSubmit}>
          <FormGroup>
            <InputLabel htmlFor="login">Логин*</InputLabel>
            <Input
              id="login"
              type="text"
              name="login"
              placeholder="Введите логин"
              onChange={changeLogin}
              value={state.login}
              required
            />
            {getFieldError('login') && (
              <div className="regErrors">{getFieldError('login')}</div>
            )}
          </FormGroup>
          <br />
          <FormGroup>
            <InputLabel htmlFor="password">Пароль*</InputLabel>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              name="password"
              onChange={changePassword}
              value={state.password}
              required
            />
            {getFieldError('password') && (
              <div className="regErrors">{getFieldError('password')}</div>
            )}
          </FormGroup>
          <br />
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Войти
          </Button>
          <br />
        </form>
      </Card>
    </>
  );
}
