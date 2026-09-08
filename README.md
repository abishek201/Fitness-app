# Fitness Tracking App

A comprehensive fitness and nutrition tracking application built with Next.js. The app provides personalized calorie and macro calculations, custom workout plans, and meal planning based on user goals.

**Live Demo:** [https://fitness-app-ten-kappa.vercel.app/](https://fitness-app-ten-kappa.vercel.app/)

---

## Features

### Landing Page
- Hero section with brand introduction
- Client reviews and app features showcase
- Call-to-action banners and footer navigation

### User Authentication
- Continue with Google (UI ready)
- Email-based account creation
- Username capture for personalized dashboard

### Onboarding Flow
Multi-step form that collects user data and stores it in localStorage:
1. **Body Goal** - lean body, weight gain, fat loss, weight loss
2. **Age** - numeric input
3. **Body Fat Percentage** - slider input
4. **Height** - slider with cm/ft toggle
5. **Weight** - numeric input
6. **Exercise Activity** - weekly frequency selection

### Dashboard
- Client details display (name, age, height, weight, body fat)
- Calculated results based on user inputs:
  - BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
  - TDEE (Total Daily Energy Expenditure) with activity multipliers
  - Goal-adjusted calorie targets (surplus/deficit)
  - Daily macro breakdown (protein, carbohydrates, fats)
  - Daily step goals
  - Muscle and fat control projections
  - Custom fitness score
- Animated number displays with CSS transitions

### Exercise Planner
- Goal-specific workout routines:
  - Weight Gain: strength and mass building
  - Weight Loss: HIIT and cardio focused
  - Fat Loss: high intensity shredding
  - Lean Body: toning and definition
- 7-day weekly schedule with exercise details
- Sets, reps, and rest day recommendations

### Meal Planner
- Dynamically generated meal plans based on dashboard macro targets
- Portion scaling algorithm that matches calculated calories and macros
- Six daily meals with detailed food items
- Real-time macro calculations per meal
- Side-by-side target vs actual nutrient comparison

### Nutrition Reference Pages
- **Protein Foods** - protein content per 100g across meat, seafood, dairy, plant-based, nuts, and supplements
- **Carb Foods** - carbohydrate content per 100g across grains, vegetables, fruits, legumes, and snacks
- **Fat Foods** - fat content per 100g across oils, nuts, fish, dairy, and meat
- Visual progress bars and calorie information for each food

---

## Tech Stack

- **Framework:** Next.js (Pages Router)
- **Language:** JavaScript / JSX
- **Styling:** Pure CSS (no Tailwind CSS)
- **State Management:** React useState, useEffect
- **Data Persistence:** localStorage
- **Animations:** CSS keyframes and transitions
- **Deployment:** Vercel

---

## Project Structure

```
project-root/
├── pages/
│   ├── index.js              # Landing page
│   ├── login.js              # Authentication page
│   ├── goal.js               # Body goal selection
│   ├── age.js                # Age input
│   ├── body-fat.js           # Body fat percentage slider
│   ├── height.js             # Height input with unit toggle
│   ├── weight.js             # Weight input
│   ├── exercise-activity.js  # Activity frequency selection
│   ├── dashboard.js          # Main dashboard with calculations
│   ├── exercise-planner.js   # Workout routines by goal
│   ├── meal-planner.js       # Dynamic meal plans
│   ├── protein-foods.js      # Protein reference guide
│   ├── carbs-foods.js        # Carbohydrate reference guide
│   └── fats-foods.js         # Fat reference guide
│
├── styles/
│   ├── landing.css
│   ├── login.css
│   ├── goal.css
│   ├── age.css
│   ├── body-fat.css
│   ├── height.css
│   ├── weight.css
│   ├── exercise-activity.css
│   ├── dashboard.css
│   ├── exercise-planner.css
│   ├── meal-planner.css
│   ├── protein-foods.css
│   ├── carbs-foods.css
│   └── fats-foods.css
│
├── public/
│   └── (static assets)
│
├── package.json
└── next.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

---

## User Flow

1. User lands on the homepage and clicks "Start for Free"
2. Creates account via login page (captures username and email)
3. Completes onboarding: Goal -> Age -> Body Fat -> Height -> Weight -> Activity
4. Dashboard displays personalized calculations
5. User can navigate to:
   - Exercise Planner for workout routines
   - Meal Planner for daily nutrition plans
   - Nutrition pages for food reference data

---

## Data Storage

All user data is stored in the browser's localStorage under the key `userForm`. This includes:
- Profile: userName, email
- Body metrics: age, height, weight, heightUnit, fat
- Goals: goal, activity
- Calculated targets: caloriesTarget, proteinTarget, carbsTarget, fatsTarget

Data persists across sessions and pages without requiring a backend.

---

## Calculations Used

### BMR (Mifflin-St Jeor)
```
Men:   BMR = (10 x weight) + (6.25 x height) - (5 x age) + 5
Women: BMR = (10 x weight) + (6.25 x height) - (5 x age) - 161
```

### TDEE
```
TDEE = BMR x Activity Multiplier
```

### Activity Multipliers
- No physical activity: 1.2
- Weekly 2-3 times: 1.375
- Weekly 3-4 times: 1.55
- 6 days a week: 1.725

### Goal Adjustments
- Weight gain: TDEE + 500 calories
- Weight loss: TDEE - 300 calories
- Fat loss: TDEE - 300 calories
- Lean body: TDEE - 200 calories

### Macro Split
- Protein: 2.0g per kg body weight (weight gain) or 1.6g (maintenance)
- Fats: 25% of total calories
- Carbohydrates: remaining calories after protein and fat allocation

---

## Design Decisions

- **No Tailwind CSS:** All styling is done via separate CSS files for maximum control and readability.
- **No External UI Libraries:** Keeps bundle size small and dependencies minimal.
- **localStorage Only:** No backend required for demo purposes; all data stays client-side.
- **CSS Animations:** Minimal, performant animations using transforms and opacity (60fps friendly).
- **Responsive Design:** Mobile-first approach with breakpoints at 640px.

---

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## License

This project is open source and available under the MIT License.

---

**Built with Next.js and deployed on Vercel.**
