export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "health" | "numerology" | "guide";
  excerpt: string;
  author: string;
  publishedAt: string;
  readTimeMin: number;
  // body is markdown-ish HTML; rendered as plain HTML inside `prose`
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-bmi-correctly",
    title: "How to Calculate BMI Correctly: A Complete 2026 Guide",
    metaTitle: "How to Calculate BMI Correctly – Step-by-Step Guide 2026",
    metaDescription: "Learn the correct way to calculate BMI, understand WHO categories, fix common mistakes, and know when BMI is misleading. Complete guide for adults in India and globally.",
    category: "health",
    excerpt: "Body Mass Index sounds simple, but most people calculate it wrong or misinterpret the result. Here's the correct method, the formula, and what your number really means.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-01",
    readTimeMin: 7,
    body: `
<p>Body Mass Index (BMI) is the world's most widely used screening tool for weight-related health risks. Adopted by the World Health Organization (WHO), the Indian Council of Medical Research (ICMR), and almost every national health agency, BMI is referenced by doctors, insurance companies, fitness trainers, and wellness apps. Yet despite its popularity, surveys consistently show that <strong>most people calculate their BMI incorrectly</strong> — using inches instead of meters, mixing pounds with kilograms, or rounding too aggressively.</p>

<p>This guide walks you through the correct BMI formula, the official categories, where BMI is genuinely useful, and where it falls short. By the end you'll know exactly how to interpret your number — and when to ignore it.</p>

<h2>What is BMI?</h2>
<p>BMI is a single number that estimates whether your weight is healthy for your height. It was invented in the 1830s by Belgian mathematician Adolphe Quetelet (which is why it's sometimes called the Quetelet Index) and adopted as a public-health screening tool in the 1970s. BMI does not measure body fat directly. Instead, it serves as a rough proxy: at the population level, higher BMIs correlate with higher rates of diabetes, heart disease, and certain cancers.</p>

<h2>The BMI Formula</h2>
<p>The metric formula — used worldwide — is:</p>
<p><strong>BMI = weight (kg) ÷ height (m)²</strong></p>
<p>Notice that height is squared, and that height must be in <em>metres</em>, not centimetres. That single conversion error is the most common mistake. If your height is 170 cm, you must convert it to 1.70 m before squaring.</p>
<p>If you prefer imperial units, the formula becomes:</p>
<p><strong>BMI = (weight in lb ÷ height in inches²) × 703</strong></p>

<h2>Worked Example</h2>
<p>Let's calculate the BMI for an adult who is 165 cm tall and weighs 68 kg:</p>
<ol>
  <li>Convert height to metres: 165 ÷ 100 = 1.65 m</li>
  <li>Square the height: 1.65 × 1.65 = 2.7225</li>
  <li>Divide weight by the squared height: 68 ÷ 2.7225 = 24.98</li>
</ol>
<p>BMI = <strong>25.0</strong>. Using the standard WHO scale, this person sits right on the border between Normal Weight and Overweight.</p>

<h2>Standard WHO BMI Categories</h2>
<ul>
  <li><strong>Underweight:</strong> below 18.5</li>
  <li><strong>Normal weight:</strong> 18.5 – 24.9</li>
  <li><strong>Overweight:</strong> 25.0 – 29.9</li>
  <li><strong>Obese (Class I):</strong> 30.0 – 34.9</li>
  <li><strong>Obese (Class II):</strong> 35.0 – 39.9</li>
  <li><strong>Obese (Class III):</strong> 40.0 and above</li>
</ul>

<h2>Asian / Indian BMI Cut-Offs (ICMR)</h2>
<p>People of South Asian descent tend to develop weight-related metabolic problems at lower BMIs than Europeans. The Indian Council of Medical Research and WHO Asia-Pacific guidelines therefore recommend lower thresholds for Indians:</p>
<ul>
  <li>Normal: 18.0 – 22.9</li>
  <li>Overweight: 23.0 – 24.9</li>
  <li>Obese: ≥ 25.0</li>
</ul>
<p>If you're of Indian, Pakistani, Bangladeshi, Sri Lankan, Nepali, or other South Asian heritage, use the Asian cut-offs for a more accurate risk assessment.</p>

<h2>When BMI Is Misleading</h2>
<p>BMI was designed for sedentary adults of average build. It can give a misleading reading for:</p>
<ul>
  <li><strong>Athletes and bodybuilders:</strong> heavy muscle mass inflates BMI without indicating fat.</li>
  <li><strong>Elderly people:</strong> sarcopenia (muscle loss) can mask high body fat at a "normal" BMI.</li>
  <li><strong>Pregnant or breastfeeding women.</strong></li>
  <li><strong>Children and teens:</strong> use age-and-sex-specific BMI percentile charts instead.</li>
  <li><strong>People under 5 ft or over 6 ft 5 in:</strong> the squared-height formula slightly under- or over-estimates.</li>
</ul>

<h2>Better Together: BMI + Waist Circumference</h2>
<p>Researchers now recommend pairing BMI with <strong>waist circumference</strong> or waist-to-height ratio. Excess abdominal fat is a far stronger predictor of metabolic disease than BMI alone. As a rule of thumb, your waist should be less than half your height. For Indian men, a waist over 90 cm and for Indian women over 80 cm signals elevated cardiometabolic risk regardless of BMI.</p>

<h2>How to Improve a High BMI Safely</h2>
<p>If your BMI is in the overweight or obese range, the goal is gradual fat loss while preserving muscle. The Centers for Disease Control and Prevention recommends losing 0.5–1 kg per week through a 500-calorie daily deficit, regular strength training, 150 minutes per week of moderate cardio, and 7–9 hours of sleep. Crash diets backfire, slow your metabolism, and almost always lead to weight regain.</p>

<h2>Use Our Free BMI Calculator</h2>
<p>Skip the manual maths and get instant results with our <a href="/tool/bmi-calculator">BMI Calculator</a>. Enter your height and weight, choose your unit system, and see your BMI plus the appropriate category for your demographic. Pair it with our <a href="/tool/ideal-weight-calculator">Ideal Weight Calculator</a> and <a href="/tool/calorie-calculator">Calorie Calculator</a> to build a complete weight-management plan.</p>

<h2>Final Word</h2>
<p>BMI is a starting point, not a verdict. It is fast, free, and widely understood, but it cannot replace a body-composition analysis or a conversation with your doctor. Use it as one signal among many — alongside waist size, blood pressure, blood sugar, and how you feel — and you'll get genuine value out of this 200-year-old number.</p>
`,
  },
  {
    slug: "understanding-life-path-numbers",
    title: "Understanding Life Path Numbers: The Foundation of Numerology",
    metaTitle: "Life Path Number Meaning – Complete Numerology Guide 2026",
    metaDescription: "Discover what your life path number reveals about personality, career, and relationships. Learn how to calculate it from your date of birth with examples.",
    category: "numerology",
    excerpt: "Your Life Path Number is the most important number in your numerology chart. Here's how to calculate it and what each number 1 through 9 (plus master numbers) really means.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-02",
    readTimeMin: 8,
    body: `
<p>If numerology has a single starting point, it is the <strong>Life Path Number</strong>. Calculated from your full date of birth, this single digit (or master number 11, 22, 33) acts as the spine of every numerology reading. Astrologers compare it to the Sun sign in Vedic or Western astrology — a constant that colours every other influence in your chart.</p>

<h2>How to Calculate Your Life Path Number</h2>
<p>Add every digit of your full birth date and reduce until you reach a single digit, unless you land on 11, 22, or 33 (the master numbers, which are not reduced).</p>
<p>Example: someone born on 15 August 1992</p>
<ul>
  <li>Day: 1 + 5 = 6</li>
  <li>Month: 0 + 8 = 8</li>
  <li>Year: 1 + 9 + 9 + 2 = 21 → 2 + 1 = 3</li>
  <li>Total: 6 + 8 + 3 = 17 → 1 + 7 = <strong>8</strong></li>
</ul>
<p>Their Life Path Number is 8 — the number of authority, ambition, and material success.</p>

<h2>Meaning of Each Life Path Number</h2>
<p><strong>1 — The Leader.</strong> Independent, pioneering, ambitious. Born to start things; struggles with cooperation.</p>
<p><strong>2 — The Diplomat.</strong> Sensitive, intuitive, harmonious. Excels in partnership; can be indecisive.</p>
<p><strong>3 — The Communicator.</strong> Creative, expressive, sociable. Shines in writing, art, and entertainment.</p>
<p><strong>4 — The Builder.</strong> Disciplined, practical, reliable. Excellent at systems and long-term planning.</p>
<p><strong>5 — The Adventurer.</strong> Curious, freedom-loving, versatile. Thrives on change; dislikes routine.</p>
<p><strong>6 — The Nurturer.</strong> Responsible, caring, family-oriented. The natural counsellor and homemaker.</p>
<p><strong>7 — The Seeker.</strong> Analytical, spiritual, introspective. Drawn to research, philosophy, mysticism.</p>
<p><strong>8 — The Achiever.</strong> Powerful, business-minded, materially driven. Capable of great wealth and influence.</p>
<p><strong>9 — The Humanitarian.</strong> Compassionate, idealistic, artistic. Lives to serve causes larger than themselves.</p>
<p><strong>11 — The Inspired.</strong> Master Intuitive. Spiritual messenger, highly sensitive, prone to anxiety.</p>
<p><strong>22 — The Master Builder.</strong> Capable of turning grand visions into physical reality.</p>
<p><strong>33 — The Master Teacher.</strong> Selfless servant of humanity; rare and demanding path.</p>

<h2>Life Path and Career</h2>
<p>Your number hints at the work environment in which you will thrive. 1s lead start-ups; 2s mediate; 3s create; 4s engineer; 5s travel and sell; 6s heal and teach; 7s research; 8s manage and invest; 9s serve. Use the number as a compass, not a cage.</p>

<h2>Life Path and Relationships</h2>
<p>Some numbers harmonise naturally — 1 with 5, 2 with 6, 3 with 9, 4 with 8 — while others require extra work. The point of compatibility analysis is awareness, not avoidance. Two well-aware people of any combination can build a healthy relationship.</p>

<h2>Common Mistakes</h2>
<p>The biggest mistake is reducing the year before adding it to the day and month. The correct order is to add every digit of the full date and only then reduce. Stopping too early at 11, 22, or 33 in the intermediate sums is fine — recognise master numbers wherever they appear.</p>

<h2>Try Our Calculator</h2>
<p>Skip the maths with our <a href="/tool/life-path-number-calculator">Life Path Number Calculator</a>. Enter your date of birth and get an instant reading. Combine it with the <a href="/tool/destiny-number-calculator">Destiny Number Calculator</a> and <a href="/tool/name-numerology-calculator">Name Numerology Calculator</a> for a complete chart.</p>

<h2>Final Thoughts</h2>
<p>The Life Path Number is a self-awareness tool, not a fortune teller. Treat it as a mirror — a way to recognise your patterns, strengths, and blind spots. The more honestly you read it, the more useful it becomes.</p>
`,
  },
  {
    slug: "calorie-deficit-guide-india",
    title: "Calorie Deficit Guide: How to Lose Weight Safely in India",
    metaTitle: "Calorie Deficit Guide India – Safe Weight Loss in 2026",
    metaDescription: "Step-by-step calorie deficit guide for Indians. Learn how to calculate your TDEE, set the right deficit, and lose 0.5–1 kg per week safely without crash dieting.",
    category: "health",
    excerpt: "A calorie deficit is the only proven way to lose body fat. Here's how to calculate yours, build a balanced Indian diet plan, and avoid the metabolic mistakes that ruin most attempts.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-03",
    readTimeMin: 8,
    body: `
<p>Despite what the supplement industry would have you believe, sustainable fat loss comes down to one principle: <strong>burn more calories than you eat</strong>. This is the calorie deficit. Get it right and the kilos come off; get it wrong and you spend months exhausted, hungry, and stuck. This guide explains how to calculate your deficit, structure a typical Indian diet around it, and side-step the most common pitfalls.</p>

<h2>Step 1 — Calculate Your TDEE</h2>
<p>Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is the total number of calories your body burns in 24 hours. It is the sum of your Basal Metabolic Rate (BMR) and the calories spent on movement, digestion, and exercise. Use the Mifflin-St Jeor equation:</p>
<ul>
  <li>Men: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5</li>
  <li>Women: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age − 161</li>
</ul>
<p>Then multiply BMR by an activity factor: 1.2 (sedentary), 1.375 (lightly active), 1.55 (moderate), 1.725 (very active), 1.9 (athlete). Or skip the maths entirely with our <a href="/tool/calorie-calculator">Calorie Calculator</a>.</p>

<h2>Step 2 — Set Your Deficit</h2>
<p>For sustainable fat loss, aim for a deficit of <strong>500 calories per day</strong>. That equals roughly 0.5 kg lost per week — a pace that protects muscle, energy, and sanity. A 1,000-calorie deficit (1 kg/week) is acceptable for people with a lot of weight to lose; anything more is counter-productive.</p>

<h2>Step 3 — Build the Plate (Indian Edition)</h2>
<p>Calorie quality matters as much as quantity. Structure each meal around:</p>
<ul>
  <li><strong>Protein (25–30 g per meal):</strong> dal, paneer, eggs, chicken, fish, soy chunks, Greek yogurt.</li>
  <li><strong>Complex carbs:</strong> bajra/jowar/ragi roti, brown rice, oats, sweet potato — not maida.</li>
  <li><strong>Fibre and micronutrients:</strong> at least one large portion of sabzi or salad per meal.</li>
  <li><strong>Healthy fats:</strong> ghee, mustard oil, almonds, walnuts — measured, not free-poured.</li>
</ul>

<h2>Step 4 — Track for the First 4 Weeks</h2>
<p>Most people underestimate calorie intake by 30–40%. For the first month, weigh portions and log everything in an app such as HealthifyMe or MyFitnessPal. After a month you'll have a calibrated eye and can switch to portion control without weighing.</p>

<h2>Step 5 — Lift Weights</h2>
<p>Cardio burns calories during the workout; resistance training burns them for 24–48 hours afterwards and protects muscle while you diet. Three full-body strength sessions per week are enough.</p>

<h2>Common Mistakes</h2>
<ul>
  <li><strong>Crash diets:</strong> below 1,200 kcal (women) or 1,500 kcal (men) destroys muscle and metabolism.</li>
  <li><strong>Liquid calories:</strong> sweet chai, lassi, and juices add 300–500 kcal silently.</li>
  <li><strong>Cheat days:</strong> a single 3,000-calorie binge wipes out a week of careful deficits.</li>
  <li><strong>No protein:</strong> the average Indian eats only 0.6 g/kg of protein. Aim for 1.2–1.6 g/kg during fat loss.</li>
</ul>

<h2>Plateaus</h2>
<p>If weight loss stalls for more than two weeks, recalculate your TDEE — your maintenance level drops as you get lighter. Either reduce intake by another 100–150 kcal or add 1,000 extra steps per day.</p>

<h2>Tools to Help</h2>
<p>Use the <a href="/tool/bmi-calculator">BMI Calculator</a> and <a href="/tool/body-fat-calculator">Body Fat Calculator</a> to track progress beyond just the scale, and the <a href="/tool/water-intake-calculator">Water Intake Calculator</a> to stay hydrated — dehydration is often mistaken for hunger.</p>
`,
  },
  {
    slug: "how-to-choose-lucky-baby-name",
    title: "How to Choose a Lucky Baby Name Using Numerology",
    metaTitle: "Lucky Baby Name Numerology – Complete Indian Guide 2026",
    metaDescription: "Step-by-step guide to choosing a lucky baby name using numerology. Combines Indian Namkaran traditions with the Pythagorean number system for the perfect name.",
    category: "numerology",
    excerpt: "Choosing a baby's name is one of the most meaningful decisions parents make. Here's how to combine numerology with Indian Namkaran traditions to pick a name that supports your child's life journey.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-04",
    readTimeMin: 7,
    body: `
<p>In India, naming a child is a sacred ritual — <em>Namkaran Sanskar</em>. Traditionally the name is chosen to begin with a specific syllable based on the child's birth nakshatra. Modern parents increasingly add a second filter: <strong>numerology</strong>. A name whose numerical vibration aligns with the baby's Life Path Number is believed to bring fortune, harmony, and ease through life.</p>

<h2>Why Combine Numerology with Tradition</h2>
<p>The nakshatra-based syllable narrows your search to perhaps 30–50 names. Numerology then ranks those names by their compatibility with the child's date of birth. You honour both the spiritual and the mathematical traditions of Indian naming.</p>

<h2>Step 1 — Calculate the Baby's Life Path Number</h2>
<p>Add all the digits of the full date of birth and reduce to a single digit (or master number). For example, a baby born on 12 March 2026: 1+2+0+3+2+0+2+6 = 16 → 1+6 = <strong>7</strong>. This is the Life Path Number.</p>

<h2>Step 2 — List Candidate Names</h2>
<p>Start with the syllable suggested by the priest or astrologer based on the baby's nakshatra. List 5–10 candidate names that begin with this syllable.</p>

<h2>Step 3 — Calculate the Name Number</h2>
<p>Use the Pythagorean chart (A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, then J=1 and so on). Sum the digits of every letter and reduce to a single digit. Example for "AARAV": A=1, A=1, R=9, A=1, V=4 → total 16 → 1+6 = <strong>7</strong>.</p>

<h2>Step 4 — Match Name Number to Life Path</h2>
<p>The most harmonious choice is a name whose number equals the Life Path Number — or one of its compatible numbers. General compatibility groups:</p>
<ul>
  <li>1, 5, 7 — fire & intellect</li>
  <li>2, 4, 8 — structure & material success</li>
  <li>3, 6, 9 — creativity & service</li>
</ul>

<h2>Step 5 — Check the Destiny / Expression Number</h2>
<p>Add the first name and surname together. The combined Expression Number should ideally fall in a friendly group with the child's Life Path. If it lands on a known "challenging" number for that path (for example, name number 4 for a Life Path 5 child who craves freedom), reconsider the spelling or pick another name.</p>

<h2>Step 6 — Pronounceability and Meaning</h2>
<p>The name will be spoken thousands of times. After numerological screening, choose the option that flows easily, has a beautiful meaning in Sanskrit / regional language, and doesn't get mispronounced internationally if your family lives abroad.</p>

<h2>Use Our Calculators</h2>
<p>Run candidate names through the <a href="/tool/baby-name-numerology">Baby Name Numerology Calculator</a> and verify against the <a href="/tool/life-path-number-calculator">Life Path Number Calculator</a> in seconds. For wedded couples planning multiple children, the <a href="/tool/marriage-compatibility-calculator">Marriage Compatibility Calculator</a> can also indicate harmonious family number patterns.</p>

<h2>Final Word</h2>
<p>A "lucky" name doesn't replace good parenting, education, or values — but it adds a quiet layer of harmony that millions of Indian families have trusted for generations. Take your time, consult elders, and pick a name that feels right both spiritually and numerically.</p>
`,
  },
  {
    slug: "mobile-number-numerology-guide",
    title: "Mobile Number Numerology: Is Your Phone Number Lucky?",
    metaTitle: "Mobile Number Numerology – Check If Your Number Is Lucky 2026",
    metaDescription: "Learn how to check if your mobile number is lucky using numerology. Step-by-step guide for Jio, Airtel, Vi users in India to choose the perfect phone number.",
    category: "numerology",
    excerpt: "Your mobile number is the digit string you interact with most. Here's how to score yours numerologically and what to look for when buying a new SIM.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-05",
    readTimeMin: 6,
    body: `
<p>You dial it, share it, and see it dozens of times a day. According to Indian numerology, the constant exposure to your <strong>mobile number's vibration</strong> can subtly influence your wealth, relationships, and luck. That's why many entrepreneurs in Mumbai and Delhi pay premium prices for so-called "VIP numbers" from Jio, Airtel, and Vi.</p>

<h2>How to Calculate Your Mobile Number's Single Digit</h2>
<p>Add every digit of your 10-digit mobile number, then keep reducing until you reach a single digit. For example, 9876543210 → 9+8+7+6+5+4+3+2+1+0 = 45 → 4+5 = <strong>9</strong>.</p>

<h2>Meaning of Each Digit</h2>
<ul>
  <li><strong>1 — Leadership.</strong> Great for entrepreneurs, founders, and self-made professionals.</li>
  <li><strong>2 — Partnership.</strong> Suits diplomats, counsellors, real-estate agents.</li>
  <li><strong>3 — Communication.</strong> Excellent for content creators, teachers, sales.</li>
  <li><strong>4 — Stability.</strong> Caution: 4 is considered slow-energy in many Indian schools.</li>
  <li><strong>5 — Movement.</strong> Ideal for travel, sales, and import-export businesses.</li>
  <li><strong>6 — Beauty & love.</strong> Great for designers, doctors, and family-oriented people.</li>
  <li><strong>7 — Spirituality.</strong> Suits researchers, healers, scholars; mixed for business.</li>
  <li><strong>8 — Wealth.</strong> Highly favoured by traders and investors but karmically heavy.</li>
  <li><strong>9 — Achievement.</strong> A universally lucky and humanitarian number.</li>
</ul>

<h2>Beyond the Single Digit</h2>
<p>Advanced practitioners look at:</p>
<ul>
  <li><strong>Last four digits:</strong> these matter most because you say them aloud often.</li>
  <li><strong>Repeating patterns</strong> like 786, 108, 9999 are considered auspicious in different traditions.</li>
  <li><strong>Forbidden combinations</strong> like 28, 17, 26 (mixing 8 with weak supporting numbers) are usually avoided.</li>
</ul>

<h2>What If Your Current Number Is "Bad"?</h2>
<p>Before you rush to portability, consider that no single number can override consistent action. If you still want to change, look for a SIM whose digits sum to 1, 5, 6, or 9 — generally lucky combinations — and that doesn't include challenging pairs like 4-8 next to each other.</p>

<h2>Quick Check</h2>
<p>Use our <a href="/tool/mobile-number-numerology">Mobile Number Numerology Calculator</a> to instantly score any phone number. For a complete personal profile, also try the <a href="/tool/life-path-number-calculator">Life Path Number Calculator</a> and <a href="/tool/name-numerology-calculator">Name Numerology Calculator</a>.</p>
`,
  },
  {
    slug: "bmr-tdee-explained",
    title: "BMR vs TDEE: The Two Numbers That Decide Your Weight",
    metaTitle: "BMR vs TDEE Explained – Calculate Your Maintenance Calories 2026",
    metaDescription: "Understand the difference between BMR and TDEE, learn the Mifflin-St Jeor formula, and discover how to use both numbers to lose, gain, or maintain weight.",
    category: "health",
    excerpt: "Confused by BMR, TDEE, RMR, and AMR? This guide demystifies metabolic calculations and shows you which number to actually use for fat loss or muscle gain.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-06",
    readTimeMin: 6,
    body: `
<p>Walk into any gym in India and you'll hear trainers throw around acronyms — BMR, TDEE, RMR, AMR. They sound technical but boil down to two practical numbers: how many calories your body burns at rest, and how many it burns over a full day. Get these right and you can predict, with surprising accuracy, exactly what your body will do on any given diet.</p>

<h2>BMR — Basal Metabolic Rate</h2>
<p>BMR is the energy your body uses simply to stay alive — keeping the heart pumping, lungs breathing, brain firing, organs functioning. It accounts for 60–70% of your daily calorie burn. BMR is measured under strict laboratory conditions: complete rest, post-absorptive state, neutral temperature.</p>
<p>The most accurate population formula is <strong>Mifflin-St Jeor (1990)</strong>:</p>
<ul>
  <li>Men: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5</li>
  <li>Women: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age − 161</li>
</ul>

<h2>TDEE — Total Daily Energy Expenditure</h2>
<p>TDEE = BMR × Activity Multiplier. It represents what you actually burn including walking, working, exercising, and digesting food. Activity multipliers:</p>
<ul>
  <li>1.2 — desk job, no exercise</li>
  <li>1.375 — light activity 1–3 days/week</li>
  <li>1.55 — moderate activity 3–5 days/week</li>
  <li>1.725 — hard activity 6–7 days/week</li>
  <li>1.9 — physical job + daily training</li>
</ul>

<h2>Which Number Should You Eat?</h2>
<p><strong>To maintain weight:</strong> eat at TDEE.<br/>
<strong>To lose fat:</strong> eat 300–500 below TDEE.<br/>
<strong>To gain muscle:</strong> eat 200–400 above TDEE with a strength-training programme.<br/>
<strong>Never</strong> eat below your BMR for an extended period — it's the metabolic equivalent of unplugging your phone overnight.</p>

<h2>Why Your Calculator Result Isn't Magic</h2>
<p>Formulas estimate BMR with about ±10% accuracy. Two people of the same age, height, and weight can have BMRs that differ by 200 calories due to genetics, muscle mass, hormones, and gut microbiome. Use the calculated number as a starting point, track scale weight for two weeks, and adjust calories up or down based on results.</p>

<h2>Common Mistakes</h2>
<ul>
  <li>Picking an activity multiplier that's too high — most people overestimate.</li>
  <li>Forgetting to recalculate after losing 5 kg or more.</li>
  <li>Eating exercise calories back twice (already counted in the multiplier).</li>
</ul>

<h2>Calculate Yours</h2>
<p>Get your numbers in seconds with the <a href="/tool/bmr-calculator">BMR Calculator</a> and <a href="/tool/calorie-calculator">Calorie Calculator</a>. Combine with the <a href="/tool/ideal-weight-calculator">Ideal Weight Calculator</a> for goal-setting.</p>
`,
  },
  {
    slug: "pregnancy-due-date-explained",
    title: "How Pregnancy Due Date Calculators Work: Naegele's Rule Explained",
    metaTitle: "Pregnancy Due Date Calculator – Naegele's Rule Explained 2026",
    metaDescription: "Learn how pregnancy due date calculators work using Naegele's rule. Understand LMP, conception date, and why only 4% of babies arrive on the due date.",
    category: "health",
    excerpt: "The 'due date' your obstetrician quotes is calculated from a 200-year-old formula. Here's how it works, why it's accurate to ± 2 weeks, and how to track your pregnancy timeline.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-07",
    readTimeMin: 6,
    body: `
<p>Discovering you're pregnant prompts the immediate question: "When is the baby due?" Around the world, obstetricians answer using a remarkably simple, two-century-old formula known as <strong>Naegele's Rule</strong>.</p>

<h2>Naegele's Rule</h2>
<p>Estimated Due Date (EDD) = First day of Last Menstrual Period (LMP) + 280 days (40 weeks).</p>
<p>Or, the popular shortcut: <em>LMP + 1 year − 3 months + 7 days.</em></p>
<p>The formula assumes a regular 28-day cycle with ovulation on day 14. For women with longer or shorter cycles, an adjustment of ± a few days improves accuracy.</p>

<h2>Why 40 Weeks?</h2>
<p>Although a true gestation lasts about 38 weeks from conception, doctors count from LMP because most women remember their period date but not the exact day of ovulation. Adding two extra weeks at the start gives the familiar 40-week pregnancy.</p>

<h2>Trimesters</h2>
<ul>
  <li><strong>First trimester:</strong> weeks 1–13 — organ formation</li>
  <li><strong>Second trimester:</strong> weeks 14–27 — rapid growth, anomaly scan</li>
  <li><strong>Third trimester:</strong> weeks 28–40 — final maturation</li>
</ul>

<h2>How Accurate Is the Due Date?</h2>
<p>Only about 4% of babies actually arrive on their EDD. Around 80% are born within two weeks of it. The most accurate dating happens during the first-trimester ultrasound (weeks 6–9), which can adjust the EDD if the baby's measurements differ from the LMP estimate.</p>

<h2>Why It Matters</h2>
<p>The due date drives every prenatal milestone — first scan, NT scan, anomaly scan, glucose tolerance test, growth scans, and decisions about induction. Knowing it precisely also helps you plan maternity leave under the Maternity Benefit Act (26 weeks paid leave for Indian women).</p>

<h2>Calculate Yours</h2>
<p>Use our free <a href="/tool/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</a> for an instant estimate. Pair it with the <a href="/tool/ovulation-calculator">Ovulation Calculator</a> if you're trying to conceive, and track your hydration with the <a href="/tool/water-intake-calculator">Water Intake Calculator</a> — pregnant women need an extra 300 ml of water per day.</p>
`,
  },
  {
    slug: "marriage-compatibility-numerology",
    title: "Numerology Marriage Compatibility: Beyond the Kundli",
    metaTitle: "Marriage Compatibility Numerology – Free Guide 2026",
    metaDescription: "Discover how numerology assesses marriage compatibility. Step-by-step method using life path numbers, with examples and pitfalls to avoid.",
    category: "numerology",
    excerpt: "Indian families have used Kundli matching for centuries. Numerology adds a complementary lens — quick, mathematical, and surprisingly insightful.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-08",
    readTimeMin: 6,
    body: `
<p>Arranged or love marriage, traditional or modern, the question is universal: will we be compatible? Vedic <strong>Kundli matching (Guna Milan)</strong> is the gold-standard test in India, but increasingly couples and parents add a second, faster test: <strong>numerology compatibility</strong>.</p>

<h2>The Basic Method</h2>
<p>Calculate the Life Path Number of both partners, then check whether the two numbers belong to harmonious groups.</p>
<p><strong>Friendly groups:</strong></p>
<ul>
  <li>1, 5, 7 — intellect, freedom, leadership</li>
  <li>2, 4, 8 — stability, structure, material success</li>
  <li>3, 6, 9 — creativity, love, service</li>
</ul>
<p>Pairings within the same group flow naturally. Pairings across groups can succeed but require conscious effort.</p>

<h2>The Best Pairings</h2>
<ul>
  <li><strong>1 + 5</strong> — adventurous and bold</li>
  <li><strong>2 + 6</strong> — nurturing and harmonious</li>
  <li><strong>3 + 9</strong> — creative and giving</li>
  <li><strong>4 + 8</strong> — disciplined and ambitious</li>
  <li><strong>7 + 7</strong> — deeply spiritual</li>
</ul>

<h2>The Challenging Pairings</h2>
<p>Numbers 4 and 5, or 2 and 8, often clash — one craves stability, the other freedom. These marriages aren't doomed; they simply need clear communication and mutual respect for difference.</p>

<h2>Beyond Life Path</h2>
<p>Advanced compatibility looks at the Destiny Number (from full birth name), the Birth Day Number, and the year of marriage's Personal Year for both partners. A wedding date scheduled in a Personal Year 6 (love and family) for both partners is considered especially auspicious.</p>

<h2>What Numerology Cannot Predict</h2>
<p>Compatibility numbers indicate ease, not destiny. A "perfect" 4+8 pair can divorce, and a "challenging" 4+5 pair can be wildly happy. Numerology highlights tendencies; the relationship is built by daily choices.</p>

<h2>Try Our Calculators</h2>
<p>Run a quick check with the <a href="/tool/marriage-compatibility-calculator">Marriage Compatibility Calculator</a>. Then explore each partner's <a href="/tool/life-path-number-calculator">Life Path</a>, <a href="/tool/destiny-number-calculator">Destiny Number</a>, and <a href="/tool/personal-year-number-calculator">Personal Year</a> for the full picture.</p>
`,
  },
  {
    slug: "water-intake-guide",
    title: "How Much Water Should You Drink? A Science-Based Guide",
    metaTitle: "Daily Water Intake – How Much Water Should You Drink in 2026",
    metaDescription: "Forget the 8-glasses-a-day myth. Learn how much water you actually need based on body weight, climate (especially in India), and activity level.",
    category: "health",
    excerpt: "The famous 8 glasses a day is a myth. Here's how to calculate your real water need based on body weight, activity, and the Indian climate.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-09",
    readTimeMin: 5,
    body: `
<p>"Drink 8 glasses a day" is one of the most repeated — and most inaccurate — pieces of health advice. The truth is that water needs vary dramatically based on your body weight, climate, and activity level. For someone living in Chennai during May, "8 glasses" can be dangerously low.</p>

<h2>The Body-Weight Formula</h2>
<p>The most widely accepted starting point is <strong>30–35 ml per kg of body weight</strong>. A 70 kg adult needs roughly 2.1–2.5 litres per day from all fluid sources — water, milk, chai, soup, and high-water fruits.</p>

<h2>Adjust for Climate</h2>
<p>For every 10°C above 25°C, add an extra 250–500 ml. During Indian summer (40°C+), most adults need 3–4 litres per day. Air-conditioning also dehydrates because it removes humidity.</p>

<h2>Adjust for Activity</h2>
<p>Add 350–700 ml for every hour of moderate exercise, more in extreme heat. If your urine is dark yellow, you're already dehydrated — aim for pale-straw colour.</p>

<h2>Pregnancy & Lactation</h2>
<p>Pregnant women need an extra 300 ml; breastfeeding mothers an extra 700 ml.</p>

<h2>Can You Drink Too Much?</h2>
<p>Yes — hyponatraemia (low blood sodium) can occur from drinking 4+ litres in an hour, but is rare in normal life. The kidneys can excrete about 800 ml/hour.</p>

<h2>Easy Tracking</h2>
<p>Use our <a href="/tool/water-intake-calculator">Water Intake Calculator</a> to get a personalised daily target. For complete health monitoring, combine it with our <a href="/tool/bmi-calculator">BMI Calculator</a> and <a href="/tool/calorie-calculator">Calorie Calculator</a>.</p>
`,
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);
export const getRelatedPosts = (currentSlug: string, category: string, limit = 3) =>
  blogPosts.filter(p => p.slug !== currentSlug && p.category === category).slice(0, limit);
