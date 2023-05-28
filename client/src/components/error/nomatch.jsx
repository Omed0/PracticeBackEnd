
export default function nomatch() {
    return (
        <div id="error-page">
            <h1 className="not-found">Oops!</h1>
            <p className="not-found content">Sorry, an unexpected error has occurred.</p>
            <Link to='/'>Go Home</Link>
        </div>
    )
}
