import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { completeSubscribe } from "../../api";


export default function PaymentSuccess() {
  let subscribe = async () => {
    let user = localStorage.getItem("user");
    let parsedUser = JSON.parse(user);
    let id = parsedUser._id;
    console.log(id);
    let data = {
      id,
    };
    let res = await completeSubscribe(data);
    console.log(res);
  };
  useEffect(() => {
    subscribe();
  }, []);

  return (
    <div>
      
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1 class="page-title">Subscription Activated Successfuly!</h1>
              <h3>Enjoy your Unlimited Access to our books</h3>
              <button>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Return Home
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
