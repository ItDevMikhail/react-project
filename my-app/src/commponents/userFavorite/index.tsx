import { Link } from 'react-router-dom';
import { IBookListProps } from './../../models/iBooks';

interface IUserFavoriteProps {
    // favoriteBooks: IBookListProps[];
    favoriteBooks: Array<any>;
}

export default function UserFavoriteComponent({ favoriteBooks }: IUserFavoriteProps) {

    return (
        <>
            {favoriteBooks[0].name && <ul> {favoriteBooks.map((item: any, index) =>
                <li key={item.name}>
                    <p>{index + 1} <Link to={`/library/detail/${item._id}`}>{item.name}</Link></p>
                </li>)}</ul>}
                {!favoriteBooks[0].name && <p>У вас нет избранных книг</p>}

        </>
    )
}