import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { IBookListProps } from '../../models/iBooks';

export default function LibraryPage() {
    const [todos, setTodos] = useState<IBookListProps[]>([{ name: 'Библиотека книг пуста', description: '' }]);
    const { request, error } = useHttp();

    useEffect(() => {
        authHandler();
        const books = async () => {
            try {
                const response = await fetch('/api/library', {
                    method: 'GET'
                })
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'чёт не то');
                }
                console.log(data);
                setTodos(data);
                return data;
            } catch (e: any) {
                console.log(e.message);
            }
        }
        books();
    }, [])
    const authHandler = async () => {
        console.log(todos);
        try {
            const auth = await request('/api/users/auth', 'GET');
            console.log('data', auth);
        } catch (e) {
            console.log(error)
        }
    }

    return (
        <>
            <h2>Library page</h2>
            <ul> {todos.map((item: any) =>
                <li key={item._id}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                </li>)}</ul>
        </>
    )
}