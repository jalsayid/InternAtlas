
function Footer() {
    return (
  <footer
            className="text-center text-lg-start text-white"
          style={{backgroundColor: "#666666"}}
          >
    <div className="container p-4 pb-0">
      <section className="">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="mb-4 font-weight-bold">
                InternAtlas
            </h6>
            <p> 
            bridges the gap between students and companies by providing a centralized platform where students can explore verified 
            internship opportunities and receive real-time updates on their applications. 
            By streamlining the application process and ensuring company credibility, our solution 
            saves time for students and helps companies connect with suitable candidates more 
            effectively. 
            </p>
          </div>


          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
            <p>  🏠︎   Dhahran, KSA</p>
            <p>  ✉   admin@gmail.com</p>
            <p>  ✆  +955 339 388 333</p>
          </div>


        </div>
      </section>
    </div>
    <div
         className="text-center p-3"
         style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
         >
      © 2025 Copyright:
      <a className="text-white" href="./"
         > InternAtlas.com</a
        >
    </div>
  </footer>



    );
}
export default Footer;

