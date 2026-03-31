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
    name: "SunSirius Care",
    domain: "Healthcare & EVV",
    description: "All-in-one mobile app for respite providers, caregivers, and healthcare agencies to manage shifts, billing, and electronic visit verification (EVV). Streamlines administrative tasks with real-time tracking, allowing caregivers to focus on patient care.",
    technologies: ["Slack", "Jira", "Testflight", "Google Drive", "Lightshot"],
    category: "Mobile Application",
    industry: "Healthcare",
    testingType: ["Functional", "Manual", "Usability"],
    icon: "sirius",
    url: "https://play.google.com/store/apps/details?id=com.app.sun_sirius",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.app.sun_sirius&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "Computesphere",
    domain: "Cloud Management",
    description: "Designed and implemented an automated testing framework for Computesphere, optimizing cloud infrastructure testing. Integrated CI/CD pipelines (Jenkins, GitHub Actions) for seamless execution, improving release efficiency by 30%.",
    technologies: ["Python", "Selenium", "PyTest", "Behave", "Jenkins", "GitHub Actions"],
    category: "Cloud Infrastructure",
    industry: "Technology & Cloud Computing",
    testingType: ["Automation", "API", "Integration"],
    icon: "cloud",
    url: "https://computesphere.com/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fcomputesphere.com&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "WordBop",
    domain: "Mobile Word Game",
    description: "Daily word puzzle game for Android and iOS that challenges players with boggle-style, scrabble-style, and crossword mechanics. Features daily challenges, streak rewards, hidden stickers, themed puzzles, and rotating two-week themes.",
    technologies: ["Teams", "JIRA"],
    category: "Mobile Application",
    industry: "Gaming & Entertainment",
    testingType: ["Functional", "Manual", "Usability"],
    icon: "wordbop",
    url: "https://apps.apple.com/us/app/wordbop-daily-word-puzzles/id6443813370",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fwordbop-daily-word-puzzles%2Fid6443813370&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "PotionPop",
    domain: "Mobile Match-3 Game",
    description: "Match-3 adventure set in a whimsical wizarding world with hundreds of handcrafted levels. Features special bonuses, magic amulets, cursed tiles, and daily spins. Available on Android and iOS.",
    technologies: ["Teams", "JIRA", "Lightshot", "ScreenRecorder"],
    category: "Mobile Application",
    industry: "Gaming & Entertainment",
    testingType: ["Functional", "Manual", "Usability"],
    icon: "potionpop",
    url: "https://apps.apple.com/us/app/potion-pop-match3/id6744935331",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fpotion-pop-match3%2Fid6744935331&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "Syncuppro",
    domain: "Compliance Management",
    description: "Web platform connecting compliance project managers with organisations. Enables compliance experts to discover flexible jobs, lead teams, and manage large-scale compliance projects across industries.",
    technologies: ["Teams", "JIRA"],
    category: "Web Application",
    industry: "Compliance & Legal",
    testingType: ["Manual", "Functional", "Usability"],
    icon: "compliance",
    url: "https://www.syncuppro.com/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fwww.syncuppro.com&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "Gently Radiant",
    domain: "E-commerce Skincare",
    description: "Led end-to-end testing for an e-commerce platform specialising in skincare products. Conducted rigorous manual and automation testing to ensure a seamless user experience across web and mobile platforms.",
    technologies: ["Teams", "Jira", "Figma", "Outlook"],
    category: "E-commerce Platform",
    industry: "Health & Beauty",
    testingType: ["Functional", "Manual", "Automation", "Usability"],
    icon: "radiant",
    url: "https://gentlyradiantskin.com/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgentlyradiantskin.com&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "Calen360",
    domain: "Calendar Sync",
    description: "Web App and PWA that allows users to sync their calendars with minimal effort, eliminating the need to manually transfer calendar data across platforms.",
    technologies: ["Teams", "JIRA", "Figma"],
    category: "Web Application",
    industry: "Productivity & SaaS",
    testingType: ["Functional", "Manual", "Usability"],
    icon: "calendar",
    url: "https://www.calen360.com/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fwww.calen360.com&screenshot=true&meta=false&embed=screenshot.url"
  },
  {
    name: "Yadara.com",
    domain: "Ticketing System",
    description: "Innovative ticketing platform facilitating seamless ticket transactions for users to purchase event tickets while enabling sellers to effortlessly list and sell tickets. Achieved 20% enhancement in software reliability.",
    technologies: ["Python", "Selenium", "Requests", "JIRA"],
    category: "Web Application",
    industry: "Events & Entertainment",
    testingType: ["Functional", "Automation", "API"],
    icon: "ticket",
    url: "https://yadara.com/",
    image: "/attached_assets/yadara.png"
  },
  // {
  //   name: "Smart Asset Manager",
  //   domain: "Cryptocurrency Exchange",
  //   description: "Cryptocurrency exchange platform (Android & iOS) enabling users to securely buy and sell digital assets. Comprehensive testing covered functional, performance, and security aspects of blockchain transactions.",
  //   technologies: ["Mantis", "Blockchain", "Gsheet", "Skype", "Lightshot"],
  //   category: "Finance Application",
  //   industry: "FinTech & Cryptocurrency",
  //   testingType: ["Functional", "Performance", "Security"],
  //   icon: "crypto"
  // },
  {
    name: "FirstCry.com",
    domain: "E-commerce & Parenting",
    description: "Managed quality assurance for FirstCry's e-commerce platform, facilitating seamless online transactions of baby products. Automation reduced testing effort by 40% and resulted in a 15% boost in user satisfaction.",
    technologies: ["Redmine", "SmartWork", "Teams", "FortiClient VPN", "Python", "Selenium"],
    category: "E-commerce Platform",
    industry: "Retail & Consumer Goods",
    testingType: ["Functional", "Manual", "Usability", "Automation"],
    icon: "baby",
    url: "https://www.firstcry.com/",
    image: "/attached_assets/firstcry-screenshot.png"
  },
  {
    name: "DrDenese",
    domain: "E-commerce Skincare",
    description: "E-commerce platform for a premium skincare brand enabling seamless product purchases and a subscription system for personalised skincare regimens. Implemented BDD automation with C#, Cucumber, and SpecFlow.",
    technologies: ["C#", "BDD", "Cucumber", "SpecFlow", "TestNG", "Redmine"],
    category: "E-commerce Platform",
    industry: "Health & Beauty",
    testingType: ["BDD", "Automation", "Performance", "Functional"],
    icon: "skincare",
    url: "https://drdenese.com/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fdrdenese.com&screenshot=true&meta=false&embed=screenshot.url"
  }
];

// Project Filter Categories
export const projectFilters = {
  category: [
    "All Categories",
    "Web Application",
    "Mobile Application",
    "E-commerce Platform",
    "Finance Application",
    "Cloud Infrastructure"
  ],
  industry: [
    "All Industries",
    "Healthcare",
    "Technology & Cloud Computing",
    "Gaming & Entertainment",
    "Compliance & Legal",
    "Health & Beauty",
    "Productivity & SaaS",
    "Events & Entertainment",
    "FinTech & Cryptocurrency",
    "Retail & Consumer Goods"
  ],
  testingType: [
    "All Testing Types",
    "Functional",
    "Manual",
    "Automation",
    "API",
    "Performance",
    "Security",
    "Usability",
    "BDD",
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
    title: "Manual Testing Certification",
    issuer: "International Software Testing Qualifications Board (ISTQB)",
    date: "May 2018",
    credentialId: "ISTQB-FL-2018-YK",
    skills: ["Manual Testing", "Test Planning", "Bug Reporting", "ISTQB"],
    status: "active" as const,
  },
  {
    id: 2,
    title: "Automation Testing Certification",
    issuer: "Selenium WebDriver with Python",
    date: "August 2020",
    credentialId: "SEL-PY-2020-YK",
    skills: ["Selenium", "Python", "Test Automation", "WebDriver", "PyTest"],
    status: "active" as const,
  },
];
