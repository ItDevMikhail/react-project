import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IBookListProps } from '../../models/iBooks';
import { CircularProgress } from '@material-ui/core';
import { useHttp } from '../../hooks/http.hook';

export default function LibraryPage() {
    const [todos, setTodos] = useState<IBookListProps[]>([{ _id: Date.now().toString(), name: 'Библиотека книг пуста', description: '' }]);
    const { error, request } = useHttp();
    const [loading, setLoading] = useState<boolean>(false);
    const [favorite, setFavorite] = useState(['']);

    useEffect(() => {
        const todo = sessionStorage.getItem('todos');
        const favor = sessionStorage.getItem('favorite');
        if (favor) {
            setFavorite(JSON.parse(favor));
        }
        if (todo) {
            setTodos(JSON.parse(todo));
        } 
            getBooks();
            getFavorite();
        return () => { setTodos(todos); setFavorite(favorite) };
    }, []);

    const getBooks = async () => {
        setLoading(true);
        try {
            const data = await request('/api/library', 'GET');
            setLoading(false);
            if (data) {
                setTodos(data);
                sessionStorage.setItem('todos', JSON.stringify(data));
            }
            return data;
        } catch (e: any) {
            setLoading(false);
            console.log(error);
        }
    }

    const getFavorite = async () => {
        try {
            const data = await request('/api/library/favorite', 'GET');
            if (data) {
                setFavorite(data);
                sessionStorage.setItem('favorite', JSON.stringify(data));
            }
            return data;
        } catch (e: any) {
            console.log(error);
        }
    }

    const addFavorite = async (bookId: string) => {
        try {
            const response = await fetch(`/api/library/addFavorite/${bookId}`, {
                method: 'GET',
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'чёт не то');
            }
            if (data) {
                setFavorite(data);
                sessionStorage.setItem('favorite', JSON.stringify(data));
            }
        } catch (e: any) {
            setFavorite(['']);
            console.log(e.message);
        }
    }
    const Favorite = (itemId: string) => {
        if (favorite.length) {
            let favor = favorite.filter((data: any) => data.bookId == itemId)
            if (favor.length > 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    return (
        <>
            <div className="container libraryPage">
                <h2>Library page</h2>
                <div className={loading ? 'progressBar active' : 'progressBar'}>
                    <CircularProgress />
                </div>
                <ul> {todos.map((item: IBookListProps) =>
                    <li key={item.name}>
                        <Link to={`/library/detail/${item._id}`}>{item.name}</Link><div className={Favorite(item._id) ? 'addedFavorite' : ''}><span className="material-icons" onClick={() => { addFavorite(item._id) }}>
                            star
                        </span></div>
                    </li>)}</ul>
            </div>
        </>
    )
}