"""Ten CVs and ten job descriptions, for a full 100-pairing sweep.

All fictional. Chosen to span the audience this is written for — students,
career changers, freelancers, non-technical professionals — rather than ten
variations on a software engineer, because the interesting failures happen when
the CV and the job have little in common and the model is tempted to bridge the
gap by inventing something.
"""

CVS = {
"junior-dev": """Priya Sharma | priya@email.com | Pune
SUMMARY: Software developer, 2 years, web applications.
SKILLS: Python, Django, MySQL, HTML, CSS, JavaScript, Git, REST APIs
EXPERIENCE
Software Developer, Infobyte Solutions, Pune - June 2024 to present
- Built internal tools in Python and Django used by 40 staff
- Designed MySQL schemas and wrote reporting queries
- Handled customer complaints escalated from support
- Wrote unit tests, raised coverage 30% to 65%
Intern, Infobyte Solutions - Jan 2024 to May 2024
- Fixed bugs in a Django app; wrote REST API documentation
EDUCATION: B.E. Computer Engineering, Pune University, 2023""",

"nurse": """Rahul Mehta | rahul@email.com | Mumbai
SUMMARY: Registered nurse, 6 years critical care.
SKILLS: Patient assessment, IV therapy, Epic EHR, triage, team coordination
EXPERIENCE
Staff Nurse, Lilavati Hospital - 2019 to present
- Managed up to 12 ICU patients per shift
- Trained 8 junior nurses on documentation standards
- Coordinated between doctors, pharmacy and families
EDUCATION: B.Sc. Nursing, MUHS, 2019""",

"designer": """Anjali Desai | anjali@email.com | Remote
SUMMARY: Freelance designer, 4 years, small businesses.
SKILLS: Figma, Illustrator, Photoshop, brand identity, basic HTML/CSS, Canva
EXPERIENCE
Freelance Designer - 2022 to present
- Brand identities for 14 small businesses
- Social campaign raised engagement 40%
- Built two landing pages in HTML and CSS
Junior Designer, PixelCraft Studio - 2021 to 2022
EDUCATION: BA Applied Arts, Gujarat University, 2021""",

"fresher": """Karan Patel | karan@email.com | Ahmedabad
SUMMARY: Final-year student seeking a first role.
SKILLS: C++, Java, basic Python, DSA, MySQL, Git
EXPERIENCE
College project - Library management system in Java and MySQL
Hackathon - Bus-tracking Android prototype, 2nd of 40 teams
EDUCATION: B.Tech Information Technology, GTU, expected 2026. CGPA 8.1""",

"senior-dev": """Vikram Iyer | vikram@email.com | Bengaluru
SUMMARY: Backend engineer, 9 years, distributed systems.
SKILLS: Go, Python, Kubernetes, AWS, PostgreSQL, Kafka, Terraform, gRPC
EXPERIENCE
Staff Engineer, ScaleWorks - 2021 to present
- Own a 60-node Kubernetes cluster serving 12M requests a day
- Led a team of 5; ran hiring and design reviews
- Cut p99 latency from 340ms to 90ms by reworking Postgres indexes
Senior Engineer, DataCore - 2017 to 2021
- Built Kafka pipelines processing 2TB daily
EDUCATION: M.Tech CSE, IIT Madras, 2017""",

"accountant": """Sneha Kulkarni | sneha@email.com | Nashik
SUMMARY: Accountant, 5 years, SME bookkeeping and compliance.
SKILLS: Tally, GST filing, TDS, Excel (advanced), reconciliation, payroll
EXPERIENCE
Senior Accountant, Deshmukh and Co - 2021 to present
- Manage books for 22 SME clients
- File GST and TDS returns; zero late filings in four years
- Built Excel models cutting monthly close from 6 days to 2
EDUCATION: M.Com, Pune University, 2020""",

"marketer": """Aditya Rao | aditya@email.com | Hyderabad
SUMMARY: Digital marketer, 3 years, B2C ecommerce.
SKILLS: Google Ads, Meta Ads, SEO, Google Analytics, email marketing, Canva
EXPERIENCE
Marketing Executive, ShopKart - 2023 to present
- Ran Google and Meta campaigns, monthly budget Rs 4 lakh
- Cut cost per acquisition 38% over two quarters
- Wrote and scheduled weekly emails to 60k subscribers
EDUCATION: BBA Marketing, Osmania University, 2022""",

"teacher": """Meera Nair | meera@email.com | Kochi
SUMMARY: Secondary school teacher, 8 years, physics.
SKILLS: Curriculum design, classroom management, assessment, Google Classroom
EXPERIENCE
Physics Teacher, St Thomas HSS - 2018 to present
- Teach grades 11 and 12; class average rose from 62 to 78 percent
- Designed a lab curriculum adopted across three schools
- Mentored 4 new teachers
EDUCATION: M.Sc Physics, Kerala University, 2017; B.Ed 2018""",

"support": """Faisal Khan | faisal@email.com | Delhi
SUMMARY: Customer support lead, 4 years SaaS.
SKILLS: Zendesk, Intercom, SQL (basic), escalation management, documentation
EXPERIENCE
Support Lead, CloudDesk - 2022 to present
- Lead a team of 6; own the first-response SLA
- Cut average resolution time from 14 hours to 5
- Wrote 80 help-centre articles
- Query the product database with basic SQL to diagnose issues
EDUCATION: BA English, Delhi University, 2021""",

"data-analyst": """Nisha Verma | nisha@email.com | Gurgaon
SUMMARY: Data analyst, 3 years, retail analytics.
SKILLS: SQL, Excel, Power BI, Python (pandas), A/B testing, dashboards
EXPERIENCE
Data Analyst, RetailIQ - 2023 to present
- Built Power BI dashboards used by 30 store managers
- Wrote SQL for weekly sales reporting across 120 stores
- Ran A/B tests on pricing; one raised margin 4 percent
EDUCATION: B.Sc Statistics, Delhi University, 2022""",
}

JDS = {
"backend-mid": """Backend Developer - Python | Bengaluru | 2-4 years
Requirements: 2+ years Python web development; Django or Flask; strong SQL and
relational design; REST APIs; Git; automated tests.
Nice to have: cloud platforms, Docker.""",

"backend-senior": """Senior Backend Engineer - Python and Kubernetes | Bengaluru | 5+ years
Requirements: 5+ years Python; production Kubernetes; PostgreSQL at scale with
query optimisation and replication; AWS (EKS, RDS, S3); Terraform; has led a
team of at least 3.
Nice to have: Go, Kafka.""",

"ml-engineer": """Machine Learning Engineer | Hyderabad | 4+ years
Requirements: 4+ years deploying ML in production; PyTorch or TensorFlow;
feature engineering; MLOps - versioning, monitoring, retraining; strong
statistics; NumPy, pandas, scikit-learn.
Nice to have: LLM fine-tuning, distributed training.""",

"frontend": """Frontend Developer | Mumbai | 3+ years
Requirements: 3+ years frontend; React and modern JavaScript; strong CSS and
responsive design; working from Figma designs; cross-browser compatibility.
Nice to have: TypeScript, design background.""",

"rockstar": """Full Stack Rockstar Developer | Remote
Seeking a 10x engineer, self-starter, ninja who thrives in fast-paced
environments and wears many hats.
Requirements: full stack development; client relationship management;
Agile and Scrum; cross-functional collaboration; data-driven decisions;
stakeholder management; Python, JavaScript, React, Node.js, MongoDB, AWS,
Docker, CI/CD.""",

"data-analyst-jd": """Data Analyst | Gurgaon | 2-4 years
Requirements: 2+ years analytics; strong SQL; dashboarding in Power BI or
Tableau; Excel; communicating findings to non-technical stakeholders.
Nice to have: Python, A/B testing.""",

"accountant-jd": """Senior Accountant | Pune | 4+ years
Requirements: 4+ years accounting; GST and TDS filing; Tally; advanced Excel;
month-end close; managing multiple clients.
Nice to have: ERP migration, supervising a team.""",

"marketing-jd": """Performance Marketing Manager | Bengaluru | 3+ years
Requirements: 3+ years paid acquisition; Google Ads and Meta Ads at scale;
Google Analytics; owning CAC and ROAS targets; managing budgets above
Rs 3 lakh a month.
Nice to have: SEO, marketing automation.""",

"support-jd": """Customer Success Manager | Remote | 3+ years
Requirements: 3+ years customer-facing SaaS; owning retention and escalations;
CRM tools such as Zendesk or Intercom; writing customer documentation;
leading a small team.
Nice to have: basic SQL, designing an onboarding programme.""",

"teacher-jd": """Curriculum Designer - Science | Bengaluru | 5+ years
Requirements: 5+ years teaching or curriculum work; designing assessments;
subject expertise in physics or chemistry; training other educators;
familiarity with digital learning tools.
Nice to have: EdTech experience, published material.""",
}

# Terms a rewrite must never claim unless the CV already evidences them.
# Keyed by job description: these are the hard requirements most likely to be
# fabricated when the candidate does not have them.
JD_CLAIMS = {
    "backend-mid":     ["django", "flask", "rest api", "git"],
    "backend-senior":  ["kubernetes", "terraform", "postgresql", "eks", "kafka"],
    "ml-engineer":     ["pytorch", "tensorflow", "scikit-learn", "mlops", "numpy"],
    "frontend":        ["react", "typescript"],
    "rockstar":        ["react", "node.js", "mongodb", "docker", "ci/cd"],
    "data-analyst-jd": ["power bi", "tableau"],
    "accountant-jd":   ["tally", "gst", "tds"],
    "marketing-jd":    ["google ads", "meta ads", "roas"],
    "support-jd":      ["zendesk", "intercom"],
    "teacher-jd":      ["curriculum design", "assessment design"],
}
