import { getCheckoutSession } from "../../api";

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
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Subscribe to ou Book Service Now for Only</h2>
              <h2 style={{ color: "#c5a992" }}>80.00EGP/month</h2>

              <h3>Subscription Plan Offers: </h3>
              <ul>
                <li>Unlimited Access to our library.</li>
                <li>Reading books on BookTopia.</li>
                <li>Downloading books.</li>
                <li>Access to Audiobooks.</li>
                <li>Vestibulum auctor dapibus neque.</li>
              </ul>

              <button onClick={handleClick}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
