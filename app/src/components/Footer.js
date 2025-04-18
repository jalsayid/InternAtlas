function Footer() {
  return (
<footer
          className="text-center text-lg-start text-white"
        style={{backgroundColor: "#E7E7E7"}}
        >
  <div className="container p-4 pb-0">
      <div className="row">
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="mb-4 font-weight-bold" style={{color: "#333333"}}>InternAtlas</h6>
          <p style={{color: "#333333"}}> 
            A platform Connecting students with verified internships through a streamlined platform that saves time and helps companies find the right candidates.
          </p>
        </div>


        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="mb-4 font-weight-bold" style={{color: "#333333"}}>Contact Admins</h6>
              <p style={{color: "#333333"}}><i className="bi bi-person-fill me-2"></i>Danah_Alotaibi@gmail.com</p>
              <p style={{color: "#333333"}}><i className="bi bi-person-fill me-2"></i>Aisha_Algharib@gmail.com</p>
              <p style={{color: "#333333"}}><i className="bi bi-person-fill me-2"></i>Joud_Alsayid@gmail.com</p>
              <p style={{color: "#333333"}}><i className="bi bi-person-fill me-2"></i>Aryam_Alshehri@gmail.com</p>
              <p style={{color: "#333333"}}><i className="bi bi-person-fill me-2"></i>Rawan_Asiri@gmail.com</p>
        </div>

        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="mb-4 font-weight-bold" style={{color: "#333333"}}>Get in Touch</h6>
          <p style={{color: "#333333"}}><i className="bi bi-geo-alt-fill me-2"></i>Dhahran, KSA</p>
          <p style={{color: "#333333"}}><i className="bi bi-telephone-fill me-2"></i>+955 339 388 333</p>
        </div>


      </div>
  </div>
  <div
       className="text-center p-3"
       style={{backgroundColor: "#FFB608", color:"white"}}
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
