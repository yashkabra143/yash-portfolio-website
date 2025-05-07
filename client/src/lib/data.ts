// Experience Data
export const experienceData = [
  {
    type: "full",
    title: "Senior Quality Assurance Engineer",
    company: "PERIZER",
    location: "Dallas, TX",
    period: "JANUARY 2024 - Present",
    responsibilities: [
      "Conducted in-depth automation and manual testing for Computesphere, Calen360, CipherAuth, and Xerinn, driving a 20% increase in software reliability by identifying and addressing critical issues.",
      "Developed and maintained an automated testing framework using Python, Selenium WebDriver, and PyTest.",
      "Integrated API testing using Python Requests library to validate RESTful services.",
      "Implemented BDD with Behave for better collaboration and structured test scenarios.",
      "Automated test execution in CI/CD pipeline using Jenkins and GitHub Actions, improving release efficiency by 30%."
    ]
  },
  {
    type: "full",
    title: "Senior Quality Assurance Engineer",
    company: "YADARA LLC",
    location: "Austin, TX",
    period: "APRIL 2023 - December 2023",
    responsibilities: [
      "Conducted exhaustive automation and manual tests for Yadara.com, achieving a remarkable 20% enhancement in software reliability.",
      "Automated testing procedures, effectively reducing testing time by 30% and ensuring seamless cross-browser compatibility.",
      "Managed project tasks, reported defects via Jira, and facilitated team communication, contributing to a 15% improvement in workflow efficiency.",
      "Built end-to-end automation scripts using Python and Selenium, reducing regression testing effort by 40%.",
      "Implemented API automation testing with Python Requests and JSON validation."
    ]
  },
  {
    type: "full",
    title: "Quality Assurance Engineer II",
    company: "BRAINBEES SOLUTION TECHNOLOGIES PVT LTD",
    location: "Pune, MH, India",
    period: "June 2021 - April 2023",
    responsibilities: [
      "Executed comprehensive functional, manual, and usability tests for FirstCry.com, resulting in a substantial 15% boost in user satisfaction.",
      "Successfully implemented automation testing, leading to an impressive 40% reduction in testing effort and faster releases.",
      "Collaborated seamlessly with teams using Teams and FortiClient VPN, ensuring effective communication.",
      "Developed Python-based test scripts for mobile app automation on iOS and Android.",
      "Maintained and optimized test cases using Page Object Model (POM) in Selenium."
    ]
  },
  {
    type: "earlier",
    period: "Earlier Experience",
    positions: [
      {
        title: "Senior Quality Assurance Engineer",
        company: "QUEST GLOBAL TECHNOLOGIES PVT LTD",
        location: "Indore, MP, India",
        period: "February 2020 - June 2021"
      },
      {
        title: "Senior Quality Assurance Engineer",
        company: "GENESIS TECHNOLOGIES PVT LTD",
        location: "Indore, MP, India",
        period: "June 2017 - February 2020"
      }
    ]
  }
];

// Skills Data
export const skillsData = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", proficiency: 90 },
      { name: "Java", proficiency: 75 },
      { name: "JavaScript", proficiency: 80 }
    ]
  },
  {
    category: "Automation Frameworks",
    items: [
      { name: "Selenium", proficiency: 95 },
      { name: "PyTest", proficiency: 85 },
      { name: "Behave", proficiency: 80 },
      { name: "Cucumber", proficiency: 75 },
      { name: "TestNG", proficiency: 70 }
    ]
  },
  {
    category: "API Testing",
    items: [
      { name: "Postman", proficiency: 90 },
      { name: "REST Assured", proficiency: 85 },
      { name: "Python Requests", proficiency: 95 }
    ]
  },
  {
    category: "CI/CD & DevOps",
    items: [
      { name: "Jenkins", proficiency: 80 },
      { name: "GitHub Actions", proficiency: 85 }
    ]
  },
  {
    category: "Cloud & Virtualization",
    items: [
      { name: "BrowserStack", proficiency: 85 },
      { name: "LambdaTest", proficiency: 80 },
      { name: "Sauce Labs", proficiency: 75 }
    ]
  },
  {
    category: "Database",
    items: [
      { name: "MySQL", proficiency: 75 },
      { name: "PostgreSQL", proficiency: 70 }
    ]
  }
];

// Projects Data
export const projectsData = [
  {
    name: "Yadara.com",
    domain: "Ticketing System",
    description: "Developed Yadara LLC, an innovative ticketing system, facilitating seamless ticket transactions for users to purchase event tickets while enabling sellers to effortlessly sell tickets.",
    technologies: ["Selenium TestNG", "QA Automation", "Java"],
    category: "Web Application",
    industry: "Events & Entertainment",
    testingType: ["Functional", "Automation"],
    icon: "ticket"
  },
  {
    name: "FirstCry.com",
    domain: "E-commerce and Parenting",
    description: "Managed e-commerce operations for FirstCry, facilitating seamless online transactions of baby products while overseeing the parenting domain for a comprehensive customer experience.",
    technologies: ["Manual Testing", "Automation", "Usability", "Selenium"],
    category: "E-commerce Platform",
    industry: "Retail & Consumer Goods",
    testingType: ["Functional", "Usability", "Automation"],
    icon: "baby"
  },
  {
    name: "DrDenese",
    domain: "E-commerce Web Application",
    description: "Developed an e-commerce platform for a skincare website, enabling seamless product purchases and implementing a subscription system for personalized skincare regimens.",
    technologies: ["BDD", "Cucumber", "Specflow", "C#"],
    category: "E-commerce Platform",
    industry: "Health & Beauty",
    testingType: ["BDD", "Automation"],
    icon: "skincare"
  },
  {
    name: "Smart Asset Manager",
    domain: "Cryptocurrency",
    description: "Developed the SAM app, a cryptocurrency exchange platform that enables users to securely buy and sell digital assets with ease.",
    technologies: ["Blockchain", "Manual Testing", "Performance", "API Testing"],
    category: "Finance Application",
    industry: "FinTech & Cryptocurrency",
    testingType: ["Functional", "Performance", "Security"],
    icon: "crypto"
  },
  {
    name: "Computesphere",
    domain: "Cloud Management",
    description: "Designed and implemented an automated testing framework for Computesphere, optimizing cloud infrastructure testing with CI/CD pipelines for seamless execution.",
    technologies: ["Python", "Selenium", "Jenkins", "CI/CD", "PyTest"],
    category: "Cloud Infrastructure",
    industry: "Technology & Cloud Computing",
    testingType: ["Automation", "API", "Integration"],
    icon: "cloud"
  }
];

// Project Filter Categories
export const projectFilters = {
  category: [
    "All Categories",
    "Web Application",
    "E-commerce Platform",
    "Finance Application",
    "Cloud Infrastructure"
  ],
  industry: [
    "All Industries",
    "Events & Entertainment",
    "Retail & Consumer Goods",
    "Health & Beauty",
    "FinTech & Cryptocurrency",
    "Technology & Cloud Computing"
  ],
  testingType: [
    "All Testing Types",
    "Functional",
    "Automation", 
    "Performance",
    "Security",
    "Usability",
    "BDD",
    "API", 
    "Integration"
  ]
};

// Testimonials Data
export const testimonialsData = [
  {
    id: 1,
    name: "John Smith",
    role: "CTO, Yadara LLC",
    avatar: "", // Leave empty if no image
    content: "Yash demonstrated exceptional dedication and technical expertise during his time as a QA Engineer. His automation frameworks significantly improved our testing efficiency and product quality.",
    rating: 5,
    source: "Direct Collaboration"
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Product Manager, FirstCry",
    avatar: "",
    content: "Working with Yash was a pleasure. His attention to detail and commitment to quality are outstanding. He identified critical issues that would have impacted our customers and worked proactively to ensure timely resolutions.",
    rating: 5,
    source: "Upwork"
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Team Lead, PERIZER",
    avatar: "",
    content: "Yash is a talented QA professional who brings both technical skill and a positive attitude to the team. His automation expertise helped us reduce regression testing time by 40%, allowing faster releases with higher confidence.",
    rating: 5,
    source: "Direct Collaboration"
  }
];

// Certifications Data
export const certificationsData = [
  {
    id: 1,
    name: "Manual Testing Certification",
    issuer: "International Software Testing Qualifications Board (ISTQB)",
    date: "May 2018",
    description: "Foundation Level certification in software testing methodologies, principles, and practices.",
    icon: "certificate"
  },
  {
    id: 2,
    name: "Automation Testing Certification",
    issuer: "Selenium WebDriver with Python",
    date: "August 2020",
    description: "Advanced certification in automated testing using Selenium WebDriver with Python, including test framework design and CI/CD integration.",
    icon: "certificate"
  }
];
