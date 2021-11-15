import React from 'react';

function DataTime() {
    const dataFilter = (data: Date) => {
        return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(data);
    }

    const [time, setTime] = React.useState<string>(dataFilter(new Date()));
    React.useEffect(() => {
        const timerId = setInterval(() => {
            setTime(dataFilter(new Date()))
        }, 1000);
        return () => { clearInterval(timerId) };
    }, [])
    return (
        <div className="dataTime">
            {time}
        </div>
    )
}

export default DataTime
