import { getCheckoutSession } from "../../api";
import "./checkout.css";
import Header from '../header/header';
import Footer from '../footer/footer.js';
export default function Checkout() {

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

  return (
    <div>
      <Header/>
      <div className="subscribe">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 className="sub">Subscribe to ou Book Service Now for Only</h2>
              <h2  style={{ color: "#c5a992", marginLeft:"20%",marginTop:"5%" }}>80.00EGP/month</h2>

              <h3 className="sub1">Subscription Plan Offers: </h3>
              </div>   </div>
              <ul className="order">
                <li>Unlimited Access to our library.</li>
                <li>Reading books on BookTopia.</li>
                <li>Downloading books .     </li>
                <li>Access to Audiobooks.</li>
                <li>Vestibulum auctor dapibus neque.</li>
 

              </ul>

              <button className="butn" onClick={handleClick}>Proceed To Payment</button>
         
         
        </div>
      </div>
      <Footer/>
    </div>
  );
}
