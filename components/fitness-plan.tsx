import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Utensils, ShoppingBag } from "lucide-react"

type FitnessPlanProps = {
  plan: any
  userData: any
}

export default function FitnessPlan({ plan, userData }: FitnessPlanProps) {
  if (!plan) return null

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-emerald-700">Your 7-Day Personalized Fitness & Nutrition Blueprint</h2>
        <p className="text-gray-600">Customized for {userData.fullName} based on your goals and preferences</p>
      </div>

      <Tabs defaultValue="day1" className="w-full">
        <TabsList className="grid grid-cols-7 mb-4">
          {Array.from({ length: 7 }, (_, i) => (
            <TabsTrigger key={i} value={`day${i + 1}`}>
              Day {i + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {plan.days.map((day: any, index: number) => (
          <TabsContent key={index} value={`day${index + 1}`} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="bg-emerald-50 border-b">
                  <CardTitle className="flex items-center text-lg">
                    <Dumbbell className="mr-2 h-5 w-5 text-emerald-600" />
                    {day.workout.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">WARM-UP</h4>
                      <p className="text-sm">{day.workout.warmUp}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-500">MAIN EXERCISES</h4>
                      <ul className="space-y-2 mt-2">
                        {day.workout.exercises.map((exercise: any, i: number) => (
                          <li key={i} className="border-b pb-2">
                            <div className="font-medium">
                              {i + 1}. {exercise.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {exercise.sets} × {exercise.reps} (Rest: {exercise.rest})
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-500">CONDITIONING</h4>
                      <p className="text-sm">{day.workout.conditioning}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-500">COOL-DOWN</h4>
                      <p className="text-sm">{day.workout.coolDown}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-emerald-50 border-b">
                  <CardTitle className="flex items-center text-lg">
                    <Utensils className="mr-2 h-5 w-5 text-emerald-600" />
                    Nutrition Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {day.nutrition.meals.map((meal: any, i: number) => (
                      <div key={i} className="border-b pb-3">
                        <h4 className="font-medium">
                          {meal.name} ({meal.calories} kcal)
                        </h4>
                        <p className="text-xs text-gray-500">
                          {meal.macros.protein}g protein • {meal.macros.carbs}g carbs • {meal.macros.fat}g fat
                        </p>
                        <div className="mt-1">
                          <h5 className="text-sm font-medium text-gray-600">Ingredients:</h5>
                          <ul className="text-sm list-disc pl-5">
                            {meal.ingredients.map((ingredient: string, idx: number) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="bg-emerald-50 border-b">
                <CardTitle className="flex items-center text-lg">
                  <ShoppingBag className="mr-2 h-5 w-5 text-emerald-600" />
                  Daily Grocery List
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(day.groceryList).map(([category, items]: [string, any]) => (
                    <div key={category}>
                      <h4 className="font-medium text-emerald-700 mb-2">{category}</h4>
                      <ul className="space-y-1 text-sm">
                        {items.map((item: string, i: number) => (
                          <li key={i} className="flex items-center">
                            <span className="mr-2">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader className="bg-emerald-50 border-b">
          <CardTitle className="flex items-center text-lg">
            <ShoppingBag className="mr-2 h-5 w-5 text-emerald-600" />
            Weekly Grocery List (Aggregated)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(plan.weeklyGroceryList).map(([category, items]: [string, any]) => (
              <div key={category}>
                <h4 className="font-medium text-emerald-700 mb-2">{category}</h4>
                <ul className="space-y-1 text-sm">
                  {items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Made by</p>
              <h3 className="text-lg font-semibold text-emerald-700">Developer: Satria Nugroho Putra</h3>
            </div>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/satrianugroho.p?igsh=b2xqbG15bmhsOGhn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/satrianugrohoputra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
            <p className="text-xs text-gray-500">
              For questions or custom fitness app development, feel free to reach out!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
