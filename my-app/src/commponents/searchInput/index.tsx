import { useState } from 'react';
import { Input, Button } from '@material-ui/core';

interface ISearchInputProps {
    onFilterChanged: (val: string) => void
}

export default function SearchInputComponent({ onFilterChanged }: ISearchInputProps) {
    type target = React.ChangeEvent<HTMLInputElement>;
    const [timeoutId, setTimeoutId] = useState<number>(0);

    const [searchText, setSearchText] = useState<string>('');

    const search = (e: target) => {
        setSearchText(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const val = e.target.value;
        const timeId = setTimeout(onFilterChanged, 400, val) as unknown as number;
        setTimeoutId(timeId);
    }
    const clearSearch = () => {
        clearTimeout(timeoutId)
        onFilterChanged('')
        setSearchText('')
    }

    return (
        <>
            <div className='searchForm'>
                <Input type="text"
                    placeholder="Введите текст"
                    onChange={search}
                    value={searchText} />
                <span className="material-icons" id="searchIcons">
                    search
                </span>
                <Button onClick={clearSearch} id='searchBtn'>Clear</Button>
            </div>
        </>
    )
}