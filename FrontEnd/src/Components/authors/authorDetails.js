import "./authorDetails.css";

export default function Author (){

    return (
      <div>
        <section className="bg-sand padding-large">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <a href="#" className="product-image">
                  <img
                    style={{ height: "550px" }}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                  />
                </a>
              </div>

              <div className="col-md-6 pl-5">
                <div className="product-detail">
                  <h1>Birds Gonna Be Happy</h1>
                  <p>Fiction</p>
                  <span className="price colored">$45.00</span>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}