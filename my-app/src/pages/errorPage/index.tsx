import { useAppSelector } from "../../redux/hooks";

export default function ErrorPage() {
    const errorMess: string | null = useAppSelector(state => state.fetch.error)
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