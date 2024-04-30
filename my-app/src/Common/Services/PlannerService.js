import Parse from 'parse';

export const saveMealPlan = async (mealPlanData) => {
  const MealPlan = Parse.Object.extend('MealPlan');
  const mealPlan = new MealPlan();

  mealPlan.set('user', Parse.User.createWithoutData(mealPlanData.userId));
  mealPlan.set('days', mealPlanData.days);
  mealPlan.set('meals', mealPlanData.meals);

  try {
    const result = await mealPlan.save();
    return result;
  } catch (error) {
    console.error('Error saving meal plan:', error);
    throw new Error('Failed to save meal plan');
  }
};