
export default function ErrorPage({ errorMess }: any) {
    return (
        <>
            <div className="container errorPage">
                <h2>Error Message</h2>
                <p>{errorMess}</p>
            </div>
        </>
    )
}