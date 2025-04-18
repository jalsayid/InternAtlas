import { useParams } from "react-router-dom";
import CompanyDetails from "../components/CompanyDetails";

export default function ViewCompany() {
  const { id } = useParams();

  // Mock data - in a real application, this would come from an API
  const companyData = {
    stc: {
      name: "STC",
      email: "careers@stc.com.sa",
      description: "Saudi Telecom Company offering internships in network engineering, AI, and software development.",
      logo: "../stc.avif",
      documents: [
        {
          title: "Commercial Registration",
          filename: "stc_cr.pdf",
          path: "../stcCertificate.pdf",
        },
      ],
    },
    neom: {
      name: "NEOM",
      email: "careers@neom.com",
      description: "A futuristic city project shaping the future of innovation and sustainability.",
      logo: "../neom.jpg",
      documents: [
        {
          title: "Commercial Registration",
          filename: "neom_cr.pdf",
          path: "../neomCertificate.pdf",
        },
      ],
    },
    noon: {
      name: "Noon",
      email: "careers@noon.com",
      description: "E-commerce leader in MENA offering roles in data analysis, software engineering, and UX design.",
      logo: "../noon.png",
      documents: [
        {
          title: "Commercial Registration",
          filename: "noon_cr.pdf",
          path: "../noonCertificate.pdf",
        },
      ],
    },
    tawuniya: {
      name: "Tawuniya",
      email: "careers@tawuniya.com.sa",
      description: "A leading insurance company embracing digital transformation with AI, cybersecurity, and app dev internships.",
      logo: "../taw.png",
      documents: [
        {
          title: "Commercial Registration",
          filename: "tawuniya_cr.pdf",
          path: "../tawCertificate.pdf",
        },
      ],
    },
  };
  const company = companyData[id];

  return <CompanyDetails {...company} />;
}