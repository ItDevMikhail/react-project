import React, { useEffect, useState } from 'react';
import { Button, Input, InputLabel, FormGroup, Card, CardHeader } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from "react-router-dom";

export default function RegisterPage() {
    type changeTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    type focusTarget = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

    const {loading, error, request} = useHttp();

    const [login, setLogin] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confPassword, setConfPassword] = useState<string>('');

    const [loginWrong, setLoginWrong] = useState<boolean>(false);
    const [nameWrong, setNameWrong] = useState<boolean>(false);
    const [lastNameWrong, setLastNameWrong] = useState<boolean>(false);
    const [emailWrong, setEmailWrong] = useState<boolean>(false);
    const [passwordWrong, setPasswordWrong] = useState<boolean>(false);
    const [confPasswordWrong, setConfPasswordWrong] = useState<boolean>(false);

    const [loginError, setLoginError] = useState<string>('введите логин');
    const [nameError, setNameError] = useState<string>('введите имя');
    const [lastNameError, setLastNameError] = useState<string>('введите фамилию');
    const [emailError, setEmailError] = useState<string>('введите email');
    const [passwordError, setPasswordError] = useState<string>('введите пароль');
    const [confPasswordError, setConfPasswordError] = useState<string>('подтвердите пароль');
    const [formValid, setFormValid] = useState<boolean>(false);

    let history = useHistory();

    useEffect(() => {
        if (loginError || nameError || lastNameError || emailError || passwordError || confPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [loginError, nameError, lastNameError, emailError, passwordError, confPasswordError])

    const loginHandler = (e: changeTarget) => {
        setLogin(e.target.value);
        const validLogin: RegExp = /^[a-zA-Z]+([-_]?[a-z0-9]+){1,2}$/;
        if (validLogin.test(String(e.target.value))) {
            setLoginError('')
        } else if (!e.target.value) {
            setLoginError('введите логин')
        } else {
            setLoginError('некорректный логин')
        }
    }
    const nameHandler = (e: changeTarget) => {
        setName(e.target.value);
        if (e.target.value.length < 3) {
            setNameError('некорректное имя')
        } else if (!e.target.value) {
            setNameError('введите имя')
        } else {
            setNameError('')
        }
    }
    const lastNameHandler = (e: changeTarget) => {
        setLastName(e.target.value);
        if (e.target.value.length < 3) {
            setLastNameError('некорректная фимилия')
        } else if (!e.target.value) {
            setLastNameError('введите фамилию')
        } else {
            setLastNameError('')
        }
    }

    const emailHandler = (e: changeTarget) => {
        setEmail(e.target.value);
        const validEmail: RegExp = /.+@.+\..+/;
        if (validEmail.test(String(e.target.value))) {
            setEmailError('')
        } else if (!e.target.value) {
            setEmailError('введите email')
        } else {
            setEmailError('некорректный email')
        }
    }

    const passwordHandler = (e: changeTarget) => {
        setPassword(e.target.value);
        const validPass: RegExp = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;
        if (validPass.test(String(e.target.value))) {
            setPasswordError('')
        } else if (!e.target.value) {
            setPasswordError('введите пароль')
        } else {
            setPasswordError('некорректный пароль')
        }
    }
    const confPasswordHandler = (e: changeTarget) => {
        setConfPassword(e.target.value);
        if (e.target.value === password && e.target.value.length > 0) {
            setConfPasswordError('')
        } else if (!e.target.value) {
            setConfPasswordError('подвердите пароль')
        } else {
            setConfPasswordError('пароли не совпадают')
        }
    }


    const focusHandler = (e: focusTarget) => {
        switch (e.target.name) {
            case 'login':
                setLoginWrong(true);
                break;
            case 'name':
                setNameWrong(true);
                break;
            case 'lastName':
                setLastNameWrong(true);
                break;
            case 'email':
                setEmailWrong(true);
                break;
            case 'password':
                setPasswordWrong(true);
                break;
            case 'confPassword':
                setConfPasswordWrong(true);
                break;
            default:
                break;
        }
    }

    const registerHandler = async () =>{
        try {
            const body = JSON.stringify({login: login, name: name, lastName: lastName, email: email, password: password});
            const data = await request('/api/users/reg', 'POST', body);
            console.log('data', data);
            if(data){
                history.push("/login");
            }
        } catch (e) {
            console.log(error)
        }
    }

    return (
        <Card className="registerCard">
            <CardHeader title="Регистрация" className="registerCardHeader"></CardHeader>
            <form className="registerForm">
                <FormGroup>
                    <InputLabel htmlFor="login">Логин*</InputLabel>
                    <Input id="login"
                        onFocus={e => focusHandler(e)}
                        type="text"
                        name='login'
                        placeholder="Введите логин"
                        onChange={e => loginHandler(e)}
                        value={login}
                        required />
                    {(loginWrong && loginError) && <div className="regErrors">{loginError}</div>}
                </FormGroup>
                <br />
                <FormGroup>
                    <InputLabel htmlFor="name">Имя*</InputLabel>
                    <Input id="name" type="text"
                        onFocus={e => focusHandler(e)}
                        placeholder="Введите имя"
                        name="name"
                        onChange={e => nameHandler(e)}
                        value={name}
                        required
                        className={(nameWrong && nameError) ? 'inputErrors' : ''} />
                </FormGroup>
                <br />
                <FormGroup>
                    <InputLabel htmlFor="lastName">Фамилия*</InputLabel>
                    <Input id="lastName" type="text"
                        onFocus={e => focusHandler(e)}
                        placeholder="Введите фамилию"
                        name="lastName"
                        onChange={e => lastNameHandler(e)}
                        value={lastName}
                        required
                        className={(lastNameWrong && lastNameError) ? 'inputErrors' : ''} />
                </FormGroup>
                <br />
                <FormGroup>
                    <InputLabel htmlFor="email">E-mail*</InputLabel>
                    <Input id="email" type="text"
                        onFocus={e => focusHandler(e)}
                        placeholder="Введите e-mail"
                        name="email"
                        onChange={e => emailHandler(e)}
                        value={email}
                        required />
                    {(emailWrong && emailError) && <div className="regErrors">{emailError}</div>}
                </FormGroup>
                <br />
                <FormGroup>
                    <InputLabel htmlFor="password">Пароль* (окно с правилами ввода)</InputLabel>
                    <Input id="password" type="password"
                        onFocus={e => focusHandler(e)}
                        placeholder="Введите пароль"
                        name="password"
                        onChange={e => passwordHandler(e)}
                        value={password}
                        required />
                    {(passwordWrong && passwordError) && <div className="regErrors">{passwordError}</div>}
                </FormGroup>
                <br />
                <FormGroup>
                    <InputLabel htmlFor="confPassword">Подтвердите пароль*</InputLabel>
                    <Input id="confPassword" type="password"
                        onFocus={e => focusHandler(e)}
                        placeholder="Подтвердите пароль"
                        name="confPassword"
                        onChange={e => confPasswordHandler(e)}
                        value={confPassword}
                        required />
                    {(confPasswordWrong && confPasswordError) && <div className="regErrors">{confPasswordError}</div>}
                </FormGroup>
                <br />
                <Button color="primary" variant="contained" type='submit' disabled={!formValid || loading} onClick={registerHandler}>Отправить</Button>
                <br />
            </form>
        </Card>
    )
}