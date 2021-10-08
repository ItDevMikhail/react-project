import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IBookListProps } from './../../models/iBooks';

interface IUserFavoriteProps {
    favoriteBooks: Array<any>;
    index: number;
    changeHandler: (index: number)=> void;
    open: boolean
}

export default function BookDetModalComponent({ favoriteBooks, index, changeHandler, open }: IUserFavoriteProps) {


    return (
        <>
            {open && <div className='bookDetModal' onClick={()=>changeHandler(index)}>
                <div className="bookDetModalContent">
                    <div className="modalClose"></div>
                    <p><strong>Название книги:</strong> {favoriteBooks[index].name}</p>
                    <p className="descriptionText"><strong>Описание книги:</strong> {favoriteBooks[index].description}</p>
                    {favoriteBooks[index].picture && <div>
                        <p><strong>Обложка книги:</strong></p>
                        <img alt="images" className="bookDetModalImg" src={`http://localhost:5000/${favoriteBooks[index].picture}`} />
                    </div>}
                    <Link className="bookDetModalLink" to={`/library/detail/${favoriteBooks[index]._id}`}>Перейти на страницу книги</Link>
                </div>
            </div>}

        </>
    )
}