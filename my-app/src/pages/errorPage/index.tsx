
export default function ErrorPage({ errorMess }: any) {
    const error = errorMess || '500 Server Error'
    return (
        <>
            <div className="container errorPage">
                <h2>Error Message</h2>
                <p>{error}</p>
            </div>
        </>
    )
}