export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolData {
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  category: "numerology" | "health";
  icon: string;
  popular?: boolean;
  intro: string;
  formula?: string;
  benefits: string[];
  faqs: ToolFAQ[];
  relatedSlugs: string[];
}

export const tools: ToolData[] = [
  // NUMEROLOGY
  {
    slug: "name-numerology-calculator",
    name: "Name Numerology Calculator",
    shortDescription: "Discover hidden meanings in your name using Pythagorean numerology.",
    metaTitle: "Name Numerology Calculator – Free Name Number Analysis",
    metaDescription: "Calculate your name number using Pythagorean numerology. Discover personality traits, strengths, and destiny hidden in your name. 100% free & instant.",
    category: "numerology",
    icon: "✨",
    popular: true,
    intro: "Your name carries a powerful vibration. Using Pythagorean numerology, each letter is assigned a number (A=1, B=2... I=9, J=1...). The digits are summed and reduced to a single digit (1-9) or master number (11, 22, 33) to reveal your Name Number.",
    formula: "Each letter maps to 1-9 (A=1, B=2, C=3... I=9, J=1, K=2...). Sum all letter values, then reduce to a single digit unless it's 11, 22, or 33.",
    benefits: ["Understand personality traits linked to your name", "Find lucky and compatible names", "Choose powerful baby or business names", "Gain self-awareness and direction"],
    faqs: [
      { question: "What is name numerology?", answer: "Name numerology assigns numerical values to letters in your name and reduces them to a single-digit or master number to reveal personality traits." },
      { question: "Which system is used?", answer: "We use the Pythagorean (Western) system where A=1, B=2...I=9, then J=1, K=2, etc." },
      { question: "Should I use my full name?", answer: "Yes, using your full birth name gives the most accurate result." },
      { question: "What are master numbers?", answer: "11, 22, and 33 are master numbers with special significance and are not reduced further." },
      { question: "Can I check nicknames?", answer: "Absolutely! You can check any name variation to see its vibration." },
    ],
    relatedSlugs: ["life-path-number-calculator", "destiny-number-calculator", "baby-name-numerology"],
  },
  {
    slug: "life-path-number-calculator",
    name: "Life Path Number Calculator",
    shortDescription: "Find your life path number from your date of birth.",
    metaTitle: "Life Path Number Calculator – Free DOB Numerology Tool",
    metaDescription: "Calculate your life path number from your birth date. Discover your life purpose, strengths, and challenges. Instant & free numerology calculator.",
    category: "numerology",
    icon: "🌟",
    popular: true,
    intro: "Your Life Path Number is the most important number in numerology. Derived from your full date of birth, it reveals your life purpose, natural talents, and the challenges you'll face.",
    formula: "Add all digits of your birth date (DD+MM+YYYY), then reduce to a single digit or master number (11, 22, 33).",
    benefits: ["Discover your life purpose", "Understand natural strengths and weaknesses", "Improve relationships through self-knowledge", "Make better career decisions"],
    faqs: [
      { question: "What is a life path number?", answer: "It's a single-digit number derived from your birth date that reveals your life's purpose and direction." },
      { question: "How is it calculated?", answer: "Add each digit of your birth date together, then reduce to a single digit (unless 11, 22, or 33)." },
      { question: "What does life path 1 mean?", answer: "Life path 1 indicates leadership, independence, and pioneering spirit." },
      { question: "Can two people have the same life path?", answer: "Yes, many people share life path numbers, but their full chart will differ." },
      { question: "Is life path number the same as destiny number?", answer: "No. Life path comes from birth date; destiny number comes from your name." },
    ],
    relatedSlugs: ["name-numerology-calculator", "destiny-number-calculator", "personal-year-number-calculator"],
  },
  {
    slug: "destiny-number-calculator",
    name: "Destiny Number Calculator",
    shortDescription: "Calculate your destiny number from your full birth name.",
    metaTitle: "Destiny Number Calculator – Free Expression Number Tool",
    metaDescription: "Find your destiny (expression) number from your birth name. Uncover talents, goals, and your true calling. Free & instant numerology calculator.",
    category: "numerology",
    icon: "🔮",
    popular: true,
    intro: "The Destiny Number, also called Expression Number, is calculated from your full birth name. It reveals your natural abilities, personal goals, and the opportunities that will come your way.",
    formula: "Same as name numerology — sum all letter values from full birth name and reduce to single digit or master number.",
    benefits: ["Understand your innate talents", "Clarify your life goals", "Align career with natural strengths", "Improve personal development"],
    faqs: [
      { question: "What's the difference between destiny and life path?", answer: "Life path comes from birth date; destiny number comes from your full birth name." },
      { question: "Should I use married or maiden name?", answer: "Use your birth name for the most accurate destiny number." },
      { question: "What does destiny number 5 mean?", answer: "It indicates freedom, adventure, and adaptability." },
      { question: "Can I change my destiny number?", answer: "Legally changing your name can shift your vibration, but birth name destiny remains." },
      { question: "Is destiny number same as expression number?", answer: "Yes, they are the same thing." },
    ],
    relatedSlugs: ["name-numerology-calculator", "life-path-number-calculator", "mobile-number-numerology"],
  },
  {
    slug: "mobile-number-numerology",
    name: "Mobile Number Numerology",
    shortDescription: "Check the numerological energy of your phone number.",
    metaTitle: "Mobile Number Numerology Calculator – Check Phone Number Energy",
    metaDescription: "Analyze your mobile number's numerological vibration. Find if your phone number is lucky for you. Free instant mobile numerology tool.",
    category: "numerology",
    icon: "📱",
    popular: true,
    intro: "Your mobile number carries a unique vibration that can influence your daily life. By reducing all digits to a single number, you can discover whether your phone number aligns with your personal energy.",
    formula: "Sum all digits of the mobile number and reduce to a single digit (1-9).",
    benefits: ["Check if your number is lucky", "Choose a number aligned with your energy", "Understand the vibration of your current number", "Make informed decisions about number changes"],
    faqs: [
      { question: "Does phone number really affect luck?", answer: "In numerology, every number carries a vibration. While not scientifically proven, many believe it influences energy." },
      { question: "Should I include country code?", answer: "Typically, just the 10-digit mobile number is used." },
      { question: "What is the luckiest number?", answer: "Numbers like 1, 3, 5, and 9 are generally considered lucky, but it depends on your personal chart." },
      { question: "Can I check landline numbers?", answer: "Yes, the same principle applies to any number." },
      { question: "How often should I check?", answer: "Check whenever you get a new number or are considering changing." },
    ],
    relatedSlugs: ["name-numerology-calculator", "life-path-number-calculator", "vehicle-number-numerology"],
  },
  {
    slug: "personal-year-number-calculator",
    name: "Personal Year Number Calculator",
    shortDescription: "Discover what this year holds for you numerologically.",
    metaTitle: "Personal Year Number Calculator – What Does This Year Hold?",
    metaDescription: "Calculate your personal year number and discover the theme of your current year. Free numerology tool for yearly insights.",
    category: "numerology",
    icon: "📅",
    intro: "Your Personal Year Number reveals the theme and energy of your current year. It cycles from 1 to 9 and helps you understand what opportunities and challenges lie ahead.",
    formula: "Add your birth day + birth month + current year digits, then reduce to single digit.",
    benefits: ["Plan your year with cosmic alignment", "Understand yearly cycles", "Make better timing decisions", "Prepare for upcoming challenges"],
    faqs: [
      { question: "What is a personal year number?", answer: "It's a number that reveals the overarching theme of your current year based on your birth date." },
      { question: "When does my personal year start?", answer: "Most numerologists say it starts on January 1st of each year." },
      { question: "What does personal year 1 mean?", answer: "It's a year of new beginnings, fresh starts, and initiative." },
      { question: "Does it change every year?", answer: "Yes, it cycles from 1-9 each year." },
      { question: "Can I calculate for future years?", answer: "Yes, just use the future year in the calculation." },
    ],
    relatedSlugs: ["life-path-number-calculator", "destiny-number-calculator", "name-numerology-calculator"],
  },
  {
    slug: "vehicle-number-numerology",
    name: "Vehicle Number Numerology",
    shortDescription: "Check the numerological vibration of your vehicle number.",
    metaTitle: "Vehicle Number Numerology – Check Your Car Number Energy",
    metaDescription: "Analyze your vehicle registration number's numerological energy. Find if your car number is lucky. Free instant numerology tool.",
    category: "numerology",
    icon: "🚗",
    intro: "In numerology, your vehicle number can influence the energy around your travels and safety. By reducing the digits in your registration number, you can find its core vibration.",
    formula: "Extract only the digits from your vehicle number, sum them, and reduce to a single digit.",
    benefits: ["Check vehicle number compatibility", "Choose a lucky registration number", "Understand travel energy", "Make informed vehicle purchases"],
    faqs: [
      { question: "Does vehicle number matter in numerology?", answer: "Many numerologists believe the number on your vehicle influences travel energy and safety." },
      { question: "Do I include letters?", answer: "Typically only the numeric portion is analyzed, though some systems assign values to letters too." },
      { question: "What's the best vehicle number?", answer: "Numbers reducing to 1, 5, or 6 are often considered favorable." },
      { question: "Can I check two-wheeler numbers?", answer: "Yes, the same method works for any vehicle." },
      { question: "Should I change my vehicle number?", answer: "If the number doesn't resonate, some people prefer to add a lucky sticker or accessory number." },
    ],
    relatedSlugs: ["mobile-number-numerology", "name-numerology-calculator", "life-path-number-calculator"],
  },
  // HEALTH
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    shortDescription: "Calculate your Body Mass Index instantly.",
    metaTitle: "BMI Calculator – Free Body Mass Index Calculator Online",
    metaDescription: "Calculate your BMI instantly. Check if you're underweight, normal, overweight, or obese. Free BMI calculator with health insights for men & women.",
    category: "health",
    icon: "⚖️",
    popular: true,
    intro: "Body Mass Index (BMI) is a simple measure using your height and weight to estimate body fat. It helps you understand if your weight falls within a healthy range.",
    formula: "BMI = Weight (kg) / Height² (m²). Categories: <18.5 Underweight, 18.5-24.9 Normal, 25-29.9 Overweight, 30+ Obese.",
    benefits: ["Quick health screening", "Track weight management progress", "Understand health risk levels", "Simple and widely used metric"],
    faqs: [
      { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered normal/healthy." },
      { question: "Is BMI accurate for athletes?", answer: "BMI may overestimate body fat in muscular individuals since it doesn't distinguish muscle from fat." },
      { question: "What BMI is considered obese?", answer: "A BMI of 30 or higher is classified as obese." },
      { question: "Does BMI differ by age?", answer: "For adults, the same formula applies. For children, age-specific percentiles are used." },
      { question: "How often should I check BMI?", answer: "Monthly tracking is usually sufficient for weight management." },
    ],
    relatedSlugs: ["ideal-weight-calculator", "bmr-calculator", "calorie-calculator"],
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    shortDescription: "Estimate your daily calorie needs for weight management.",
    metaTitle: "Calorie Calculator – Daily Calorie Needs Estimator (Free)",
    metaDescription: "Calculate how many calories you need daily based on age, weight, height, and activity level. Free calorie calculator for weight loss, gain, or maintenance.",
    category: "health",
    icon: "🔥",
    popular: true,
    intro: "Knowing your daily calorie needs is essential for weight management. This calculator uses the Mifflin-St Jeor equation — considered the most accurate — to estimate your Total Daily Energy Expenditure (TDEE).",
    formula: "BMR (Men) = 10×weight(kg) + 6.25×height(cm) - 5×age - 5. BMR (Women) = 10×weight(kg) + 6.25×height(cm) - 5×age - 161. TDEE = BMR × Activity Multiplier.",
    benefits: ["Plan meals for weight goals", "Understand energy balance", "Support fitness programs", "Make informed dietary choices"],
    faqs: [
      { question: "What is TDEE?", answer: "Total Daily Energy Expenditure — the total calories your body burns in a day including activity." },
      { question: "How accurate is this?", answer: "The Mifflin-St Jeor equation is considered the most accurate for most adults, within ±10%." },
      { question: "Should I eat below my TDEE to lose weight?", answer: "Yes, a deficit of 500 calories/day typically leads to ~0.5 kg/week weight loss." },
      { question: "Does exercise change my needs?", answer: "Yes, the activity multiplier accounts for exercise intensity." },
      { question: "What activity level should I choose?", answer: "Be honest — most people with desk jobs are 'lightly active' even if they exercise 2-3 times/week." },
    ],
    relatedSlugs: ["bmr-calculator", "bmi-calculator", "water-intake-calculator"],
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    shortDescription: "Calculate your Basal Metabolic Rate.",
    metaTitle: "BMR Calculator – Basal Metabolic Rate Calculator (Free)",
    metaDescription: "Find your BMR — the calories your body burns at rest. Use the Mifflin-St Jeor equation for accurate results. Free instant BMR calculator.",
    category: "health",
    icon: "💪",
    intro: "Your Basal Metabolic Rate (BMR) is the number of calories your body needs at complete rest — just to keep your organs functioning. It's the foundation for any calorie-based diet plan.",
    formula: "Men: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age(y) + 5. Women: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age(y) - 161.",
    benefits: ["Foundation for meal planning", "Understand resting energy needs", "Optimize weight loss/gain", "Personalize nutrition plans"],
    faqs: [
      { question: "What is BMR?", answer: "Basal Metabolic Rate — the calories your body burns just to maintain basic life functions at rest." },
      { question: "BMR vs TDEE?", answer: "BMR is rest-only. TDEE includes all daily activity on top of BMR." },
      { question: "Should I eat my BMR calories?", answer: "You should typically eat above BMR but below TDEE for healthy weight loss." },
      { question: "Does muscle mass affect BMR?", answer: "Yes, more muscle increases BMR since muscle burns more calories than fat." },
      { question: "Does BMR change with age?", answer: "Yes, BMR typically decreases about 1-2% per decade after age 20." },
    ],
    relatedSlugs: ["calorie-calculator", "bmi-calculator", "ideal-weight-calculator"],
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    shortDescription: "Find out how much water you should drink daily.",
    metaTitle: "Water Intake Calculator – Daily Water Requirement (Free)",
    metaDescription: "Calculate your recommended daily water intake based on weight, activity, and climate. Free water intake calculator for healthy hydration.",
    category: "health",
    icon: "💧",
    intro: "Proper hydration is crucial for health, digestion, skin, and energy levels. This calculator estimates your daily water needs based on your weight and activity level.",
    formula: "Base: 35ml per kg of body weight. Add 500ml for moderate activity, 1000ml for intense activity. Add 500ml for hot/humid climate.",
    benefits: ["Stay properly hydrated", "Improve energy and focus", "Support kidney function", "Better skin health"],
    faqs: [
      { question: "How much water should I drink daily?", answer: "A general guideline is 35ml per kg of body weight, adjusted for activity and climate." },
      { question: "Does tea/coffee count?", answer: "Partially. While they contain water, caffeine has mild diuretic effects. Count them at about 50%." },
      { question: "Can I drink too much water?", answer: "Yes, overhydration (hyponatremia) is possible but rare. Follow recommended amounts." },
      { question: "Does climate affect water needs?", answer: "Yes, hot and humid climates increase water loss through sweat." },
      { question: "Should I drink more during exercise?", answer: "Yes, drink about 200-300ml every 15-20 minutes during intense exercise." },
    ],
    relatedSlugs: ["calorie-calculator", "bmi-calculator", "bmr-calculator"],
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    shortDescription: "Find your ideal body weight based on height and gender.",
    metaTitle: "Ideal Weight Calculator – Find Your Perfect Weight (Free)",
    metaDescription: "Calculate your ideal body weight using multiple formulas. Find the healthy weight range for your height, age, and gender. Free & instant.",
    category: "health",
    icon: "🎯",
    intro: "Your ideal weight depends on height, gender, and body frame. This calculator uses the Devine formula — widely used in clinical settings — to estimate your healthy weight range.",
    formula: "Men: 50 + 2.3 × (height in inches - 60). Women: 45.5 + 2.3 × (height in inches - 60). Results in kg.",
    benefits: ["Set realistic weight goals", "Understand healthy weight range", "Track fitness progress", "Complement BMI analysis"],
    faqs: [
      { question: "What formula is used?", answer: "We use the Devine formula, which is widely used in medicine and pharmacology." },
      { question: "Is ideal weight the same for everyone of the same height?", answer: "No, body frame size and muscle mass affect ideal weight." },
      { question: "Should I aim for exact ideal weight?", answer: "No, a range of ±5-10% is considered healthy." },
      { question: "Does age affect ideal weight?", answer: "The basic formula doesn't account for age, but older adults may have slightly different ranges." },
      { question: "Is ideal weight different for athletes?", answer: "Athletes with more muscle mass may weigh more than 'ideal' and still be very healthy." },
    ],
    relatedSlugs: ["bmi-calculator", "bmr-calculator", "calorie-calculator"],
  },
];

export const getToolBySlug = (slug: string): ToolData | undefined =>
  tools.find((t) => t.slug === slug);

export const getToolsByCategory = (category: "numerology" | "health") =>
  tools.filter((t) => t.category === category);

export const getPopularTools = () => tools.filter((t) => t.popular);

export const getRelatedTools = (slugs: string[]) =>
  tools.filter((t) => slugs.includes(t.slug));
