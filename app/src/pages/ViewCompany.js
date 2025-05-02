import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyDetails from "../components/CompanyDetails";

export default function ViewCompany() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/companiesdata/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch company details');
        }
        const logoPath = data.logo?.startsWith('.') ? data.logo.substring(1) : data.logo;
        setCompany({
          name: data.companyName,
          email: data.email,
          description: data.description,
          logo: logoPath,
          documents: [{
            title: "Commercial Registration",
            filename: "verification.pdf",
            path: data.verificationFile
          }]
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!company) return <div>Company not found</div>;

  return <CompanyDetails {...company} />;
}