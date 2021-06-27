const updateRating = (reviews, numReviews) => {
  let totalRating = 0;

  if (numReviews === 0) return 0;

  for (let i = 0; i < numReviews; i++) {
    totalRating += reviews[i].rating;
  }

  return totalRating / numReviews;
};

export default updateRating;
