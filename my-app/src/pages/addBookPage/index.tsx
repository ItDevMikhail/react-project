import React, { useState, useEffect, HTMLInputTypeAttribute } from 'react';
import { IAddBookProps } from '../../models/iAddbook';
import { Button, Input, InputLabel, FormGroup, Card, CardHeader, TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export default function AddBookPage() {
    type changeTarget = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    const [book, setBooks] = useState<IAddBookProps>({ name: '', description: '' });
    const [nameError, setNameError] = useState<boolean>(true);
    const [descrError, setDescrError] = useState<boolean>(true);
    const [formValid, setFormValid] = useState<boolean>(false);
    const [files, setFiles] = useState<any>();
    const [filesError, setFilesError] = useState<boolean>(false);
    let history = useHistory();

    const addBookHandler = async () => {
        const formData = new FormData();
        formData.append('book', JSON.stringify(book));
        if (files) {
            formData.append('picture', files[0]);
        } else {
        }
        try {
            const response = await fetch('/api/library/add', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'чёт не то');
            }
            if (data) {
                history.push(`/library/detail/${data._id}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addPicture = (event: any) => {
        let target = event.target || event.scrElement;
        console.log(target.files);
        if (target.files.length > 0) {
            if (target.files[0].type.includes('image')) {
                setFiles(target.files);
            } else {
                setFilesError(true);
                setFiles(target.files);
            }
        } else{
            setFilesError(false);
            setFiles('');
        }
    }

    useEffect(() => {
        if (nameError || descrError || filesError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, descrError, filesError])

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
        if (e.target.value.length < 5) {
            setDescrError(true);
        } else {
            setDescrError(false);
        }
    }
    // const addBookHandler = async () => {
    //     try {
    //         const response = await fetch('/api/library/add', {
    //             method: 'POST',
    //             body: JSON.stringify(book),
    //             headers: {
    //                 'Content-type': 'application/json'
    //             }
    //         })
    //         const data = await response.json();
    //         if (!response.ok) {
    //             throw new Error(data.message || 'чёт не то');
    //         }
    //         if (data) {
    //             history.push(`/library/detail/${data._id}`);
    //         }
    //     } catch (e: any) {
    //         console.log(e.message);
    //     }
    // }
    return (
        <>
            <Card className="loginCard">
                <CardHeader title="Добавить книгу" className="loginCardHeader"></CardHeader>
                <form className="loginForm">
                    <FormGroup className={nameError ? 'addBookInput' : ''}>
                        <InputLabel htmlFor="login">Название книги*</InputLabel>
                        <Input id="name"
                            type="text"
                            name="name"
                            placeholder="Введите название книги"
                            onChange={e => nameHandler(e)}
                            value={book.name}
                            className="addBookInputName"
                            required />
                    </FormGroup>
                    <br />
                    <FormGroup className={descrError ? 'addBookInput' : ''}>
                        <InputLabel htmlFor="description">Описание*</InputLabel>
                        <TextField className='createBookArea'
                            id="description"
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
                    <label className="uploadLabel" htmlFor="uploadPicture">Добавить фото книги</label> {files && <span>{files[0].name}</span>}
                    {filesError && <span style={{color: 'red'}}>Проверьте формат файла</span>}
                    <input type="file" name="photo" id="uploadPicture" accept=".jpg, .jpeg, .png" onChange={($event) => addPicture($event)} />
                    <br />
                    <Button color="primary" variant="contained" disabled={!formValid} onClick={addBookHandler}>Создать</Button>
                    <br />
                </form>
            </Card>
        </>
    )
}