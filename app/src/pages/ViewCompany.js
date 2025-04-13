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
          path: "/documents/stc_cr.pdf",
        },
        {
          title: "Company Profile",
          filename: "stc_profile.pdf",
          path: "/documents/stc_profile.pdf",
        },
        {
          title: "Tax Registration",
          filename: "stc_tax.pdf",
          path: "/documents/stc_tax.pdf",
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
          path: "/documents/neom_cr.pdf",
        },
        {
          title: "Company Profile",
          filename: "neom_profile.pdf",
          path: "/documents/neom_profile.pdf",
        },
        {
          title: "Tax Registration",
          filename: "neom_tax.pdf",
          path: "/documents/neom_tax.pdf",
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
          path: "/documents/noon_cr.pdf",
        },
        {
          title: "Company Profile",
          filename: "noon_profile.pdf",
          path: "/documents/noon_profile.pdf",
        },
        {
          title: "Tax Registration",
          filename: "noon_tax.pdf",
          path: "/documents/noon_tax.pdf",
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
          path: "/documents/tawuniya_cr.pdf",
        },
        {
          title: "Company Profile",
          filename: "tawuniya_profile.pdf",
          path: "/documents/tawuniya_profile.pdf",
        },
        {
          title: "Tax Registration",
          filename: "tawuniya_tax.pdf",
          path: "/documents/tawuniya_tax.pdf",
        },
      ],
    },
  };
  const company = companyData[id];

  return <CompanyDetails {...company} />;
}