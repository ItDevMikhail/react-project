import Calendar from '../../commponents/calendar';
import DataTime from '../../commponents/dateTime';

export default function CalendarTime() {
    return (
        <div className="dataWrapper">
            <DataTime />
            <Calendar />
        </div>
    )
}
