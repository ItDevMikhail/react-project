import { Link } from 'react-router-dom';
import { IBookListProps } from './../../models/iBooks';

interface IUserFavoriteProps {
    favoriteBooks: IBookListProps[];
}

export default function UserFavoriteComponent({ favoriteBooks }: IUserFavoriteProps) {

    return (
        <>
            <ul> {favoriteBooks.map((item: IBookListProps, index) =>
                <li key={item.name}>
                    <p>{index+1} <Link to={`/library/detail/${item._id}`}>{item.name}</Link></p>
                </li>)}</ul>
        </>
    )
}