import { NavLink } from "react-router-dom";
let Book =(props)=>{
    let {oneBook} = props;
    return(
        <div>
            <div className="w-50 m-auto cont" key={oneBook._id}>
                <div className="container">
                <p className="bottomleft"><NavLink className="link" to={`/books/${oneBook._id}`}>{oneBook.title}</NavLink></p>
                </div>
            </div>
        </div>
    )
}
export default Book;