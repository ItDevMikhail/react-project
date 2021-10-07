import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IBookListProps } from '../../models/iBooks';
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';

interface IBooksListProps {
    todos: IBookListProps[];
    Favorite: (itemId: string) => boolean;
    addFavorite: (itemId: string) => Promise<void>;
    deleteBook: (itemId: string) => Promise<void>;
}

export default function BooksListComponent({ todos, Favorite, addFavorite, deleteBook }: IBooksListProps) {
    const [open, setOpen] = useState(false);
    const [delBookId, setDelBookId] = useState<string>('');

    const handleModalOpen = (itemId: string) => {
        setOpen(true);
        setDelBookId(itemId);
    };

    const handleDeclineClose = () => {
        setOpen(false);
    };
    const handleAcceptClose = () => {
        setOpen(false);
        deleteBook(delBookId);
    };

    return (
        <>
            <ul> {todos.map((item: IBookListProps) =>
                <li key={item.name}>
                    <Link to={`/library/detail/${item._id}`}>{item.name}</Link><div className={Favorite(item._id) ? 'addedFavorite' : ''}><span className="material-icons starIcon" onClick={() => { addFavorite(item._id) }}>
                        star
                    </span><span className="material-icons deleteIcon" onClick={()=>handleModalOpen(item._id)}>
                            delete
                        </span></div>
                </li>)}</ul>
            <Dialog
                open={open}
                onClose={handleDeclineClose}
                aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">
                    Вы точно хотите удалить эту книгу?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeclineClose} id="cancelBtn">Отмена</Button>
                    <Button onClick={handleAcceptClose} id="acceptBtn">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}