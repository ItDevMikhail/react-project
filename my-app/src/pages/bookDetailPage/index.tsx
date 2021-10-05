import { useState, useEffect } from "react";
import { IBookListProps } from "../../models/iBooks";
import { useLocation } from "react-router";
import { CircularProgress } from '@material-ui/core';

export default function BookDetailPage() {
    const [todos, setTodos] = useState<IBookListProps>({ _id: '', name: '', description: '' });
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log(location.pathname);
        setLoading(true);
        const book = async () => {
            try {
                const response = await fetch(`/api${location.pathname}`, {
                    method: 'GET'
                })
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'чёт не то');
                }
                setLoading(false);
                if (data) setTodos(data);
                return data;
            } catch (e: any) {
                setLoading(false);
                console.log(e.message);
            }
        }
        book();
        return () => { setTodos(todos)};
    }, [])

    return (
        <>
            <div className="container detailPage">
                <h2>Book page</h2>
                <div className={loading ? 'progressBar active' : 'progressBar'}>
                    <CircularProgress />
                </div>
                <div className={!loading ? 'active' : 'hidden'}>
                    <h3>Название книги: {todos.name}</h3>
                    <p>Описание книги: {todos.description}</p>
                </div>
            </div>
        </>
    )

}