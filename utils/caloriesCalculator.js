export const CalorieCalculator = (activity, weight, time, distance = 0) => {
  const met = activity.met;
  let totalCalories;

  if (distance > 0) {
    // If distance is provided, calculate calories based on distance
    const caloriesPerKm = met * (weight / 1000);
    const totalDistanceCalories = caloriesPerKm * distance;
    const timeCalories = met * weight * (time / 60);
    totalCalories = totalDistanceCalories + timeCalories;
  } else {
    // If distance is not provided, calculate calories based on time only
    totalCalories = met * weight * (time / 60);
  }

  return totalCalories;
};
