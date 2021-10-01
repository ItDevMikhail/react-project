import React, { useEffect, useState } from 'react';
import { Button, Input, InputLabel, FormGroup, Card, CardHeader } from '@material-ui/core';

export default function LoginPage() {
    type changeTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    type focusTarget = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loginWrong, setLoginWrong] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('введите логин');

    const [passwordWrong, setPasswordWrong] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string>('введите пароль');
    const [formValid, setFormValid] = useState<boolean>(false);

    useEffect(() => {
        if (loginError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [loginError, passwordError])

    const loginHandler = (e: changeTarget) => {
        setLogin(e.target.value);
        if (!e.target.value) {
            setLoginError('введите логин')
        } else {
            setLoginError('')
        }
    }
    const passwordHangler = (e: changeTarget) => {
        setPassword(e.target.value);
        if (!e.target.value) {
            setPasswordError('введите пароль')
        } else {
            setPasswordError('')
        }
    }
    const focusHandler = (e: focusTarget) => {
        switch (e.target.name) {
            case 'login':
                setLoginWrong(true);
                break;
            case 'password':
                setPasswordWrong(true);
                break;
            default:
                break;
        }
    }

    return (
        <Card className="loginCard">
            <CardHeader title="Авторизация" className="loginCardHeader"></CardHeader>
            <form className="loginForm">
                <FormGroup>
                    <InputLabel htmlFor="login">Логин*</InputLabel>
                    <Input id="login"
                        onFocus={e => focusHandler(e)}
                        type="text"
                        name="login"
                        placeholder="Введите логин"
                        onChange={e => loginHandler(e)}
                        value={login}
                        required />
                    {(loginWrong && loginError) && <div className="regErrors">{loginError}</div>}
                </FormGroup>
                <br />
                <FormGroup>
                    <InputLabel htmlFor="password">Пароль*</InputLabel>
                    <Input id="password" type="password"
                        onFocus={e => focusHandler(e)}
                        placeholder="Введите пароль"
                        name="password"
                        onChange={e => passwordHangler(e)}
                        value={password}
                        required />
                    {(passwordWrong && passwordError) && <div className="regErrors">{passwordError}</div>}
                </FormGroup>
                <br />
                <Button color="primary" variant="contained" type='submit' disabled={!formValid}>Войти</Button>
                <br />
            </form>
        </Card>
    )
}