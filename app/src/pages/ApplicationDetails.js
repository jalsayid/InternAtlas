import { Routes, Route } from "react-router-dom";
import DetailsSt from "../components/DetailsSt";
export default function ApplicantDetails() {
  const questions1 = [
    {
      question: "Why do you want to intern at SDAIA?",
      answer:
        "SDAIA plays a crucial role in advancing Saudi Arabia’s Vision 2030 through data and AI. I want to contribute to impactful projects that leverage AI for societal and governmental transformation while growing my skills in real-world data science and AI implementation.",
    },
    {
      question:
        "What experience do you have with data analysis or AI technologies?",
      answer:
        "I've worked on several projects involving data preprocessing, feature engineering, and training ML models using Python, pandas, and scikit-learn. I’ve also used visualization tools like Tableau and matplotlib for communicating insights clearly.",
    },
    {
      question:
        "How do you ensure data privacy and security when working with sensitive data?",
      answer:
        "I follow best practices such as data anonymization, access control, and using secure storage. I'm familiar with GDPR principles and also understand the importance of aligning with national data privacy regulations like the Saudi Data & AI Ethics Framework.",
    },
    {
      question: "Describe a data project you've worked on.",
      answer:
        "I led a project analyzing city traffic data to predict congestion zones using time-series models. The solution involved cleaning large datasets, creating visual dashboards, and proposing optimization strategies to reduce traffic in high-density areas.",
    },
    {
      question: "What tools or platforms have you used in your data projects?",
      answer:
        "I’ve used Python (pandas, NumPy, scikit-learn), SQL for database queries, and cloud platforms like Google Cloud and Azure for data storage and ML pipelines. I’ve also explored IBM Watson for AI services.",
    },
    {
      question: "How do you approach solving real-world problems using AI?",
      answer:
        "I begin by clearly defining the problem and understanding the data involved. Then, I choose the appropriate model or algorithm based on the use case, iterate on improvements, and evaluate performance while keeping scalability and ethics in mind.",
    },
    {
      question: "What excites you most about AI in the public sector?",
      answer:
        "The potential to improve quality of life, optimize government services, and make data-driven decisions that benefit millions. Using AI for smart cities, healthcare, or environmental monitoring deeply motivates me.",
    },
  ];
  const questions2 = [
    {
      question: "What can you add to the company?",
      answer:
        "With my background in full-stack development and experience in building scalable applications, I can contribute to both frontend and backend development. I'm also passionate about mentoring junior developers.",
    },
    {
      question: "Describe a challenging project you've worked on.",
      answer:
        "I led the development of a real-time chat application using WebSocket technology, overcoming challenges in maintaining persistent connections and handling high concurrent users.",
    },
    {
      question: "Why do you want to intern at OpenAI?",
      answer:
        "OpenAI is leading the way in shaping the future of artificial intelligence. I want to be part of a mission-driven organization where I can contribute to cutting-edge research and gain mentorship from some of the brightest minds in AI.",
    },
    {
      question: "How comfortable are you with machine learning frameworks?",
      answer:
        "I’m very comfortable with PyTorch and have used it in several deep learning projects. I’ve also explored TensorFlow for model deployment and experimentation. My comfort level grows with each project I work on.",
    },
    {
      question: "Have you worked on any AI or ML projects?",
      answer:
        "Yes, I developed a sentiment analysis tool that classifies tweets using an LSTM model. I also worked on a computer vision project using CNNs to detect plant diseases from leaf images.",
    },
    {
      question: "How do you stay updated on AI advancements?",
      answer:
        "I regularly read research papers on arXiv, follow key researchers on Twitter, and take courses on Coursera and edX. I also attend AI meetups and watch conference presentations like NeurIPS and ICLR.",
    },
  ];
  const questions3 = [
    {
      question: "Why are you interested in the PIF Tech Internship?",
      answer:
        "I'm inspired by PIF's role in transforming the Saudi economy through technology. I want to contribute to this vision by applying my technical skills to meaningful projects that create real impact.",
    },
    {
      question: "What programming languages are you most comfortable with?",
      answer:
        "I'm most comfortable with JavaScript and Python. I've used JavaScript extensively in web development with React, and Python for automation, data analysis, and machine learning tasks.",
    },
    {
      question: "Have you worked in a team setting before?",
      answer:
        "Yes, I’ve collaborated with cross-functional teams during university hackathons and in internships. I value clear communication, shared goals, and agile practices to deliver results efficiently.",
    },
    {
      question: "How do you approach learning new technologies?",
      answer:
        "I start by understanding the core concepts, then I apply what I’ve learned by building small projects or contributing to open source. I also like to take structured courses and read documentation.",
    },
    {
      question: "What are your career goals?",
      answer:
        "My short-term goal is to gain hands-on experience with real-world systems and contribute to national projects. Long-term, I aspire to become a software architect leading large-scale innovations in the Kingdom.",
    },
  ];
  const applicantion1 = {
    name: "Nouf Al-Qahtani",
    email: "nouf.q@gmail.com",
    cv_path: "/app4-cv.pdf",
    questions: questions1,
  };
  const applicantion2 = {
    name: "Nouf Al-Qahtani",
    email: "nouf.q@gmail.com",
    cv_path: "/app4-cv.pdf",
    questions: questions2,
  };
  const applicantion3 = {
    name: "Nouf Al-Qahtani",
    email: "nouf.q@gmail.com",
    cv_path: "/app4-cv.pdf",
    questions: questions3,
  };
  return (
    <Routes>
      <Route path="/1" element={<DetailsSt {...applicantion1} />} />
      <Route path="/2" element={<DetailsSt {...applicantion2} />} />
      <Route path="/3" element={<DetailsSt {...applicantion3} />} />
    </Routes>
  );
}
