
import home from '../../img/home.jpg';
import Canvas from '../../commponents/canvas';
import CalendarTime from '../../commponents/CalendarTime';
import { useTranslation } from "react-i18next";

export default function HomePage() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <>
            <div className="container flex">
                <div className="homeWrapper">
                    <h2>{t("Home.HomePage")}</h2>
                    <h3>{t("Home.StabHome")}</h3>
                    <img className="homeIMG" src={home} alt="images" />
                </div>
                <CalendarTime />
            </div>
            <button onClick={() => changeLanguage("ru")}>ru</button>
            <button onClick={() => changeLanguage("en")}>en</button>
            <Canvas />
        </>
    )
}