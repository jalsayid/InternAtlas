export const reviewData = {
    "p&g": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "zmi holdings": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "rawabi holding": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "kreatiustorm": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "pepsico": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "innovatex": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "jazeera tech": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "shieldx": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "visionlab": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "aramix group": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "lexedge": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "nextify": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "brightloop": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ],
    "sabic": [
      {
        text: "My internship was an incredibly valuable experience with challenging tasks and supportive mentors.",
        rating: 5,
        companyResponse: "Thank you! We're happy you had a great experience."
      },
      {
        text: "The environment was professional and I learned a lot working on real-world projects.",
        rating: 4,
        companyResponse: "We appreciate your feedback and contributions!"
      }
    ]
  };




export function addReview(company, review) {
    const key = company.toLowerCase();
    if (!reviewData[key]) {
        reviewData[key] = [];
    }
    reviewData[key].push(review);
}
