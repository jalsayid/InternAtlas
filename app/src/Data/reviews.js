
export const reviewData = {
    google: [
        {
            text: "My internship was an incredibly valuable experience, offering meaningful projects, a supportive team, and a perfect balance of guidance and independence!",
            rating: 5,
            companyResponse: "Thank you! We're glad the experience was meaningful.",
        },
        {
            text: "I had a really rewarding internship experience! From day one, I was assigned meaningful projects that not only challenged me but also allowed me to grow professionally.",
            rating: 5,
            companyResponse: "We’re proud to support your professional growth!",
        },
    ],
};

export function addReview(company, review) {
    const key = company.toLowerCase();
    if (!reviewData[key]) {
        reviewData[key] = [];
    }
    reviewData[key].push(review);
}
