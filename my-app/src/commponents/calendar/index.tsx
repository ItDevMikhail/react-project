import React, { useState } from 'react'
import './index.css'
import { startOfMonth, addDays, startOfWeek, format, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Tooltip, Zoom } from "@material-ui/core";

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())

    const Today = () => {
        setCurrentMonth(new Date());
        setSelectedDate(new Date());
        renderHeader();
        renderDays();
        renderCells();
    }
    const renderHeader = () => {
        const dateFormat = "LLLL yyyy";
        let data = format(currentMonth, dateFormat, { locale: ru })
        return (
            <div className="calendarHeader row flex-middle">
                <div className="col col-start" onClick={prevMonth}>
                    <div className="icon">
                        chevron_left
                    </div>
                </div>
                <Tooltip
                    title="Вернуться к сегодня"
                    placement="bottom"
                    TransitionComponent={Zoom}
                >
                    <div className="col col-center" onClick={Today} style={{ cursor: 'pointer' }}>
                        <span>{data}</span>
                    </div>
                </Tooltip>
                <div className="col col-end" onClick={nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    const renderDays = () => {
        const dateFormat = "dd";
        const days = [];

        let startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className={`col col-center ${i < 5 ? 'weekdays' : 'weekends'} `} key={i} >
                    {format(addDays(startDate, i), dateFormat)
                    }
                </div >

            );
        }

        return <div className="days row">{days}</div>;
    }

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${i < 5 ? 'weekdays' : 'weekends'} ${!isSameMonth(day, monthStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day.toString()}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    const onDateClick = (day: any) => {
        setSelectedDate(day);
    };

    const nextMonth = () => {
        setCurrentMonth((state) => addMonths(state, 1));
    };

    const prevMonth = () => {
        setCurrentMonth((state) => subMonths(state, 1));
    };
    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );

}
