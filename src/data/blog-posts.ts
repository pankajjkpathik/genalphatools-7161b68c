export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "marketing" | "finance" | "data" | "guide";
  excerpt: string;
  author: string;
  publishedAt: string;
  readTimeMin: number;
  body: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-marketing-roi",
    title: "How to Calculate Marketing ROI (With Real Campaign Examples)",
    metaTitle: "How to Calculate Marketing ROI – Formula, Examples & Benchmarks 2026",
    metaDescription: "Learn the correct marketing ROI formula, common mistakes, and US benchmarks across paid, content, and email channels. With worked examples for 2026.",
    category: "marketing",
    excerpt: "Most marketers calculate ROI wrong by ignoring fully-loaded costs. Here's the right formula, US benchmarks, and how to defend your number in front of finance.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-20",
    readTimeMin: 8,
    body: `
<p>Marketing ROI is the single most-cited number in any marketing review — and one of the most miscalculated. Surveys from Gartner and the CMO Council consistently find that fewer than 30% of US marketing teams calculate ROI in a way their CFO would accept. The math itself is simple. The discipline is in deciding what counts as "cost" and what counts as "return."</p>

<h2>The Marketing ROI Formula</h2>
<p><strong>ROI (%) = ((Revenue from Campaign − Cost of Campaign) ÷ Cost of Campaign) × 100</strong></p>
<p>If a paid search campaign generates $48,000 in attributable revenue and costs $12,000 (ad spend + agency + tooling), ROI = (48,000 − 12,000) ÷ 12,000 × 100 = <strong>300%</strong>.</p>
<p>You can run any campaign through our <a href="/tool/roi-calculator">ROI Calculator</a> in seconds.</p>

<h2>Use ROAS for Ad Spend, ROI for Programs</h2>
<p>ROAS (Return on Ad Spend) divides revenue by ad cost only. ROI divides profit by total cost. Use ROAS when you're optimizing a single ad set; use ROI when you're defending a quarterly budget.</p>

<h2>The Three Mistakes That Inflate ROI</h2>
<ol>
  <li><strong>Ignoring fully-loaded costs.</strong> Add salaries, contractor fees, software, creative production, and agency retainers — not just media spend.</li>
  <li><strong>Counting top-line revenue instead of gross profit.</strong> A 300% ROI on a 20% margin product is a 60% return — barely above your cost of capital.</li>
  <li><strong>Last-click attribution.</strong> Last-click overcredits paid search and undercredits brand, content, and email. Move to a data-driven or position-based model.</li>
</ol>

<h2>2026 US Marketing ROI Benchmarks</h2>
<ul>
  <li><strong>Email marketing:</strong> 3,500–4,200% (highest channel, low cost base)</li>
  <li><strong>SEO / organic content:</strong> 600–1,200% over a 12-month window</li>
  <li><strong>Paid search (Google):</strong> 200–400% for B2C, 150–300% for B2B</li>
  <li><strong>Paid social (Meta, TikTok):</strong> 150–280% for DTC brands</li>
  <li><strong>Display & programmatic:</strong> 80–180%</li>
</ul>

<h2>Pair ROI With CAC and LTV</h2>
<p>ROI alone doesn't tell you whether a campaign is sustainable. A high-ROI campaign that only attracts one-time buyers will lose to a slightly lower-ROI campaign that brings in repeat customers. Always look at the trio: ROI, <a href="/tool/cac-calculator">CAC</a>, and <a href="/tool/ltv-calculator">LTV</a>. The healthiest US SaaS and DTC companies maintain LTV:CAC ratios above 3:1.</p>

<h2>Worked Example</h2>
<p>A US Shopify brand spends $80,000 in Q1: $50k Meta ads, $15k creative, $10k team time, $5k tooling. Revenue attributed (data-driven model): $260,000. Gross margin: 55%.</p>
<ul>
  <li>Gross profit: 260,000 × 0.55 = $143,000</li>
  <li>ROI: (143,000 − 80,000) ÷ 80,000 × 100 = <strong>78.75%</strong></li>
</ul>
<p>The "300% ROAS" headline becomes a much more honest 79% margin-adjusted ROI — still strong, but a number finance will trust.</p>

<h2>FAQs</h2>
<p><strong>Is a 100% marketing ROI good?</strong> For paid acquisition, yes — you've doubled your money. For email or SEO, it's underperforming the benchmark.</p>
<p><strong>How long should I measure ROI over?</strong> Match the buying cycle. SaaS and B2B: 12–18 months. DTC: 30–90 days.</p>
<p><strong>Should I include brand spend?</strong> Yes, but split it out. Brand ROI compounds over years and shouldn't be judged on a single quarter.</p>
`,
  },
  {
    slug: "cac-vs-ltv-the-ratio-that-matters",
    title: "CAC vs LTV: The Single Ratio That Decides If Your Business Scales",
    metaTitle: "CAC vs LTV Ratio Explained – Benchmarks, Formula & SaaS Examples",
    metaDescription: "What LTV:CAC ratio means, how to calculate it, healthy benchmarks for SaaS and DTC, and how to fix a broken ratio. With formulas and US examples.",
    category: "marketing",
    excerpt: "If your LTV:CAC ratio is below 3:1, you're buying customers at a loss. Here's how to calculate both numbers correctly and what to do when the ratio breaks.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-18",
    readTimeMin: 7,
    body: `
<p>Investors don't ask about your revenue growth first. They ask about your <strong>LTV:CAC ratio</strong>. It's the cleanest single signal that a business model works — that the money you spend acquiring customers comes back to you many times over.</p>

<h2>The Two Numbers</h2>
<p><strong>CAC (Customer Acquisition Cost)</strong> = Total sales & marketing spend ÷ New customers acquired. Run yours in our <a href="/tool/cac-calculator">CAC Calculator</a>.</p>
<p><strong>LTV (Customer Lifetime Value)</strong> = Average revenue per customer × Gross margin × Average customer lifetime (in months or years). Use our <a href="/tool/ltv-calculator">LTV Calculator</a>.</p>

<h2>The Ratio Benchmarks</h2>
<ul>
  <li><strong>Below 1:1</strong> — You lose money on every customer. Stop scaling.</li>
  <li><strong>1:1 to 3:1</strong> — Underwater. Improve retention or cut acquisition cost before raising.</li>
  <li><strong>3:1</strong> — The healthy floor. Most US SaaS investors look for at least this.</li>
  <li><strong>3:1 to 5:1</strong> — Strong. You can confidently increase paid acquisition.</li>
  <li><strong>Above 5:1</strong> — You're underinvesting in growth. Spend more.</li>
</ul>

<h2>Why CAC Payback Matters Too</h2>
<p>A great LTV:CAC of 5:1 still kills you if it takes 36 months to pay back. Track <strong>CAC payback period</strong> = CAC ÷ (Monthly ARPU × Gross margin). Best-in-class SaaS recovers CAC in under 12 months.</p>

<h2>Common Calculation Mistakes</h2>
<ol>
  <li><strong>Forgetting gross margin in LTV.</strong> $100/mo revenue at 70% margin is $70/mo of value, not $100.</li>
  <li><strong>Using paid CAC instead of blended.</strong> Blended CAC includes organic too, hiding how expensive paid actually is. Track both.</li>
  <li><strong>Assuming infinite lifetime.</strong> Cap your model at 36–60 months unless you have churn data proving longer retention.</li>
  <li><strong>Ignoring sales team costs.</strong> Account executive salaries belong in CAC.</li>
</ol>

<h2>Worked Example: A US SaaS Startup</h2>
<p>ACME Analytics charges $99/mo. Gross margin 80%. Average customer stays 28 months. Q4 sales + marketing spend: $420,000. New customers acquired: 350.</p>
<ul>
  <li>CAC = 420,000 ÷ 350 = <strong>$1,200</strong></li>
  <li>LTV = $99 × 0.80 × 28 = <strong>$2,217.60</strong></li>
  <li>LTV:CAC = 2,217.60 ÷ 1,200 = <strong>1.85</strong></li>
</ul>
<p>That's underwater. ACME needs to either increase ARPU, improve retention (reduce monthly churn), or cut paid spend. Most likely all three.</p>

<h2>How to Fix a Broken Ratio</h2>
<ul>
  <li><strong>Lift LTV:</strong> raise prices, add upsells, reduce churn through onboarding and CS.</li>
  <li><strong>Lower CAC:</strong> double down on the channel with the lowest CPA, kill underperforming ones, build organic content and referral loops.</li>
  <li><strong>Segment:</strong> some customer cohorts have 8:1 ratios while others sit at 1:1. Stop spending on the bad cohort.</li>
</ul>

<h2>FAQs</h2>
<p><strong>Should LTV use revenue or gross profit?</strong> Always gross profit. Revenue-based LTV inflates the number.</p>
<p><strong>Is the 3:1 rule outdated?</strong> No, but in 2026 with higher CACs across paid channels, top-tier SaaS often targets 4:1 or higher.</p>
<p><strong>How often should I recalculate?</strong> Quarterly at minimum. Monthly if you're actively scaling spend.</p>
`,
  },
  {
    slug: "ab-test-statistical-significance-explained",
    title: "A/B Test Statistical Significance: What It Really Means (And When to Stop a Test)",
    metaTitle: "A/B Test Statistical Significance Explained – p-values, Power & Stopping Rules",
    metaDescription: "Plain-English guide to statistical significance for A/B tests. p-values, confidence, sample size, and when it's safe to call a winner.",
    category: "data",
    excerpt: "Stopping a test the moment p < 0.05 hits is the most expensive mistake in conversion optimization. Here's what significance actually means.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-15",
    readTimeMin: 9,
    body: `
<p>Statistical significance is the most misunderstood concept in conversion optimization. Most CRO dashboards display "95% confidence" the moment it appears — and most teams declare a winner the same day. That habit is responsible for a huge chunk of the failed "winning" experiments that fail to replicate when shipped to 100% of traffic.</p>

<h2>What Significance Actually Tells You</h2>
<p>A p-value of 0.05 means: <em>if there were no real difference between A and B, there's a 5% chance you'd see a result this extreme by random luck</em>. It does <strong>not</strong> mean "B is 95% likely to win." That's the most common misinterpretation.</p>

<h2>The Two Errors You're Trading Off</h2>
<ul>
  <li><strong>Type I (false positive):</strong> declaring a winner when none exists. Controlled by your significance level (α, usually 0.05).</li>
  <li><strong>Type II (false negative):</strong> missing a real winner. Controlled by statistical power (1−β, usually 0.80).</li>
</ul>

<h2>Why Peeking Is Deadly</h2>
<p>Looking at a fixed-horizon test daily and stopping the moment p < 0.05 multiplies your false positive rate to 20%+. To peek safely you need <strong>sequential testing</strong> methods (e.g. mSPRT, Bayesian) — most platforms like Optimizely and Statsig now ship these by default.</p>

<h2>How to Plan a Test Properly</h2>
<ol>
  <li>Decide your <strong>minimum detectable effect (MDE)</strong> — the smallest lift worth shipping. Often 2–5% relative.</li>
  <li>Calculate the required sample size using a power calculator. Need: baseline conversion rate, MDE, α=0.05, power=0.80.</li>
  <li>Run the test for <strong>at least one full business cycle</strong> (typically 14 days) <em>and</em> until sample size is reached — whichever is longer.</li>
  <li>Don't peek for decisions until then.</li>
  <li>Use our <a href="/tool/ab-test-significance-calculator">A/B Test Significance Calculator</a> to compute results.</li>
</ol>

<h2>Worked Example</h2>
<p>Baseline checkout conversion: 4.0%. You want to detect a 5% relative lift (so 4.2%) at 95% confidence and 80% power. Required sample size: ~31,000 visitors per variant. At 5,000 daily visits per variant, that's a 6.2-day test minimum. Round up to 14 days to cover weekly seasonality.</p>

<h2>When You Can Stop Early</h2>
<ul>
  <li>You're using a Bayesian or sequential testing tool that adjusts for peeking.</li>
  <li>The variant is dramatically harming key metrics (kill switch — different rule).</li>
  <li>You've collected the planned sample <em>and</em> covered a full weekly cycle.</li>
</ul>

<h2>Sanity-Check the Result</h2>
<p>Before shipping, run an <strong>SRM (Sample Ratio Mismatch)</strong> check — if your 50/50 split is actually 49.2/50.8 with high traffic, your test is broken and the result is invalid. Also segment by device and traffic source; "winners" that only work on desktop iOS Safari are a red flag.</p>

<h2>FAQs</h2>
<p><strong>Is 90% confidence ever okay?</strong> For low-risk UI tweaks, yes. For pricing, checkout, or strategic changes, stick to 95% or higher.</p>
<p><strong>Why did my "winner" lose in production?</strong> Usually one of: peeking, novelty effect, segment-specific lift, or insufficient power producing an inflated effect size.</p>
<p><strong>Bayesian or frequentist?</strong> For most teams Bayesian is more intuitive ("probability B beats A: 97%") and handles peeking naturally. Pick one and stick with it.</p>
`,
  },
  {
    slug: "compound-interest-the-most-powerful-formula",
    title: "Compound Interest: The Most Powerful Formula in Personal Finance",
    metaTitle: "Compound Interest Formula Explained – With Calculator, Examples & Benchmarks",
    metaDescription: "Understand the compound interest formula, daily vs monthly compounding, the rule of 72, and how starting 10 years earlier changes everything.",
    category: "finance",
    excerpt: "Albert Einstein supposedly called it the eighth wonder of the world. Here's the formula, why time matters more than rate, and how to model it for any goal.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-12",
    readTimeMin: 7,
    body: `
<p>If you understand one piece of math in personal finance, make it compound interest. Two investors saving the same total amount can finish 30 years apart in net worth — purely based on when they started.</p>

<h2>The Formula</h2>
<p><strong>A = P × (1 + r/n)<sup>n×t</sup></strong></p>
<ul>
  <li>A = final amount</li>
  <li>P = principal (starting amount)</li>
  <li>r = annual interest rate (decimal)</li>
  <li>n = compounding periods per year</li>
  <li>t = number of years</li>
</ul>
<p>For monthly contributions, use the future value of an annuity formula. Our <a href="/tool/compound-interest-calculator">Compound Interest Calculator</a> handles both cases.</p>

<h2>Compounding Frequency</h2>
<ul>
  <li><strong>Annual:</strong> simplest, slightly lower returns.</li>
  <li><strong>Monthly:</strong> standard for US savings, mortgages, and 401(k) contributions.</li>
  <li><strong>Daily:</strong> most US savings accounts and credit cards. Adds about 0.05–0.10% to effective yield versus monthly.</li>
  <li><strong>Continuous:</strong> theoretical maximum, used in academic finance: A = P × e<sup>rt</sup>.</li>
</ul>

<h2>The Rule of 72</h2>
<p>Years to double your money ≈ 72 ÷ annual return. At 8%, money doubles every 9 years. At 12%, every 6 years. It's a great mental check on any investment claim.</p>

<h2>Time Beats Rate (Almost Always)</h2>
<p>Investor A invests $5,000/year from age 25 to 35, then stops. Investor B invests $5,000/year from age 35 to 65. Both earn 8% annually.</p>
<ul>
  <li>Investor A total contributed: $50,000. Value at 65: <strong>~$615,000</strong>.</li>
  <li>Investor B total contributed: $150,000. Value at 65: <strong>~$566,000</strong>.</li>
</ul>
<p>Investor A puts in <em>one third</em> as much money and ends with more. That's the entire argument for starting young.</p>

<h2>Real-World Returns to Plan With (US, 2026)</h2>
<ul>
  <li><strong>S&P 500 historical real return:</strong> ~7% after inflation</li>
  <li><strong>60/40 portfolio:</strong> ~5% real</li>
  <li><strong>HYSA / 4-week T-Bills:</strong> 4–5% nominal (varies with Fed)</li>
  <li><strong>I-Bonds:</strong> CPI + small fixed component</li>
</ul>
<p>Always plan in <em>real</em> (inflation-adjusted) returns when modeling retirement.</p>

<h2>Worked Example: Roth IRA Maxer</h2>
<p>You contribute the 2026 Roth IRA max of $7,000/year for 40 years, earning 7% real return.</p>
<ul>
  <li>Total contributed: $280,000</li>
  <li>Final balance: ~$1.49 million (real dollars)</li>
  <li>Roth advantage: tax-free withdrawal in retirement</li>
</ul>

<h2>FAQs</h2>
<p><strong>Does the bank really compound daily?</strong> Yes for most US savings products. The rate quoted is APY, which already includes compounding.</p>
<p><strong>What return should I assume for retirement planning?</strong> 6–7% real for a stock-heavy portfolio. Lower assumptions = safer plan.</p>
<p><strong>Is compound interest the same as APY?</strong> APY is the result of compound interest expressed as one annual number. APR ignores compounding.</p>
`,
  },
  {
    slug: "saas-metrics-mrr-arr-churn-explained",
    title: "SaaS Metrics 101: MRR, ARR, Churn, and Net Revenue Retention",
    metaTitle: "SaaS Metrics Explained – MRR, ARR, Churn, NRR Formulas & Benchmarks",
    metaDescription: "Plain-English definitions of every SaaS metric that matters: MRR, ARR, gross/net churn, NRR, ARPU, with 2026 US benchmarks and formulas.",
    category: "finance",
    excerpt: "Every SaaS founder eventually faces an investor question they can't answer. This guide is the cheat sheet for every metric — formula, benchmark, and gotcha.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-10",
    readTimeMin: 8,
    body: `
<p>Every SaaS founder eventually walks into an investor meeting and gets asked about a metric they don't fully understand. This is the cheat sheet — formulas, benchmarks, and the calculation gotchas that derail valuations.</p>

<h2>MRR (Monthly Recurring Revenue)</h2>
<p><strong>MRR = Sum of monthly subscription value across all active customers.</strong> Exclude one-time fees, professional services, and overages. Annual contracts get divided by 12.</p>
<p>Run yours in our <a href="/tool/mrr-calculator">MRR Calculator</a>.</p>

<h2>ARR (Annual Recurring Revenue)</h2>
<p><strong>ARR = MRR × 12.</strong> The number investors and boards talk in. ARR ignores seasonality, so always pair it with quarter-over-quarter growth.</p>

<h2>The Four Movements That Change MRR</h2>
<ul>
  <li><strong>New MRR</strong> — from new customers</li>
  <li><strong>Expansion MRR</strong> — upsells, seats added, plan upgrades</li>
  <li><strong>Contraction MRR</strong> — downgrades, seat reductions</li>
  <li><strong>Churned MRR</strong> — full cancellations</li>
</ul>
<p>Net New MRR = New + Expansion − Contraction − Churned.</p>

<h2>Churn: Gross vs Net</h2>
<p><strong>Gross MRR Churn (%)</strong> = Churned MRR ÷ MRR at start of period. Pure loss, ignores expansion.</p>
<p><strong>Net MRR Churn (%)</strong> = (Churned + Contraction − Expansion) ÷ MRR at start of period. Can be <em>negative</em> when expansion exceeds losses — the holy grail.</p>
<p>Calculate both with our <a href="/tool/churn-rate-calculator">Churn Rate Calculator</a>.</p>

<h2>Net Revenue Retention (NRR)</h2>
<p><strong>NRR (%)</strong> = (Starting MRR + Expansion − Contraction − Churn) ÷ Starting MRR × 100.</p>
<p>Best-in-class SaaS clears 120% NRR — meaning existing customers grow 20%+ each year even if you stop new sales.</p>

<h2>2026 US SaaS Benchmarks</h2>
<ul>
  <li><strong>SMB SaaS gross churn:</strong> 3–5% monthly (35–45% annually) — high</li>
  <li><strong>Mid-market SaaS gross churn:</strong> 1–2% monthly</li>
  <li><strong>Enterprise SaaS gross churn:</strong> &lt;1% monthly (5–7% annually)</li>
  <li><strong>NRR (good):</strong> 105–115%</li>
  <li><strong>NRR (great):</strong> 120%+</li>
  <li><strong>Rule of 40:</strong> Growth rate + profit margin ≥ 40%</li>
</ul>

<h2>Worked Example</h2>
<p>Start of month MRR: $100,000. New: +$8,000. Expansion: +$5,000. Contraction: −$1,500. Churn: −$3,500.</p>
<ul>
  <li>Net New MRR: 8,000 + 5,000 − 1,500 − 3,500 = <strong>$8,000</strong></li>
  <li>Gross Churn: 3,500 ÷ 100,000 = <strong>3.5%</strong></li>
  <li>Net Churn: (3,500 + 1,500 − 5,000) ÷ 100,000 = <strong>0%</strong> (expansion just covers losses)</li>
  <li>End MRR: $108,000. NRR: (100,000 − 3,500 − 1,500 + 5,000) ÷ 100,000 = <strong>100%</strong></li>
</ul>

<h2>FAQs</h2>
<p><strong>Should I include trial users in MRR?</strong> No — only paying customers.</p>
<p><strong>Annual contract billed upfront — is it MRR?</strong> Recognize it as MRR (contract / 12) for the dashboard, but track cash separately.</p>
<p><strong>What's the most important single metric?</strong> NRR. It captures retention, expansion, and pricing power in one number.</p>
`,
  },
  {
    slug: "break-even-analysis-step-by-step",
    title: "Break-Even Analysis: How to Find Your Profit Threshold",
    metaTitle: "Break-Even Analysis Guide – Formula, Examples & When to Use It",
    metaDescription: "Step-by-step guide to break-even analysis: fixed vs variable costs, contribution margin, the formula, and how to use it for pricing and launches.",
    category: "finance",
    excerpt: "Break-even isn't just an accounting exercise — it's the fastest way to pressure-test a price, a product launch, or a hiring decision.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-08",
    readTimeMin: 6,
    body: `
<p>Break-even analysis answers one question: <em>at what point does this business, product, or campaign stop losing money?</em> Founders use it for pricing. Operators use it for launch decisions. CFOs use it for hiring sign-off. Despite being one of the simplest tools in finance, it's also one of the most underused.</p>

<h2>The Formula</h2>
<p><strong>Break-even units = Fixed Costs ÷ (Price per unit − Variable Cost per unit)</strong></p>
<p>The denominator is the <strong>contribution margin per unit</strong> — the dollars left over from each sale to cover fixed costs and eventually create profit.</p>
<p>Try it in our <a href="/tool/break-even-calculator">Break-Even Calculator</a>.</p>

<h2>Fixed vs Variable Costs</h2>
<ul>
  <li><strong>Fixed:</strong> rent, salaries, software subscriptions, insurance — costs that don't change with volume.</li>
  <li><strong>Variable:</strong> raw materials, payment processing fees, shipping, sales commissions — costs per unit sold.</li>
</ul>
<p>Misclassifying a "fixed" cost that's actually semi-variable (e.g. AWS bills) is the #1 way break-even models lie.</p>

<h2>Worked Example: A US DTC Candle Brand</h2>
<p>Selling price per candle: $32. Variable cost (wax, jar, label, shipping, payment fees): $11. Monthly fixed costs (warehouse, founder salary, software, marketing baseline): $18,000.</p>
<ul>
  <li>Contribution margin: 32 − 11 = $21 per candle</li>
  <li>Break-even units: 18,000 ÷ 21 = <strong>858 candles/month</strong></li>
  <li>Break-even revenue: 858 × $32 = <strong>$27,456/month</strong></li>
</ul>

<h2>Break-Even in Dollars (For Service Businesses)</h2>
<p><strong>Break-even revenue = Fixed Costs ÷ Contribution Margin Ratio</strong>, where the ratio is (Revenue − Variable Costs) ÷ Revenue. This is more useful for agencies and consultancies that don't sell discrete units.</p>

<h2>Three Levers To Lower Break-Even</h2>
<ol>
  <li><strong>Raise price.</strong> A 10% price hike with stable volume cuts break-even units sharply.</li>
  <li><strong>Cut variable cost.</strong> Negotiate suppliers, optimize packaging, cheaper fulfillment.</li>
  <li><strong>Cut fixed cost.</strong> Renegotiate rent, sublet, drop underused SaaS.</li>
</ol>

<h2>The Margin of Safety</h2>
<p><strong>Margin of safety (%) = (Actual sales − Break-even sales) ÷ Actual sales × 100.</strong> A high margin of safety means you can absorb a sales drop before going into loss. Below 20% is a yellow light.</p>

<h2>FAQs</h2>
<p><strong>Should I include taxes?</strong> Use pre-tax break-even for operational decisions; add a tax shield only when modeling distributable profit.</p>
<p><strong>How does break-even change with multiple products?</strong> Use weighted-average contribution margin across the product mix.</p>
<p><strong>Is break-even still useful for SaaS?</strong> Yes — apply it at the customer-cohort level: months of subscription needed to recover CAC.</p>
`,
  },
  {
    slug: "csv-to-json-conversion-guide",
    title: "CSV to JSON Conversion: A Complete Developer's Guide",
    metaTitle: "CSV to JSON Conversion Explained – Schemas, Edge Cases & Best Practices",
    metaDescription: "Convert CSV to JSON correctly: schema decisions, nested objects, type inference, encoding gotchas, and when to use streaming for large files.",
    category: "guide",
    excerpt: "Converting a 10-row CSV is trivial. Converting a 10-million-row CSV with mixed encodings, embedded quotes, and nested fields is where bugs are born.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-05",
    readTimeMin: 6,
    body: `
<p>Converting CSV to JSON sounds like a one-line job — and for a clean 10-row file, it is. The headaches start when the CSV has embedded commas, quoted strings with newlines, mixed encodings, or millions of rows. This guide covers the choices that matter.</p>

<h2>Choose a JSON Shape</h2>
<p>Two common shapes, very different downstream:</p>
<ul>
  <li><strong>Array of objects</strong> — each row becomes <code>{ "header": "value", ... }</code>. Good for APIs and most apps.</li>
  <li><strong>Columnar</strong> — <code>{ "header1": [v1, v2, ...], "header2": [...] }</code>. Better for analytics and Pandas-style consumption.</li>
</ul>

<h2>Type Inference: Be Strict</h2>
<p>Most converters guess types per cell, which leads to mixed columns: a "ZIP" column ends up as <code>5021</code> on most rows but the string <code>"02118"</code> on the rows starting with zero. Either:</p>
<ol>
  <li>Keep everything as strings and cast in your application, or</li>
  <li>Define an explicit schema per column (string, integer, float, date, boolean).</li>
</ol>

<h2>Quoting and Escaping</h2>
<p>RFC 4180 defines the official rules:</p>
<ul>
  <li>Fields containing commas, quotes, or newlines must be wrapped in double quotes.</li>
  <li>Inside a quoted field, double quotes are escaped by doubling: <code>"He said ""hi""."</code></li>
  <li>Newlines inside quoted fields are valid and must be preserved.</li>
</ul>
<p>Excel and Google Sheets follow this — but custom exporters often don't. Our <a href="/tool/csv-to-json-converter">CSV to JSON Converter</a> handles RFC 4180 correctly.</p>

<h2>Encoding</h2>
<p>Always read CSV as UTF-8. The classic Windows trap is files saved as Windows-1252 (curly quotes, em-dashes break). If you see <code>â€™</code> in your output, you've hit a Windows-1252 file decoded as UTF-8. Re-decode with the right codec.</p>

<h2>Nested JSON From Flat CSV</h2>
<p>Use dot or bracket notation in headers:</p>
<pre><code>id,user.name,user.email,address.city
1,Ada,ada@example.com,Boston</code></pre>
<p>Most converters (including ours) expand these into proper nested objects.</p>

<h2>Streaming for Large Files</h2>
<p>Loading a 5 GB CSV into memory before converting will crash. Use a streaming parser:</p>
<ul>
  <li><strong>Node:</strong> <code>csv-parse</code> with streams</li>
  <li><strong>Python:</strong> <code>pandas.read_csv(chunksize=...)</code> or <code>csv.DictReader</code> with generator</li>
  <li><strong>Browser:</strong> <code>PapaParse</code> step callback</li>
</ul>
<p>Write JSON Lines (one JSON object per line) instead of one giant array — easier to stream into BigQuery, Snowflake, or Spark.</p>

<h2>Common Bugs Checklist</h2>
<ul>
  <li>Headers with leading BOM character (<code>\\uFEFF</code>)</li>
  <li>Trailing whitespace in headers</li>
  <li>Empty trailing rows producing <code>{}</code> objects</li>
  <li>Numeric IDs losing leading zeros</li>
  <li>Date strings parsed in the wrong locale (DD/MM vs MM/DD)</li>
</ul>

<h2>FAQs</h2>
<p><strong>JSON or JSON Lines?</strong> JSON for under 100 MB, JSONL for anything bigger or for streaming pipelines.</p>
<p><strong>Should empty cells become null or empty string?</strong> Pick one and document it. Most APIs prefer <code>null</code>.</p>
<p><strong>How do I handle duplicate headers?</strong> Either rename them on read (<code>name</code>, <code>name_2</code>) or fail loud — silently overwriting fields hides bugs.</p>
`,
  },
  {
    slug: "standard-deviation-vs-variance",
    title: "Standard Deviation vs Variance: When to Use Which",
    metaTitle: "Standard Deviation vs Variance – Differences, Formulas & Practical Examples",
    metaDescription: "Clear explanation of standard deviation vs variance, when to use each, sample vs population formulas, and how to interpret them in real datasets.",
    category: "data",
    excerpt: "Variance and standard deviation measure the same thing — but only one is in the units you actually want. Here's how to know which to report.",
    author: "GenAlpha Tools Editorial",
    publishedAt: "2026-04-03",
    readTimeMin: 5,
    body: `
<p>Variance and standard deviation both measure how spread out a dataset is. They're mathematically twins — variance is just standard deviation squared. So why do we have both, and when do you reach for which one?</p>

<h2>The Formulas</h2>
<p><strong>Variance (population):</strong> σ² = Σ(xᵢ − μ)² ÷ N</p>
<p><strong>Standard deviation (population):</strong> σ = √σ²</p>
<p>For a sample, divide by <em>n − 1</em> instead of N (Bessel's correction):</p>
<p><strong>Sample variance:</strong> s² = Σ(xᵢ − x̄)² ÷ (n − 1)</p>
<p>Compute either in our <a href="/tool/standard-deviation-calculator">Standard Deviation Calculator</a>.</p>

<h2>Why Two Numbers For The Same Thing?</h2>
<p>Variance is mathematically convenient — it's additive for independent variables, plays nicely in regression, and is the workhorse of ANOVA and most inferential statistics.</p>
<p>Standard deviation is <em>interpretable</em> — it's in the same units as your data. If you measured customer ages, σ is in years. Variance is in "years squared," which means nothing to anyone outside a stats class.</p>

<h2>The Rule of Thumb</h2>
<ul>
  <li><strong>Reporting and communication:</strong> use standard deviation.</li>
  <li><strong>Analysis and modeling:</strong> use variance.</li>
</ul>

<h2>Sample vs Population: Which N?</h2>
<p>If you have <em>every</em> data point in your population (e.g., every employee at a 50-person company), divide by N. If you have a sample drawn from a larger population (almost every real-world case in business analytics), divide by n − 1. Spreadsheet functions: <code>STDEV.P</code>/<code>VAR.P</code> for population, <code>STDEV.S</code>/<code>VAR.S</code> for sample.</p>

<h2>The Empirical Rule (For Roughly Normal Data)</h2>
<ul>
  <li>~68% of data falls within ±1 SD of the mean</li>
  <li>~95% within ±2 SD</li>
  <li>~99.7% within ±3 SD</li>
</ul>
<p>This is what makes SD useful as a "typical deviation" measure.</p>

<h2>Worked Example</h2>
<p>Five customer order values: $40, $42, $50, $55, $63. Mean: $50.</p>
<ul>
  <li>Squared deviations: 100, 64, 0, 25, 169 → sum 358</li>
  <li>Sample variance: 358 ÷ 4 = <strong>89.5</strong></li>
  <li>Sample SD: √89.5 ≈ <strong>$9.46</strong></li>
</ul>
<p>You'd tell a stakeholder: "Average order is $50, with a typical spread of about ±$9." You wouldn't say "variance is 89.5 dollars-squared."</p>

<h2>Coefficient of Variation: SD in Context</h2>
<p>SD alone can mislead. A SD of $9 is huge for $50 orders but tiny for $50,000 orders. The <strong>coefficient of variation (CV) = SD ÷ mean</strong> normalizes it. CV of 0.19 (above) means the spread is 19% of the average.</p>

<h2>FAQs</h2>
<p><strong>Why divide by n−1?</strong> Sample variance with N underestimates the true population variance. Subtracting one degree of freedom corrects the bias.</p>
<p><strong>Is high SD bad?</strong> Not inherently — it just means more variability. Whether that's good (diverse customer base) or bad (unstable manufacturing) depends on context.</p>
<p><strong>Can SD be negative?</strong> No. It's a square root of a sum of squares — always ≥ 0.</p>
`,
  },
];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);
export const getRelatedPosts = (currentSlug: string, category: string, limit = 3) =>
  blogPosts.filter(p => p.slug !== currentSlug && p.category === category).slice(0, limit);

export const getPostsByCategory = (category: BlogPost["category"]) =>
  [...blogPosts]
    .filter((p) => p.category === category)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const BLOG_CATEGORY_META: Record<BlogPost["category"], { slug: string; label: string; description: string }> = {
  marketing: {
    slug: "marketing",
    label: "Business & Marketing",
    description: "Practical guides on ROI, CAC, LTV, conversion optimization and growth math — paired with our free marketing calculators.",
  },
  finance: {
    slug: "finance",
    label: "Finance & SaaS Metrics",
    description: "Compound interest, break-even, SaaS metrics like MRR, ARR, churn and NRR — explained for founders, operators and finance pros.",
  },
  data: {
    slug: "data",
    label: "Data & Statistics",
    description: "A/B testing, statistical significance, standard deviation and core data concepts every analyst and PM should master.",
  },
  guide: {
    slug: "guide",
    label: "How-To Guides",
    description: "Hands-on walkthroughs for our utilities — CSV to JSON, data cleaning, conversions, and how to interpret calculator results.",
  },
};

export const getBlogCategoryBySlug = (slug: string) =>
  (Object.values(BLOG_CATEGORY_META).find((c) => c.slug === slug) ?? null) as
    | (typeof BLOG_CATEGORY_META)[BlogPost["category"]]
    | null;
