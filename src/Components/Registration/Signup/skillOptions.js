export const skillsOptions = [
  { value: "communication", label: "Communication" },
  { value: "teamwork", label: "Teamwork" },
  { value: "leadership", label: "Leadership" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "time-management", label: "Time Management" },
  { value: "creativity", label: "Creativity" },
  { value: "adaptability", label: "Adaptability" },
  { value: "critical-thinking", label: "Critical Thinking" },
  { value: "interpersonal-skills", label: "Interpersonal Skills" },
  { value: "emotional-intelligence", label: "Emotional Intelligence" },
  { value: "resilience", label: "Resilience" },
  { value: "stress-management", label: "Stress Management" },
  { value: "negotiation", label: "Negotiation" },
  { value: "decision-making", label: "Decision Making" },
  { value: "conflict-resolution", label: "Conflict Resolution" },
  { value: "empathy", label: "Empathy" },
  { value: "self-motivation", label: "Self-Motivation" },
  { value: "organizational-skills", label: "Organizational Skills" },
  { value: "attention-to-detail", label: "Attention to Detail" },
  { value: "analytical-skills", label: "Analytical Skills" },
  { value: "presentation-skills", label: "Presentation Skills" },
  { value: "public-speaking", label: "Public Speaking" },
  { value: "project-management", label: "Project Management" },
  { value: "research", label: "Research" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "computer-literacy", label: "Computer Literacy" },
  { value: "coding", label: "Coding" },
  { value: "web-design", label: "Web Design" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "video-editing", label: "Video Editing" },
  { value: "photography", label: "Photography" },
  { value: "writing", label: "Writing" },
  { value: "editing", label: "Editing" },
  { value: "proofreading", label: "Proofreading" },
  { value: "foreign-languages", label: "Foreign Languages" },
  { value: "teaching", label: "Teaching" },
  { value: "mentoring", label: "Mentoring" },
  { value: "coaching", label: "Coaching" },
  { value: "training", label: "Training" },
  { value: "public-relations", label: "Public Relations" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "customer-service", label: "Customer Service" },
  { value: "accounting", label: "Accounting" },
  { value: "finance", label: "Finance" },
  { value: "business-development", label: "Business Development" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "product-management", label: "Product Management" },
  { value: "supply-chain-management", label: "Supply Chain Management" },
  { value: "operations-management", label: "Operations Management" },
  { value: "human-resources", label: "Human Resources" },
  { value: "health-and-safety", label: "Health and Safety" },
  { value: "quality-assurance", label: "Quality Assurance" },
  { value: "risk-management", label: "Risk Management" },
  { value: "networking", label: "Networking" },
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "cloud-computing", label: "Cloud Computing" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "blockchain", label: "Blockchain" },
  { value: "internet-of-things", label: "Internet of Things (IoT)" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "content-management", label: "Content Management" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "social-media", label: "Social Media" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "game-development", label: "Game Development" },
  { value: "virtual-reality", label: "Virtual Reality" },
  { value: "augmented-reality", label: "Augmented Reality" },
  { value: "robotics", label: "Robotics" },
  { value: "automation", label: "Automation" },
  { value: "data-visualization", label: "Data Visualization" },
  { value: "user-experience", label: "User Experience (UX)" },
  { value: "user-interface", label: "User Interface (UI)" },
  { value: "customer-experience", label: "Customer Experience (CX)" },
  { value: "business-analysis", label: "Business Analysis" },
  { value: "agile-methodologies", label: "Agile Methodologies" },
  { value: "scrum", label: "Scrum" },
  { value: "lean-six-sigma", label: "Lean Six Sigma" },
  { value: "project-planning", label: "Project Planning" },
  {
    value: "business-process-improvement",
    label: "Business Process Improvement",
  },
  { value: "change-management", label: "Change Management" },
  { value: "conflict-resolution", label: "Conflict Resolution" },
  { value: "emotional-intelligence", label: "Emotional Intelligence" },
  { value: "influencing-skills", label: "Influencing Skills" },
  { value: "networking-skills", label: "Networking Skills" },
  { value: "presentation-skills", label: "Presentation Skills" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "team-building", label: "Team Building" },
  { value: "training-and-development", label: "Training and Development" },
];

export const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "arabic", label: "Arabic" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
];

// Function to compare options by their label property
function compareLabels(a, b) {
  const labelA = a.label.toUpperCase();
  const labelB = b.label.toUpperCase();

  if (labelA < labelB) {
    return -1;
  }
  if (labelA > labelB) {
    return 1;
  }

  return 0;
}

const TitleOptions = [
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Deep Learning", label: "Deep Learning" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "Data Engineer", label: "Data Engineer" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "QA Engineer", label: "QA Engineer" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Project Manager", label: "Project Manager" },
  { value: "Business Analyst", label: "Business Analyst" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "System Administrator", label: "System Administrator" },
  { value: "Network Engineer", label: "Network Engineer" },
  { value: "Database Administrator", label: "Database Administrator" },
  { value: "Cloud Architect", label: "Cloud Architect" },
  { value: "Security Analyst", label: "Security Analyst" },
  { value: "Content Writer", label: "Content Writer" },
  { value: "Copywriter", label: "Copywriter" },
  { value: "Graphic Designer", label: "Graphic Designer" },
  { value: "Marketing Manager", label: "Marketing Manager" },
  { value: "Social Media Manager", label: "Social Media Manager" },
  {
    value: "Search Engine Optimization (SEO) Specialist",
    label: "SEO Specialist",
  },
  { value: "Human Resources (HR) Specialist", label: "HR Specialist" },
  { value: "Recruiter", label: "Recruiter" },
  { value: "Sales Representative", label: "Sales Representative" },
  { value: "Financial Analyst", label: "Financial Analyst" },
  { value: "Project Accountant", label: "Project Accountant" },

  { value: "Lawyer", label: "Lawyer" },
  { value: "Paralegal", label: "Paralegal" },
  { value: "Nurse", label: "Nurse" },
  { value: "Teacher", label: "Teacher" },
  { value: "Professor", label: "Professor" },

  { value: "Mechanical Engineer", label: "Mechanical Engineer" },
  { value: "Electrical Engineer", label: "Electrical Engineer" },
  // Content & Marketing
  { value: "Content Writer", label: "Content Writer" },
  { value: "Copywriter", label: "Copywriter" },
  { value: "Editor", label: "Editor" },
  { value: "Social Media Manager", label: "Social Media Manager" },
  {
    value: "Search Engine Marketing (SEM) Specialist",
    label: "SEM Specialist",
  },
  { value: "Public Relations (PR) Specialist", label: "PR Specialist" },

  // Human Resources & Sales
  { value: "Human Resources (HR) Specialist", label: "HR Specialist" },
  { value: "Recruiter", label: "Recruiter" },
  { value: "Sales Representative", label: "Sales Representative" },
  { value: "Account Manager", label: "Account Manager" },
  { value: "Business Development Representative (BDR)", label: "BDR" },
  { value: "Customer Success Manager", label: "Customer Success Manager" },

  // Finance & Business Development
  { value: "Financial Analyst", label: "Financial Analyst" },
  { value: "Project Accountant", label: "Project Accountant" },
  {
    value: "Business Development Manager",
    label: "Business Development Manager",
  },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Management Consultant", label: "Management Consultant" },

  // Law
  { value: "Lawyer", label: "Lawyer" },
  { value: "Paralegal", label: "Paralegal" },
  { value: "Compliance Officer", label: "Compliance Officer" },

  // Healthcare
  { value: "Doctor", label: "Doctor" },
  { value: "Nurse", label: "Nurse" },
  { value: "Physician Assistant (PA)", label: "Physician Assistant" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Therapist", label: "Therapist" },

  // Additional Medical Fields
  { value: "Surgeon", label: "Surgeon" },
  { value: "Anesthesiologist", label: "Anesthesiologist" },
  { value: "Radiologist", label: "Radiologist" },
  { value: "Cardiologist", label: "Cardiologist" },
  { value: "Dermatologist", label: "Dermatologist" },
  { value: "Dentist", label: "Dentist" },
  { value: "Ophthalmologist", label: "Ophthalmologist" },
  { value: "Psychiatrist", label: "Psychiatrist" },
  { value: "Veterinarian", label: "Veterinarian" },
  { value: "Epidemiologist", label: "Epidemiologist" },
  { value: "Public Health Specialist", label: "Public Health Specialist" },
  { value: "Registered Nurse (RN)", label: "Registered Nurse" },
  {
    value: "Licensed Practical Nurse (LPN)",
    label: "Licensed Practical Nurse",
  },
  { value: "Medical Assistant", label: "Medical Assistant" },
  { value: "Phlebotomist", label: "Phlebotomist" },
  { value: "Radiologic Technologist", label: "Radiologic Technologist" },
  { value: "Optician", label: "Optician" },
  { value: "Physical Therapist", label: "Physical Therapist" },
  { value: "Occupational Therapist", label: "Occupational Therapist" },
  {
    value: "Speech-Language Pathologist",
    label: "Speech-Language Pathologist",
  },

  // Education
  { value: "Teacher", label: "Teacher" },
  { value: "Professor", label: "Professor" },
  { value: "Instructional Designer", label: "Instructional Designer" },
  { value: "School Counselor", label: "School Counselor" },

  // Construction & Engineering
  {
    value: "Project Manager (Construction)",
    label: "Construction Project Manager",
  },
  { value: "Architect", label: "Architect" },
  { value: "Civil Engineer", label: "Civil Engineer" },
  { value: "Mechanical Engineer", label: "Mechanical Engineer" },
  { value: "Electrical Engineer", label: "Electrical Engineer" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Chemical Engineer", label: "Chemical Engineer" },
  { value: "Industrial Engineer", label: "Industrial Engineer" },

  // Creative & Design
  { value: "Graphic Designer", label: "Graphic Designer" },
  { value: "Web Designer", label: "Web Designer" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "Animator", label: "Animator" },
  { value: "Interior Designer", label: "Interior Designer" },
  { value: "Fashion Designer", label: "Fashion Designer" },

  // Other
  { value: "Project Manager", label: "Project Manager" },
  { value: "Translator", label: "Translator" },
  {
    value: "Customer Service Representative",
    label: "Customer Service Representative",
  },
];

// Function to remove duplicates based on the value property
const removeDuplicates = (array, key) => {
  return [...new Map(array.map((item) => [item[key], item])).values()];
};

// Remove duplicates bHased on the 'value' property
const uniqueTitleOptions = removeDuplicates(TitleOptions, "value");

// Sorting the options array by label
export const titleOptions = uniqueTitleOptions.sort(compareLabels);
