import React, { useEffect } from 'react';
import { useState } from 'react';
import { IBookListProps } from '../../models/iBooks';
import { Button, Input, InputLabel, FormGroup, Card, CardHeader, TextField } from '@material-ui/core';

export default function AddBookPage() {
    type changeTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    const [book, setBooks] = useState<IBookListProps>({ name: '', description: '' });
    const [nameError, setNameError] = useState<boolean>(true);
    const [descrError, setDescrError] = useState<boolean>(true);
    // const { request, error } = useHttp();
    const [formValid, setFormValid] = useState<boolean>(false);

    useEffect(() => {
        if (nameError || descrError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, descrError])

    const nameHandler = (e: changeTarget) => {
        setBooks({ name: e.target.value, description: book.description });
        if (e.target.value.length < 3) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }
    const descriptionHandler = (e: changeTarget) => {
        setBooks({ name: book.name, description: e.target.value });
        console.log(book)
        if (e.target.value.length < 15) {
            setDescrError(true);
        } else {
            setDescrError(false);
        }
    }
    const addBookHandler = async () => {
        try {
            const response = await fetch('/api/library/add', {
                method: 'POST',
                body: JSON.stringify(book),
                headers:{
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json();
            if(!response.ok){
               throw new Error(data.message || 'чёт не то'); 
            }
            console.log(data)
        } catch (e: any) {
            console.log(e.message);
        }
    }
    return (
        <>
            <Card className="loginCard">
                <CardHeader title="Добавить книгу" className="loginCardHeader"></CardHeader>
                <form className="loginForm">
                    <FormGroup>
                        <InputLabel htmlFor="login">Название книги*</InputLabel>
                        <Input id="name"
                            type="text"
                            name="name"
                            placeholder="Введите название книги"
                            onChange={e => nameHandler(e)}
                            value={book.name}
                            required />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <InputLabel htmlFor="password">Описание*</InputLabel>
                        <TextField className='createBookArea'
                            id="decription"
                            placeholder="Напишите описание книги"
                            onChange={e => descriptionHandler(e)}
                            name="description"
                            value={book.description}
                            required
                            multiline
                            minRows={4}
                            maxRows={6}
                        />
                    </FormGroup>
                    <br />
                    <Button color="primary" variant="contained" disabled={!formValid} onClick={addBookHandler}>Создать</Button>
                    <br />
                </form>
            </Card>
        </>
    )
}