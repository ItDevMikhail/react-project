import BookDetModalComponent from './../bookDetModal/index';
import { useState } from 'react';

interface IUserFavoriteProps {
    favoriteBooks: Array<any>;
}

export default function UserFavoriteComponent({ favoriteBooks }: IUserFavoriteProps) {  
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState<number>(0);
    const changeHandler = (index: number) =>{
        setIndex(index);
        setOpen(!open);
    }

    return (
        <>
            {favoriteBooks[0].name && <ul> {favoriteBooks.map((item: any, index) =>
                <li key={item.name}>
                    <p>{index + 1} <a className='userFavoriteLink' onClick={()=>changeHandler(index)}>{item.name}</a></p>
                </li>)}</ul>}
                {!favoriteBooks[0].name && <p>У вас нет избранных книг</p>}
                <div><BookDetModalComponent favoriteBooks={favoriteBooks} index={index} changeHandler={changeHandler} open={open}/></div>
        </>
    )
}