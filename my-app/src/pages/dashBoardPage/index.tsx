import { useState, useEffect } from 'react';
import { IBookListProps } from '../../models/iBooks';
import { useHttp } from '../../hooks/http.hook';
import UserFavoriteComponent from '../../commponents/userFavorite';
import UserDataComponent from '../../commponents/userData';
import { IUserProps } from './../../models/iUser';
import { CircularProgress } from '@material-ui/core';



export default function DashBoardPage() {
    const [favorite, setFavorite] = useState<IBookListProps[]>([]);
    const [user, setUser] = useState<IUserProps>();
    const { request, error } = useHttp();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const favor = sessionStorage.getItem('favoriteDashboard');
        if (favor) {
            setFavorite(JSON.parse(favor));
        }
        getUser();
        getFavorite();
        return () => { setFavorite(favorite) };
    }, []);

    const getUser = async () => {
        setLoading(true);
        try {
            const data = await request('/api/users/user', 'GET');
            if (data) {
                setUser(data);
                console.log(data);
            }
            setLoading(false);
            return data;
        } catch (e: any) {
            setLoading(false);
            console.log(error);
        }
    }

    const getFavorite = async () => {
        try {
            const data = await request('/api/library/dashboard', 'GET');
            if (data) {
                setFavorite(data);
                sessionStorage.setItem('favoriteDashboard', JSON.stringify(data));
            }
            return data;
        } catch (e: any) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="container">
                <div className="dashboardTop">
                    <div className="dashboardTopBlock">
                        <p><strong>My data</strong></p>
                        <div className={loading ? 'dashboardProgressBar active' : 'dashboardProgressBar'}>
                            <CircularProgress />
                        </div>
                        <UserDataComponent userData={user} />
                    </div>
                    <div className="dashboardTopBlock">
                        <p><strong>My Favorite Books</strong></p>
                        <UserFavoriteComponent favoriteBooks={favorite} />
                    </div>
                    <div className="dashboardTopBlock">
                        <p><strong>Others</strong></p>
                        <p>Пока ничего не придумал</p>
                        <p>Два блока как-то мало было</p>
                    </div>
                </div>
            </div>
        </div>
    )
}