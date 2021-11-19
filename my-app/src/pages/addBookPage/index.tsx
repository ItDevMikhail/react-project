import React, { useState, useEffect, SyntheticEvent } from 'react';
import { IAddBookProps } from '../../models/iAddbook';
import { Button, Input, InputLabel, FormGroup, Card, CardHeader, TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useREST } from '../../hooks/useREST';
import { useAddBookForm } from '../../hooks/useAddBookForm'
import { useTranslation } from "react-i18next";

export default function AddBookPage() {
    const { state, changeName, changeDescription, changeFiles, getFieldError, cleanUp, validate } = useAddBookForm();

    const { t } = useTranslation();

    let history = useHistory();

    const { request, loading } = useREST();

    const addBookHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate(state)) {
            const formData = new FormData();
            formData.append('book', JSON.stringify({ name: state.name, description: state.description }));
            if (state.picture) {
                formData.append('picture', state.picture[0]);
            }
            const data = await request('/api/library/add', 'POST', formData, {});
            if (data) {
                cleanUp()
                history.push(`/library/detail/${data._id}`);
            }
        }
    }
    return (
        <>
            <Card className="loginCard">
                <CardHeader title={t("AddBook.AddBook")} className="loginCardHeader"></CardHeader>
                <form className="loginForm" onSubmit={addBookHandler}>
                    <FormGroup className={getFieldError('name') ? 'addBookInput' : ''}>
                        <InputLabel htmlFor="login">{t("AddBook.BookName")}*</InputLabel>
                        <Input id="name"
                            type="text"
                            name="name"
                            placeholder={t("AddBook.BookNamePlaceholder")}
                            onChange={changeName}
                            value={state.name}
                            className="addBookInputName"
                            required />
                    </FormGroup>
                    <br />
                    <FormGroup className={getFieldError('description') ? 'addBookInput' : ''}>
                        <InputLabel htmlFor="description">{t("AddBook.Description")}*</InputLabel>
                        <TextField className='createBookArea'
                            id="description"
                            placeholder={t("AddBook.DescriptionPlaceholder")}
                            onChange={changeDescription}
                            name="description"
                            value={state.description}
                            required
                            multiline
                            minRows={4}
                            maxRows={6}
                        />
                    </FormGroup>
                    <br />
                    <label className="uploadLabel" htmlFor="uploadPicture">{t("AddBook.AddPhoto")}</label>
                    {state.picture && <span>{state.picture[0].name}</span>}
                    {getFieldError('picture') && <span style={{ color: 'red' }}>{getFieldError('picture')}</span>}
                    <input type="file" name="photo" id="uploadPicture" accept=".jpg, .jpeg, .png" onChange={changeFiles} />
                    <br />
                    <Button color="primary" variant="contained" disabled={loading} type="submit">{t("AddBook.Add")}</Button>
                    <br />
                </form>
            </Card>
        </>
    )
}