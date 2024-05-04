import Parse from 'parse';

export const saveMealPlan = async (mealPlanData) => {
    const MealPlan = Parse.Object.extend('MealPlan');
    let mealPlan;
    
    if (mealPlanData.id) {
        // Updating an existing meal plan
        const query = new Parse.Query(MealPlan);
        mealPlan = await query.get(mealPlanData.id);
    } else {
        // Creating a new meal plan
        mealPlan = new MealPlan();
    }

    mealPlan.set('user', Parse.User.createWithoutData(mealPlanData.userId));
    mealPlan.set('days', mealPlanData.days);
    mealPlan.set('meals', mealPlanData.meals.map(day => ({
        breakfast: day.breakfast.id,
        breakfastName: day.breakfast.name,
        lunch: day.lunch.id,
        lunchName: day.lunch.name,
        dinner: day.dinner.id,
        dinnerName: day.dinner.name
    })));

    try {
        await mealPlan.save();
        return mealPlan;
    } catch (error) {
        console.error('Error saving meal plan:', error);
        throw new Error('Failed to save meal plan');
    }
};

// Function to fetch all meal plans for a specific user

export const fetchMealPlans = async (userId) => {
    const MealPlan = Parse.Object.extend('MealPlan');
    const user = Parse.User.createWithoutData(userId);
    const query = new Parse.Query(MealPlan);
    query.equalTo('user', user);

    try {
        const results = await query.find();
        return results.map(plan => ({
            id: plan.id,
            days: plan.get('days'),
            meals: plan.get('meals')
        }));
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        throw new Error('Failed to fetch meal plans');
    }
};

// Function to delete a specific meal plan
export const deleteMealPlan = async (planId) => {
    const MealPlan = Parse.Object.extend('MealPlan');
    const query = new Parse.Query(MealPlan);

    try {
        const mealPlan = await query.get(planId);
        await mealPlan.destroy();
    } catch (error) {
        console.error('Error deleting meal plan:', error);
        throw new Error('Failed to delete meal plan');
    }
};

// Function to fetch a single meal plan by ID
export const fetchMealPlanById = async (planId) => {
    const MealPlan = Parse.Object.extend('MealPlan');
    const query = new Parse.Query(MealPlan);

    try {
        const mealPlan = await query.get(planId);
        return {
            id: mealPlan.id,
            days: mealPlan.get('days'),
            meals: mealPlan.get('meals')
        };
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        throw new Error('Failed to fetch meal plan');
    }
};
