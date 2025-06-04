// This is a mock implementation that would be replaced with a real API call in production
export async function generateFitnessPlan(userData: any) {
  console.log("Generating plan for:", userData)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate a mock fitness plan based on user data
  const isWeightLoss = Number(userData.currentWeight) > Number(userData.goalWeight)
  const trainingType = userData.trainingMethod
  const equipment = userData.equipment
  const dietPreferences = userData.dietPreferences

  console.log("Plan parameters:", { isWeightLoss, trainingType, equipment, dietPreferences })

  // Create a 7-day plan
  const days = Array.from({ length: 7 }, (_, i) => {
    return {
      workout: generateWorkout(i + 1, trainingType, equipment, isWeightLoss),
      nutrition: generateNutrition(i + 1, dietPreferences, isWeightLoss),
      groceryList: generateDailyGroceryList(i + 1, dietPreferences),
    }
  })

  const plan = {
    days,
    weeklyGroceryList: generateWeeklyGroceryList(dietPreferences),
  }

  console.log("Generated plan:", plan)
  return plan
}

function generateWorkout(day: number, trainingType: string, equipment: string, isWeightLoss: boolean) {
  const dayNames = [
    "Full-Body Strength",
    "Cardio & Core",
    "Upper Body Focus",
    "Active Recovery",
    "Lower Body Focus",
    "HIIT Circuit",
    "Mobility & Stretching",
  ]

  const workoutTitle = `Day ${day} – ${dayNames[day - 1]} (${trainingType})`

  let exercises = []

  if (trainingType.includes("Bodyweight") || equipment.includes("None")) {
    exercises = [
      { name: "Bodyweight Squats", sets: "3", reps: "15", rest: "45 sec" },
      { name: "Push-ups (or Modified Push-ups)", sets: "3", reps: "10-12", rest: "60 sec" },
      { name: "Walking Lunges", sets: "3", reps: "12 per leg", rest: "45 sec" },
      { name: "Plank", sets: "3", reps: "30-45 sec hold", rest: "30 sec" },
    ]
  } else if (trainingType.includes("Free Weights")) {
    exercises = [
      { name: "Barbell Squats", sets: "4", reps: "8", rest: "90 sec" },
      { name: "Dumbbell Bench Press", sets: "3", reps: "10", rest: "60 sec" },
      { name: "Bent-Over Rows", sets: "3", reps: "12", rest: "60 sec" },
      { name: "Shoulder Press", sets: "3", reps: "10", rest: "60 sec" },
    ]
  } else if (trainingType.includes("Machine")) {
    exercises = [
      { name: "Leg Press", sets: "3", reps: "12", rest: "60 sec" },
      { name: "Chest Press Machine", sets: "3", reps: "10", rest: "60 sec" },
      { name: "Lat Pulldown", sets: "3", reps: "12", rest: "60 sec" },
      { name: "Seated Row", sets: "3", reps: "12", rest: "60 sec" },
    ]
  } else if (trainingType.includes("HIIT")) {
    exercises = [
      { name: "Burpees", sets: "4", reps: "45 sec work / 15 sec rest", rest: "Complete circuit" },
      { name: "Mountain Climbers", sets: "4", reps: "45 sec work / 15 sec rest", rest: "Complete circuit" },
      { name: "Jump Squats", sets: "4", reps: "45 sec work / 15 sec rest", rest: "Complete circuit" },
      { name: "High Knees", sets: "4", reps: "45 sec work / 15 sec rest", rest: "Complete circuit" },
    ]
  } else if (trainingType.includes("Yoga")) {
    exercises = [
      { name: "Sun Salutation A", sets: "3", reps: "Full sequence", rest: "Breath between" },
      { name: "Warrior Sequence", sets: "2", reps: "Each side", rest: "Breath between" },
      { name: "Balance Poses", sets: "2", reps: "30 sec each pose", rest: "Breath between" },
      { name: "Core Flow", sets: "1", reps: "3-5 min sequence", rest: "As needed" },
    ]
  } else {
    // Hybrid approach
    exercises = [
      { name: "Kettlebell Swings", sets: "3", reps: "15", rest: "45 sec" },
      { name: "TRX Rows", sets: "3", reps: "12", rest: "45 sec" },
      { name: "Dumbbell Lunges", sets: "3", reps: "10 each leg", rest: "60 sec" },
      { name: "Medicine Ball Slams", sets: "3", reps: "12", rest: "45 sec" },
    ]
  }

  let conditioning = ""
  if (isWeightLoss) {
    conditioning = "20 minutes of steady-state cardio (treadmill, bike, or elliptical) at 65-75% max heart rate"
  } else {
    conditioning = "10 minutes of high-intensity intervals (30 sec sprint / 30 sec rest)"
  }

  return {
    title: workoutTitle,
    warmUp: "5 minutes of dynamic stretching and light cardio to increase heart rate",
    exercises: exercises,
    conditioning: conditioning,
    coolDown: "5 minutes of static stretching focusing on worked muscle groups",
  }
}

function generateNutrition(day: number, dietPreferences: string[], isWeightLoss: boolean) {
  const isVegetarian = dietPreferences.includes("Vegetarian")
  const isVegan = dietPreferences.includes("Vegan")
  const isKeto = dietPreferences.includes("Keto")
  const isLowCarb = dietPreferences.includes("Low-Carb")

  let proteinSources = []
  let carbSources = []
  let fatSources = []

  // Determine protein sources based on diet preferences
  if (isVegan) {
    proteinSources = ["tofu", "tempeh", "seitan", "lentils", "chickpeas", "black beans", "protein powder (plant-based)"]
  } else if (isVegetarian) {
    proteinSources = ["eggs", "Greek yogurt", "cottage cheese", "tofu", "tempeh", "lentils", "protein powder (whey)"]
  } else {
    proteinSources = ["chicken breast", "turkey", "lean beef", "salmon", "tuna", "eggs", "Greek yogurt"]
  }

  // Determine carb sources based on diet preferences
  if (isKeto || isLowCarb) {
    carbSources = ["leafy greens", "broccoli", "cauliflower", "zucchini", "bell peppers", "berries (limited)"]
  } else {
    carbSources = ["brown rice", "quinoa", "sweet potatoes", "oats", "whole grain bread", "fruits", "vegetables"]
  }

  // Determine fat sources
  fatSources = ["avocado", "olive oil", "nuts", "seeds", "nut butters"]
  if (!isVegan) {
    fatSources.push("cheese (in moderation)")
  }
  if (!isVegetarian && !isVegan) {
    fatSources.push("salmon", "eggs")
  }

  // Generate meals based on the day and diet preferences
  const breakfast = generateMeal(
    "Breakfast",
    day,
    proteinSources,
    carbSources,
    fatSources,
    dietPreferences,
    isWeightLoss,
  )
  const snack1 = generateMeal(
    "Mid-Morning Snack",
    day,
    proteinSources,
    carbSources,
    fatSources,
    dietPreferences,
    isWeightLoss,
  )
  const lunch = generateMeal("Lunch", day, proteinSources, carbSources, fatSources, dietPreferences, isWeightLoss)
  const snack2 = generateMeal(
    "Afternoon Snack",
    day,
    proteinSources,
    carbSources,
    fatSources,
    dietPreferences,
    isWeightLoss,
  )
  const dinner = generateMeal("Dinner", day, proteinSources, carbSources, fatSources, dietPreferences, isWeightLoss)

  return {
    meals: [breakfast, snack1, lunch, snack2, dinner],
  }
}

function generateMeal(
  mealType: string,
  day: number,
  proteins: string[],
  carbs: string[],
  fats: string[],
  dietPreferences: string[],
  isWeightLoss: boolean,
) {
  const isKeto = dietPreferences.includes("Keto")
  const isLowCarb = dietPreferences.includes("Low-Carb")

  let calories, protein, carb, fat

  // Adjust macros based on meal type and diet preferences
  if (mealType === "Breakfast") {
    calories = isWeightLoss ? 350 : 450
    protein = isWeightLoss ? 30 : 35
    carb = isKeto ? 5 : isLowCarb ? 20 : 45
    fat = isKeto ? 30 : isLowCarb ? 25 : 15
  } else if (mealType.includes("Snack")) {
    calories = isWeightLoss ? 150 : 200
    protein = isWeightLoss ? 15 : 20
    carb = isKeto ? 3 : isLowCarb ? 10 : 20
    fat = isKeto ? 12 : isLowCarb ? 10 : 5
  } else {
    calories = isWeightLoss ? 450 : 550
    protein = isWeightLoss ? 35 : 40
    carb = isKeto ? 8 : isLowCarb ? 25 : 55
    fat = isKeto ? 35 : isLowCarb ? 30 : 15
  }

  // Generate meal names and ingredients based on meal type and day
  let mealName, ingredients

  if (mealType === "Breakfast") {
    const breakfastOptions = [
      {
        name: "Greek Yogurt Parfait",
        ingredients: ["1 cup Greek yogurt", "1/2 cup berries", "1/4 cup granola", "1 tbsp honey"],
      },
      {
        name: "Protein Oatmeal",
        ingredients: ["1 cup oats", "1 scoop protein powder", "1 tbsp almond butter", "1/2 banana, sliced"],
      },
      {
        name: "Veggie Omelette",
        ingredients: ["3 eggs", "1/4 cup bell peppers", "1/4 cup spinach", "1/4 cup onions", "1 oz cheese"],
      },
      {
        name: "Avocado Toast",
        ingredients: ["2 slices whole grain bread", "1/2 avocado", "2 eggs", "Salt and pepper to taste"],
      },
      {
        name: "Protein Smoothie",
        ingredients: ["1 scoop protein powder", "1 cup almond milk", "1/2 cup berries", "1 tbsp nut butter", "Ice"],
      },
      {
        name: "Chia Seed Pudding",
        ingredients: ["1/4 cup chia seeds", "1 cup almond milk", "1 tbsp maple syrup", "1/4 cup berries"],
      },
      {
        name: "Breakfast Burrito",
        ingredients: ["1 whole grain wrap", "2 eggs", "1/4 cup black beans", "1/4 avocado", "2 tbsp salsa"],
      },
    ]

    const index = (day - 1) % breakfastOptions.length
    mealName = breakfastOptions[index].name
    ingredients = breakfastOptions[index].ingredients
  } else if (mealType.includes("Snack")) {
    const snackOptions = [
      { name: "Apple with Almond Butter", ingredients: ["1 medium apple", "1 tbsp almond butter"] },
      { name: "Protein Bar", ingredients: ["1 protein bar (20g protein)"] },
      { name: "Greek Yogurt with Berries", ingredients: ["3/4 cup Greek yogurt", "1/4 cup mixed berries"] },
      {
        name: "Hummus with Veggies",
        ingredients: ["1/4 cup hummus", "1 cup sliced vegetables (carrots, cucumbers, bell peppers)"],
      },
      { name: "Hard-Boiled Eggs", ingredients: ["2 hard-boiled eggs", "Salt and pepper to taste"] },
      { name: "Trail Mix", ingredients: ["1/4 cup mixed nuts", "1 tbsp dried fruit", "1 tbsp dark chocolate chips"] },
      { name: "Cottage Cheese with Fruit", ingredients: ["1/2 cup cottage cheese", "1/2 cup pineapple chunks"] },
    ]

    const index = ((day - 1) * 2 + (mealType.includes("Afternoon") ? 1 : 0)) % snackOptions.length
    mealName = snackOptions[index].name
    ingredients = snackOptions[index].ingredients
  } else if (mealType === "Lunch") {
    const lunchOptions = [
      {
        name: "Grilled Chicken Salad",
        ingredients: [
          "4 oz grilled chicken breast",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 cup cucumber",
          "2 tbsp vinaigrette",
        ],
      },
      {
        name: "Turkey and Avocado Wrap",
        ingredients: [
          "1 whole grain wrap",
          "4 oz turkey breast",
          "1/4 avocado",
          "1 cup leafy greens",
          "1 tbsp mustard",
        ],
      },
      {
        name: "Quinoa Bowl",
        ingredients: [
          "3/4 cup cooked quinoa",
          "4 oz grilled tofu",
          "1/2 cup roasted vegetables",
          "2 tbsp tahini dressing",
        ],
      },
      {
        name: "Tuna Salad Sandwich",
        ingredients: [
          "3 oz tuna (canned in water)",
          "1 tbsp light mayo",
          "2 slices whole grain bread",
          "1 cup mixed greens",
        ],
      },
      {
        name: "Lentil Soup with Side Salad",
        ingredients: ["1 cup lentil soup", "2 cups mixed greens", "1 tbsp olive oil", "1 tbsp balsamic vinegar"],
      },
      {
        name: "Chicken and Rice Bowl",
        ingredients: [
          "4 oz grilled chicken",
          "1/2 cup brown rice",
          "1/2 cup black beans",
          "1/4 avocado",
          "2 tbsp salsa",
        ],
      },
      {
        name: "Mediterranean Plate",
        ingredients: ["1/4 cup hummus", "1/2 cup tabbouleh", "2 oz feta cheese", "5 olives", "1 whole wheat pita"],
      },
    ]

    const index = (day - 1) % lunchOptions.length
    mealName = lunchOptions[index].name
    ingredients = lunchOptions[index].ingredients
  } else if (mealType === "Dinner") {
    const dinnerOptions = [
      {
        name: "Baked Salmon with Roasted Vegetables",
        ingredients: [
          "5 oz salmon fillet",
          "1 cup roasted broccoli and cauliflower",
          "1/2 cup quinoa",
          "1 tbsp olive oil",
          "Lemon and herbs",
        ],
      },
      {
        name: "Stir-Fry with Lean Protein",
        ingredients: [
          "4 oz chicken/tofu",
          "2 cups mixed vegetables",
          "1/2 cup brown rice",
          "1 tbsp low-sodium soy sauce",
          "1 tsp sesame oil",
        ],
      },
      {
        name: "Turkey Chili",
        ingredients: [
          "4 oz ground turkey",
          "1/2 cup beans",
          "1/4 cup onions",
          "1/4 cup bell peppers",
          "1/2 cup crushed tomatoes",
          "Spices",
        ],
      },
      {
        name: "Zucchini Noodles with Protein",
        ingredients: [
          "2 medium zucchinis (spiralized)",
          "4 oz protein of choice",
          "1/2 cup marinara sauce",
          "1 tbsp grated parmesan",
          "Fresh basil",
        ],
      },
      {
        name: "Grilled Steak with Sweet Potato",
        ingredients: [
          "4 oz lean steak",
          "1 medium sweet potato",
          "2 cups steamed green beans",
          "1 tbsp olive oil",
          "Herbs and spices",
        ],
      },
      {
        name: "Stuffed Bell Peppers",
        ingredients: [
          "2 bell peppers",
          "1/2 cup cooked quinoa",
          "3 oz ground turkey/tempeh",
          "1/4 cup onions",
          "1/4 cup tomato sauce",
          "Spices",
        ],
      },
      {
        name: "Baked Chicken with Vegetables",
        ingredients: [
          "5 oz chicken breast",
          "1 cup roasted vegetables",
          "1/2 cup brown rice",
          "1 tbsp olive oil",
          "Herbs and spices",
        ],
      },
    ]

    const index = (day - 1) % dinnerOptions.length
    mealName = dinnerOptions[index].name
    ingredients = dinnerOptions[index].ingredients
  }

  return {
    name: mealName,
    calories: calories,
    macros: {
      protein: protein,
      carbs: carb,
      fat: fat,
    },
    ingredients: ingredients,
  }
}

function generateDailyGroceryList(day: number, dietPreferences: string[]) {
  // This would be more sophisticated in a real app, based on the actual meals
  return {
    Produce: [
      "Mixed greens - 2 cups",
      "Bell peppers - 1",
      "Onion - 1/2",
      "Avocado - 1/2",
      "Berries - 1/2 cup",
      "Banana - 1",
    ],
    Proteins: ["Chicken breast - 8 oz", "Eggs - 3", "Greek yogurt - 1 cup", "Tofu - 4 oz (if vegetarian/vegan)"],
    "Grains & Pantry": [
      "Brown rice - 1/2 cup dry",
      "Oats - 1/2 cup",
      "Whole grain bread - 2 slices",
      "Quinoa - 1/2 cup dry",
      "Olive oil - 2 tbsp",
    ],
  }
}

function generateWeeklyGroceryList(dietPreferences: string[]) {
  const isVegetarian = dietPreferences.includes("Vegetarian")
  const isVegan = dietPreferences.includes("Vegan")

  return {
    Produce: [
      "Mixed greens - 14 cups",
      "Bell peppers - 7",
      "Onions - 3",
      "Avocados - 3",
      "Berries - 4 cups",
      "Bananas - 7",
      "Apples - 7",
      "Sweet potatoes - 3",
      "Zucchini - 2",
      "Broccoli - 2 heads",
      "Carrots - 1 bunch",
      "Cucumbers - 3",
    ],
    Proteins: isVegan
      ? [
          "Tofu - 28 oz",
          "Tempeh - 16 oz",
          "Lentils - 2 cups dry",
          "Chickpeas - 2 cans",
          "Black beans - 2 cans",
          "Plant-based protein powder - 1 container",
        ]
      : isVegetarian
        ? [
            "Eggs - 18",
            "Greek yogurt - 64 oz",
            "Cottage cheese - 16 oz",
            "Tofu - 16 oz",
            "Tempeh - 8 oz",
            "Whey protein powder - 1 container",
          ]
        : [
            "Chicken breast - 3 lbs",
            "Ground turkey - 1 lb",
            "Salmon - 1 lb",
            "Lean steak - 12 oz",
            "Tuna (canned) - 3 cans",
            "Eggs - 12",
            "Greek yogurt - 32 oz",
          ],
    "Grains & Pantry": [
      "Brown rice - 3 cups dry",
      "Quinoa - 2 cups dry",
      "Oats - 3 cups",
      "Whole grain bread - 1 loaf",
      "Whole grain wraps - 4",
      "Olive oil - 1 bottle",
      "Almond butter - 1 jar",
      "Honey - 1 bottle",
      "Maple syrup - 1 bottle",
      "Low-sodium soy sauce - 1 bottle",
      "Vinaigrette dressing - 1 bottle",
      "Spices (as needed)",
    ],
  }
}
