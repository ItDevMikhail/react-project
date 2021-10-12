import home from '../../img/home.jpg'

export default function HomePage() {
    return (
        <>
            <div className="container" style={{backgroundColor: "#ebebeb",}}>
                <h2>Home page</h2>
                <h3>Здесь пока ничего нет кроме "Home"</h3>
                <img className="homeIMG" src={home} alt="images" />
            </div>
        </>
    )
}