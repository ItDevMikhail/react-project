import home from '../../img/home.jpg';
import Calendar from '../../commponents/calendar';
import DataTime from '../../commponents/dateTime';


export default function HomePage() {
    return (

        <div className="container flex">
            <div className="homeWrapper">
                <h2>Home page</h2>
                <h3>Здесь пока ничего нет кроме "Home"</h3>
                <img className="homeIMG" src={home} alt="images" />
            </div>
            <div className="dataWrapper">
                <DataTime />
                <Calendar />
            </div>
        </div>
    )
}