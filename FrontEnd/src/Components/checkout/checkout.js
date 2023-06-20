import axios from "axios"
import { getCheckoutSession } from "../../api"
import { useNavigate } from "react-router-dom";

export default function Checkout (){
    const navigate = useNavigate();

    const handleClick = async () => {
      try {
        let userId = "";
        let data = {
          userId,
        };
        let res = await getCheckoutSession(data);
        let url = res.session;
        window.location.replace(url);
      } catch (err) {
        console.log(err);
      }
    };

    return(
        <div>
            <button onClick={handleClick}>Checkout</button>
        </div>
    )
}