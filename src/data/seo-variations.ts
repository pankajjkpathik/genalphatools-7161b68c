export interface ToolVariation {
  slug: string;
  baseToolSlug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  h1: string;
  audience: string;
  faqs: { question: string; answer: string }[];
}

export const toolVariations: ToolVariation[] = [
  // BMI Variations
  {
    slug: "bmi-calculator-for-men",
    baseToolSlug: "bmi-calculator",
    name: "BMI Calculator for Men",
    h1: "BMI Calculator for Men",
    audience: "men",
    metaTitle: "BMI Calculator for Men – Check Your Body Mass Index (Free)",
    metaDescription: "Calculate BMI for men instantly. Know if you're underweight, normal, overweight, or obese. Free BMI calculator tailored for adult males.",
    intro: "This BMI calculator is tailored for men. Body Mass Index helps adult males assess whether their weight is healthy relative to their height. Men tend to carry more muscle mass, so BMI ranges may be interpreted differently. Enter your weight and height to get your BMI instantly.",
    faqs: [
      { question: "What is a healthy BMI for men?", answer: "A healthy BMI for men is between 18.5 and 24.9. However, muscular men may have a higher BMI without being overweight." },
      { question: "Is BMI accurate for muscular men?", answer: "BMI doesn't distinguish between muscle and fat. Men with high muscle mass may show a higher BMI even if they're healthy." },
      { question: "What BMI is considered obese for men?", answer: "A BMI of 30 or above is considered obese for both men and women." },
      { question: "How often should men check their BMI?", answer: "It's a good idea to check your BMI every few months, especially if you're working on fitness goals." },
      { question: "Does age affect BMI for men?", answer: "BMI ranges are the same for all adults, but body composition changes with age. Older men may have more body fat at the same BMI." },
    ],
  },
  {
    slug: "bmi-calculator-for-women",
    baseToolSlug: "bmi-calculator",
    name: "BMI Calculator for Women",
    h1: "BMI Calculator for Women",
    audience: "women",
    metaTitle: "BMI Calculator for Women – Free Body Mass Index Tool",
    metaDescription: "Calculate BMI for women online. Check if your weight is healthy for your height. Free, instant, and accurate BMI calculator for females.",
    intro: "This BMI calculator is designed for women. Body Mass Index provides a quick assessment of whether your weight is in a healthy range. Women naturally have higher body fat percentages than men, so understanding your BMI in context is important. Enter your details below.",
    faqs: [
      { question: "What is a healthy BMI for women?", answer: "A healthy BMI for women is between 18.5 and 24.9, the same as for men, though women naturally carry more body fat." },
      { question: "Does pregnancy affect BMI?", answer: "BMI is not accurate during pregnancy. Use a pregnancy weight gain tracker instead." },
      { question: "Should women aim for the same BMI as men?", answer: "The same BMI categories apply, but women typically have a higher healthy body fat percentage than men." },
      { question: "How does menopause affect BMI?", answer: "Hormonal changes during menopause can lead to weight redistribution, but BMI categories remain the same." },
      { question: "Is BMI accurate for athletic women?", answer: "Athletic women with high muscle mass may have a higher BMI without excess fat. Consider body fat percentage as well." },
    ],
  },
  {
    slug: "bmi-calculator-india",
    baseToolSlug: "bmi-calculator",
    name: "BMI Calculator for Indians",
    h1: "BMI Calculator for Indians",
    audience: "Indian users",
    metaTitle: "BMI Calculator India – Check BMI for Indian Body Type (Free)",
    metaDescription: "BMI calculator for Indian body type. Indians face higher health risks at lower BMI values. Check your BMI with Asian-adjusted ranges. Free & instant.",
    intro: "This BMI calculator is adjusted for Indian and South Asian body types. Research shows that Indians and Asians face higher health risks (diabetes, heart disease) at lower BMI values compared to Western populations. The WHO recommends that Asians consider a BMI of 23+ as overweight and 25+ as obese. Check your BMI below with Indian-adjusted insights.",
    faqs: [
      { question: "Why is BMI different for Indians?", answer: "Indians tend to have higher body fat at lower BMI levels and face greater metabolic risks at lower weights compared to Caucasians." },
      { question: "What BMI is overweight for Indians?", answer: "For Indians and Asians, a BMI of 23-24.9 is considered overweight, and 25+ is obese (vs 25 and 30 for Western standards)." },
      { question: "Is BMI the only health indicator?", answer: "No. Waist circumference, waist-to-hip ratio, and body fat percentage are also important, especially for Indians." },
      { question: "What is the ideal BMI for Indians?", answer: "An ideal BMI for Indians is between 18.5 and 22.9, as health risks increase significantly above 23." },
      { question: "Should I use kg and cm?", answer: "Yes, this calculator uses kg for weight and cm for height, which is standard in India." },
    ],
  },
  // Calorie Calculator Variations
  {
    slug: "calorie-calculator-for-men",
    baseToolSlug: "calorie-calculator",
    name: "Calorie Calculator for Men",
    h1: "Calorie Calculator for Men",
    audience: "men",
    metaTitle: "Calorie Calculator for Men – Daily Calorie Needs (Free)",
    metaDescription: "Calculate daily calorie needs for men based on age, weight, height, and activity level. Free calorie intake calculator for weight loss and muscle gain.",
    intro: "This calorie calculator helps men determine their daily calorie needs based on age, weight, height, and activity level. Whether you're trying to lose weight, build muscle, or maintain your current physique, knowing your calorie requirements is the first step.",
    faqs: [
      { question: "How many calories does an average man need?", answer: "The average adult man needs about 2,000-2,500 calories per day, depending on age, activity level, and metabolism." },
      { question: "How many calories for weight loss in men?", answer: "A deficit of 500-750 calories per day typically results in losing about 0.5-0.75 kg per week." },
      { question: "Do men need more calories than women?", answer: "Generally yes, due to higher muscle mass and typically larger body size." },
      { question: "How many calories for muscle building?", answer: "A surplus of 300-500 calories above maintenance, combined with strength training, supports muscle growth." },
      { question: "Does metabolism slow with age in men?", answer: "Yes, basal metabolic rate decreases about 1-2% per decade after age 20." },
    ],
  },
  {
    slug: "calorie-calculator-for-women",
    baseToolSlug: "calorie-calculator",
    name: "Calorie Calculator for Women",
    h1: "Calorie Calculator for Women",
    audience: "women",
    metaTitle: "Calorie Calculator for Women – Daily Calorie Intake (Free)",
    metaDescription: "Find out how many calories women need daily. Calculate based on age, weight, height, and activity. Free calorie calculator for women.",
    intro: "This calorie calculator is tailored for women. Determine your daily calorie needs based on your age, weight, height, and activity level. Whether you're aiming for weight loss, maintenance, or weight gain, accurate calorie tracking starts here.",
    faqs: [
      { question: "How many calories does an average woman need?", answer: "The average adult woman needs about 1,600-2,000 calories per day, depending on age and activity level." },
      { question: "How many calories for weight loss in women?", answer: "A moderate deficit of 400-600 calories per day is typically safe and effective for women." },
      { question: "Do calories change during pregnancy?", answer: "Yes, pregnant women need about 300-500 extra calories per day in the 2nd and 3rd trimesters." },
      { question: "How does menopause affect calorie needs?", answer: "Metabolism slows during menopause, so calorie needs typically decrease by 200-300 per day." },
      { question: "Should women eat differently when exercising?", answer: "Yes, active women need more calories to fuel workouts and recovery." },
    ],
  },
  {
    slug: "calorie-calculator-india",
    baseToolSlug: "calorie-calculator",
    name: "Calorie Calculator for Indians",
    h1: "Calorie Calculator for Indian Diet",
    audience: "Indian users",
    metaTitle: "Calorie Calculator India – Daily Calorie Needs for Indian Diet",
    metaDescription: "Calculate daily calorie needs for Indian body type and diet. Get accurate calorie requirements considering Indian food habits. Free & instant.",
    intro: "This calorie calculator is designed for Indian users. The Indian diet is rich in carbohydrates from rice, roti, and dal. Understanding your exact calorie needs helps you balance your traditional Indian meals while meeting your health goals.",
    faqs: [
      { question: "How many calories does an Indian adult need?", answer: "ICMR recommends about 2,000-2,400 calories for men and 1,600-2,000 for women, depending on activity." },
      { question: "Are Indian meals high in calories?", answer: "Traditional Indian meals can be calorie-dense due to oil, ghee, and rice. Portion control is key." },
      { question: "How to reduce calories in Indian food?", answer: "Use less oil/ghee, choose whole grains, increase vegetables, and control rice portions." },
      { question: "Is roti or rice better for weight loss?", answer: "Both are similar in calories. Whole wheat roti has more fiber, which helps with satiety." },
      { question: "How many calories in common Indian foods?", answer: "One roti has ~120 cal, a cup of rice ~200 cal, a bowl of dal ~150 cal, and a cup of sabzi ~100-200 cal." },
    ],
  },
  // Ideal Weight Variations
  {
    slug: "ideal-weight-calculator-for-men",
    baseToolSlug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator for Men",
    h1: "Ideal Weight Calculator for Men",
    audience: "men",
    metaTitle: "Ideal Weight Calculator for Men – Check Healthy Weight (Free)",
    metaDescription: "Find the ideal weight for men based on height using the Devine formula. Know your healthy weight range instantly. Free calculator.",
    intro: "Find out the ideal body weight for men based on your height. This calculator uses the Devine formula, the most widely used standard in clinical settings, to estimate a healthy weight range for adult males.",
    faqs: [
      { question: "What is the ideal weight for a 5'10 man?", answer: "According to the Devine formula, the ideal weight for a 5'10 (178 cm) man is approximately 73 kg (161 lbs)." },
      { question: "Does muscle mass affect ideal weight?", answer: "Yes, muscular men may weigh more than the 'ideal' without being unhealthy." },
      { question: "Which formula is most accurate for men?", answer: "The Devine formula is most commonly used, but Robinson and Hamwi formulas are also valid." },
      { question: "How much can ideal weight vary?", answer: "A variation of ±10% from the calculated ideal is generally considered normal." },
      { question: "Should I aim for exact ideal weight?", answer: "The ideal weight is a guide. Focus on overall health, body composition, and fitness level." },
    ],
  },
  {
    slug: "ideal-weight-calculator-for-women",
    baseToolSlug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator for Women",
    h1: "Ideal Weight Calculator for Women",
    audience: "women",
    metaTitle: "Ideal Weight Calculator for Women – Healthy Weight by Height",
    metaDescription: "Calculate ideal weight for women by height using the Devine formula. Find your healthy weight range. Free & instant calculator.",
    intro: "This ideal weight calculator helps women find their healthy weight based on height. Using the Devine formula adapted for females, it provides a baseline weight that's associated with the lowest health risks.",
    faqs: [
      { question: "What is the ideal weight for a 5'4 woman?", answer: "The ideal weight for a 5'4 (163 cm) woman is approximately 55 kg (121 lbs) by the Devine formula." },
      { question: "Does ideal weight change with age?", answer: "The formula doesn't account for age, but body composition changes. A healthy range is more important than an exact number." },
      { question: "Is ideal weight different during pregnancy?", answer: "Yes, weight gain during pregnancy is expected. Use pregnancy-specific guidelines instead." },
      { question: "How does frame size affect ideal weight?", answer: "Women with larger frames may have a higher ideal weight. The calculator gives a baseline estimate." },
      { question: "Should I focus only on weight?", answer: "No, body composition, waist circumference, and overall fitness are equally important indicators." },
    ],
  },
  // Body Fat Variations
  {
    slug: "body-fat-calculator-for-men",
    baseToolSlug: "body-fat-calculator",
    name: "Body Fat Calculator for Men",
    h1: "Body Fat Calculator for Men",
    audience: "men",
    metaTitle: "Body Fat Calculator for Men – Estimate Body Fat % (Free)",
    metaDescription: "Calculate body fat percentage for men using the U.S. Navy method. Know if your body fat is in a healthy range. Free & instant.",
    intro: "This body fat calculator uses the U.S. Navy method to estimate body fat percentage for men. It requires your waist, neck, and height measurements. Knowing your body fat percentage is more useful than BMI for assessing fitness and health.",
    faqs: [
      { question: "What is a healthy body fat for men?", answer: "For men, 10-20% body fat is considered healthy. Athletes may be 6-13%, and essential fat is 2-5%." },
      { question: "How accurate is the Navy method?", answer: "It's within 3-4% of DEXA scan results for most people, making it a good free estimate." },
      { question: "Where should men measure waist?", answer: "Measure at the navel level, keeping the tape horizontal and snug but not compressing skin." },
      { question: "Does body fat increase with age in men?", answer: "Yes, men tend to gain body fat with age, especially around the midsection." },
      { question: "What's better, BMI or body fat%?", answer: "Body fat percentage is more informative as it distinguishes between fat and lean mass." },
    ],
  },
  {
    slug: "body-fat-calculator-for-women",
    baseToolSlug: "body-fat-calculator",
    name: "Body Fat Calculator for Women",
    h1: "Body Fat Calculator for Women",
    audience: "women",
    metaTitle: "Body Fat Calculator for Women – Free Body Fat % Estimator",
    metaDescription: "Estimate body fat percentage for women using the U.S. Navy method. Check if your body fat is healthy. Free online calculator.",
    intro: "Estimate your body fat percentage as a woman using the U.S. Navy method. This calculator requires waist, hip, neck, and height measurements. Women naturally have higher essential body fat than men, so healthy ranges differ.",
    faqs: [
      { question: "What is a healthy body fat for women?", answer: "For women, 20-30% is healthy. Athletes may be 14-20%, and essential fat is 10-13%." },
      { question: "Why do women have higher body fat?", answer: "Women need more essential fat for reproductive health and hormonal function." },
      { question: "How do I measure hip circumference?", answer: "Measure at the widest point of your hips/buttocks with the tape horizontal." },
      { question: "Does body fat change during menopause?", answer: "Yes, hormonal changes during menopause often lead to increased body fat, especially around the abdomen." },
      { question: "Is body fat more important than weight?", answer: "Yes, body fat percentage gives a more complete picture of health than weight alone." },
    ],
  },
  // Water Intake Variations
  {
    slug: "water-intake-calculator-india",
    baseToolSlug: "water-intake-calculator",
    name: "Water Intake Calculator for India",
    h1: "Water Intake Calculator for Indian Climate",
    audience: "Indian users",
    metaTitle: "Water Intake Calculator India – Daily Water Needs for Indian Climate",
    metaDescription: "Calculate daily water intake for Indian climate and lifestyle. Stay hydrated in hot Indian weather. Free water intake calculator.",
    intro: "India's hot and humid climate means you need more water than people in cooler regions. This calculator estimates your daily water needs considering your weight and activity level. Staying hydrated is crucial in Indian summers where temperatures often exceed 40°C.",
    faqs: [
      { question: "How much water should Indians drink daily?", answer: "Most Indian adults need 2.5-4 litres per day, depending on climate, activity, and body weight." },
      { question: "Do I need more water in Indian summer?", answer: "Yes, you may need 30-50% more water during hot months (April-June) to prevent dehydration." },
      { question: "Does chai/coffee count as water intake?", answer: "Partially, but caffeinated drinks have a mild diuretic effect. Plain water is best for hydration." },
      { question: "What about coconut water and buttermilk?", answer: "Both are excellent hydration options popular in India and count toward daily intake." },
      { question: "How to know if I'm dehydrated?", answer: "Dark yellow urine, dry mouth, headache, and fatigue are common signs of dehydration." },
    ],
  },
  // Pregnancy/Ovulation Variations
  {
    slug: "pregnancy-due-date-calculator-india",
    baseToolSlug: "pregnancy-due-date-calculator",
    name: "Pregnancy Due Date Calculator India",
    h1: "Pregnancy Due Date Calculator for Indian Women",
    audience: "Indian women",
    metaTitle: "Pregnancy Due Date Calculator India – Expected Delivery Date (Free)",
    metaDescription: "Calculate your expected delivery date (EDD) using Naegele's rule. Free pregnancy due date calculator for Indian women. Instant results.",
    intro: "Calculate your expected delivery date (EDD) as an Indian woman. This calculator uses Naegele's rule to estimate when your baby will arrive. Understanding your due date helps you plan prenatal care and delivery at Indian hospitals.",
    faqs: [
      { question: "How is pregnancy due date calculated in India?", answer: "Indian doctors use the same Naegele's rule: LMP + 280 days (40 weeks) to estimate the due date." },
      { question: "Which trimester tests are important in India?", answer: "NT scan (11-14 weeks), anomaly scan (18-22 weeks), and growth scan (32-36 weeks) are standard in Indian hospitals." },
      { question: "Is normal delivery common in India?", answer: "India has varying C-section rates. Many hospitals encourage normal delivery when medically appropriate." },
      { question: "When should I register at a hospital?", answer: "Register at your preferred hospital by 8-12 weeks of pregnancy for regular checkups." },
      { question: "What is the cost of delivery in India?", answer: "Costs vary widely: ₹10,000-50,000 in government hospitals, ₹50,000-3,00,000+ in private hospitals." },
    ],
  },
];

export const getVariationBySlug = (slug: string): ToolVariation | undefined =>
  toolVariations.find((v) => v.slug === slug);

export const getAllVariationSlugs = (): string[] =>
  toolVariations.map((v) => v.slug);
