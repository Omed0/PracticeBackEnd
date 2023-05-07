import { Link } from "react-router-dom";

export default function about() {
    return (
        <div>
            <div className="about content">
                <h1>
                    Now im Practice on Node JS 🔮<br />
                    for backend and this is my first app express library ♟
                </h1>
                <br /><br />
                <h4>
                    <Link to="/">Go to Home</Link>
                </h4>
            </div>
        </div>
    )
}
