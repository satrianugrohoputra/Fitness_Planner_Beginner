"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react"
import { generateFitnessPlan } from "@/lib/generate-fitness-plan"
import FitnessPlan from "@/components/fitness-plan"

type FormStep = {
  id: string
  title: string
  description?: string
}

type UserData = {
  fullName: string
  email: string
  phone: string
  currentWeight: string
  weightUnit: "kg" | "lbs"
  goalWeight: string
  trainingMethod: string
  equipment: string
  dietPreferences: string[]
}

const TRAINING_METHODS = [
  "Bodyweight/Calisthenics",
  "Free Weights",
  "Machine-based Gym",
  "HIIT/Cardio only",
  "Yoga/Pilates",
  "Hybrid",
]

const EQUIPMENT_OPTIONS = [
  "None (bodyweight only)",
  "Dumbbells & Resistance Bands",
  "Full Gym Access",
  "Home Cardio Equipment (treadmill, bike)",
]

const DIET_PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Omnivore",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Low-Carb",
  "No Red Meat",
  "Intermittent Fasting",
]

export default function FitnessLeadMagnet() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    currentWeight: "",
    weightUnit: "kg",
    goalWeight: "",
    trainingMethod: "",
    equipment: "",
    dietPreferences: [],
  })
  const [fitnessPlan, setFitnessPlan] = useState<any>(null)

  const steps: FormStep[] = [
    { id: "fullName", title: "What's your Full Name?" },
    { id: "email", title: "What's your Email Address?" },
    { id: "phone", title: "What's your Phone Number?" },
    { id: "weight", title: "What's your Current Weight?" },
    { id: "goalWeight", title: "What's your Goal Weight?" },
    { id: "trainingMethod", title: "What's your Preferred Training Method?" },
    { id: "equipment", title: "What Equipment do you have Access to?" },
    { id: "dietPreferences", title: "What are your Diet Preferences or Constraints?" },
    { id: "confirmation", title: "Please confirm your information" },
    { id: "generating", title: "Generating your personalized plan..." },
    { id: "plan", title: "Your 7-Day Personalized Fitness & Nutrition Blueprint" },
  ]

  const handleInputChange = (field: keyof UserData, value: any) => {
    setUserData({ ...userData, [field]: value })
  }

  const handleDietPreferenceToggle = (preference: string) => {
    const currentPreferences = [...userData.dietPreferences]
    if (currentPreferences.includes(preference)) {
      handleInputChange(
        "dietPreferences",
        currentPreferences.filter((p) => p !== preference),
      )
    } else {
      handleInputChange("dietPreferences", [...currentPreferences, preference])
    }
  }

  const handleNext = () => {
    if (isConfirming) {
      setIsConfirming(false)
      setCurrentStep(currentStep + 1)
    } else {
      setIsConfirming(true)
    }
  }

  const handleConfirmYes = () => {
    setIsConfirming(false)
    if (currentStep === steps.length - 4) {
      // If we're at the confirmation step (index 8, which is steps.length - 4)
      setCurrentStep(currentStep + 1) // Move to generating step
      generatePlan()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleConfirmNo = () => {
    setIsConfirming(false)
  }

  const handleBack = () => {
    if (isConfirming) {
      setIsConfirming(false)
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePlan = async () => {
    setIsGenerating(true)
    try {
      // In a real app, this would be an API call
      const plan = await generateFitnessPlan(userData)
      setFitnessPlan(plan)
      setIsGenerating(false)
      setCurrentStep(steps.length - 1) // Move to the final step (plan display)
    } catch (error) {
      console.error("Error generating plan:", error)
      setIsGenerating(false)
    }
  }

  const isStepValid = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case "fullName":
        return userData.fullName.trim().length > 0
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
      case "phone":
        return userData.phone.trim().length > 0
      case "weight":
        return !isNaN(Number(userData.currentWeight)) && Number(userData.currentWeight) > 0
      case "goalWeight":
        return !isNaN(Number(userData.goalWeight)) && Number(userData.goalWeight) > 0
      case "trainingMethod":
        return userData.trainingMethod !== ""
      case "equipment":
        return userData.equipment !== ""
      case "dietPreferences":
        return userData.dietPreferences.length > 0
      default:
        return true
    }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    if (isConfirming && currentStep < steps.length - 3) {
      return (
        <div className="space-y-4">
          <p className="text-center text-lg">
            You entered: <span className="font-semibold">{getStepValue()}</span> ✓
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleConfirmNo}>
              Edit
            </Button>
            <Button onClick={handleConfirmYes}>Next</Button>
          </div>
        </div>
      )
    }

    switch (step.id) {
      case "fullName":
        return (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your full name"
              value={userData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </div>
        )
      case "email":
        return (
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={userData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        )
      case "phone":
        return (
          <div className="space-y-4">
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={userData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
        )
      case "weight":
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Enter your current weight"
                value={userData.currentWeight}
                onChange={(e) => handleInputChange("currentWeight", e.target.value)}
                className="flex-1"
              />
              <RadioGroup
                value={userData.weightUnit}
                onValueChange={(value) => handleInputChange("weightUnit", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="kg" id="kg" />
                  <Label htmlFor="kg">kg</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="lbs" id="lbs" />
                  <Label htmlFor="lbs">lbs</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      case "goalWeight":
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Enter your goal weight"
                value={userData.goalWeight}
                onChange={(e) => handleInputChange("goalWeight", e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center px-3 border rounded-md">
                <span>{userData.weightUnit}</span>
              </div>
            </div>
          </div>
        )
      case "trainingMethod":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={userData.trainingMethod}
              onValueChange={(value) => handleInputChange("trainingMethod", value)}
              className="space-y-2"
            >
              {TRAINING_METHODS.map((method) => (
                <div key={method} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50">
                  <RadioGroupItem value={method} id={method} />
                  <Label htmlFor={method} className="flex-1 cursor-pointer">
                    {method}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case "equipment":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={userData.equipment}
              onValueChange={(value) => handleInputChange("equipment", value)}
              className="space-y-2"
            >
              {EQUIPMENT_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case "dietPreferences":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {DIET_PREFERENCES.map((preference) => (
                <div key={preference} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50">
                  <Checkbox
                    id={preference}
                    checked={userData.dietPreferences.includes(preference)}
                    onCheckedChange={() => handleDietPreferenceToggle(preference)}
                  />
                  <Label htmlFor={preference} className="flex-1 cursor-pointer">
                    {preference}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )
      case "confirmation":
        return (
          <div className="space-y-6">
            <p className="text-center text-lg font-medium">Please confirm your information:</p>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {userData.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userData.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {userData.phone}
              </p>
              <p>
                <span className="font-semibold">Current Weight:</span> {userData.currentWeight} {userData.weightUnit}
              </p>
              <p>
                <span className="font-semibold">Goal Weight:</span> {userData.goalWeight} {userData.weightUnit}
              </p>
              <p>
                <span className="font-semibold">Training Method:</span> {userData.trainingMethod}
              </p>
              <p>
                <span className="font-semibold">Equipment:</span> {userData.equipment}
              </p>
              <p>
                <span className="font-semibold">Diet Preferences:</span> {userData.dietPreferences.join(", ")}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleBack}>
                Edit
              </Button>
              <Button onClick={handleConfirmYes}>Confirm & Generate Plan</Button>
            </div>
          </div>
        )
      case "generating":
        return (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            {isGenerating ? (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
                <p className="text-center text-lg">
                  Thank you, {userData.fullName}! Building your personalized plan now...
                </p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-lg font-semibold text-emerald-600 mb-4">🎉 Your plan is ready!</p>
                <Button onClick={() => setCurrentStep(currentStep + 1)}>View Your Plan</Button>
              </div>
            )}
          </div>
        )
      case "plan":
        return <FitnessPlan plan={fitnessPlan} userData={userData} />
      default:
        return null
    }
  }

  const getStepValue = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case "fullName":
        return userData.fullName
      case "email":
        return userData.email
      case "phone":
        return userData.phone
      case "weight":
        return `${userData.currentWeight} ${userData.weightUnit}`
      case "goalWeight":
        return `${userData.goalWeight} ${userData.weightUnit}`
      case "trainingMethod":
        return userData.trainingMethod
      case "equipment":
        return userData.equipment
      case "dietPreferences":
        return userData.dietPreferences.join(", ")
      default:
        return ""
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-emerald-700">{steps[currentStep].title}</CardTitle>
          <div className="text-sm text-gray-500">
            {currentStep < steps.length - 3 && `Question ${currentStep + 1} of ${steps.length - 3}`}
          </div>
        </div>
        {steps[currentStep].description && <p className="text-gray-500">{steps[currentStep].description}</p>}
      </CardHeader>
      <CardContent>{renderStepContent()}</CardContent>
      {currentStep < steps.length - 3 && !isConfirming && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid()}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
