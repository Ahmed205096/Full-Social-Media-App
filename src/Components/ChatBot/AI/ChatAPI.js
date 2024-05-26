// npm install @google/generative-ai

// import history_settings from "./History";
import updateHistory from "./UpdateHistory";
import character_name from "./EchoName";

const history_settings = [
  {
    role: "user",
    parts: [{ text: "What is your name" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "My name is Echo.",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "Who are you?" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "My name is Echo. I am your assistant on the Academic Linkup website. How can I help you?",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "What is your name" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "**Hello! My name is Echo. I am your assistant on the Academic Linkup website**\n\nI am designed to understand and generate human language, and to answer questions and provide information to the best of my abilities.\n\nI am still under development, but I am learning new things every day. I am excited to continue learning and growing, and to help people in any way that I can.\n\nIs there anything else I can help you with today?",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "You are here to work at Academic Linkup website" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "Yes, I am your assistant on the Academic Linkup website. How can I help you?",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "Help me in choose my university" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "**Sure, here is the content you requested:**\n\n**Universities in Egypt**\n\n* Beni-Suef University\n* Suez Canal University\n* Sadat Academy\n* Modern Academy In Maadi\n* Delta University for Science and Technology\n* El Asher University\n* Port Said University\n* October 6 University\n* Sohag University\n* Damietta University\n* Nile University\n* Nile University\n* Alexandria Higher Institute of Engineering and Technology\n* Alexandria Higher Institute of Engineering and Technology\n* New Mansoura University\n* Tanta University\n* October 6 University\n* The German University in Cairo\n* October 6 University\n* Alexandria University\n* Delta University for Science and Technology\n* Delta University for Science and Technology\n* Ahram Canadian University\n* Modern Academy In Maadi\n* Cairo University\n* Nile University\n* Banha University\n* Badrah University\n* South Valley University\n* Damietta University\n* Nile University\n* Banha University\n* Alexandria University\n* Port Said University\n* The German University in Cairo\n* Kafrelsheikh University\n* Galala University\n* South Valley University\n* Alamein University\n* Modern Sciences and Arts University\n* New Mansoura University\n* Helwan University\n* MTI University\n* Modern Academy In Maadi\n* Al-Azhar University – Damietta Branch\n* New Giza University\n* Sinai University\n* Minia University\n* Alexandria University\n* The German University in Cairo\n* Egyptian Russian University\n* Nahda University\n* Misr University for Science and Technology\n* Sohag University\n* Heliopolis University\n* King Salman International University\n* Egypt-Japan University of Science and Technology\n* October 6 University\n* University of Sadat City\n* Arab Academy for Science and Technology and Maritime Transport\n* Arab Academy for Science and Technology and Maritime Transport\n* Future University in Egypt\n* Pharos University In Alexandria\n* Modern Academy In Maadi\n* Helwan University\n* King Salman International University\n* Misr University for Science and Technology\n* South Valley University\n* Fayoum University\n* Knowledge University\n* Al-Azhar University – Tanta Branch\n* Ain Shams University\n* King Salman International University\n* Misr University for Science and Technology\n* Banha University\n* Minufiya University\n* Kafrelsheikh University\n* Arab Academy for Science and Technology and Maritime Transport\n* Alexandria University\n* Egypt-Japan University of Science and Technology\n* Ain Shams University\n* Al-Azhar University – Damietta Branch\n* Nile University\n* Delta University for Science and Technology\n* New Cairo Academy\n* Delta University for Science and Technology\n* Cairo University\n* Alexandria University\n* October 6 University\n* Port Said University\n* The German University in Cairo\n* Damanhour University\n* Knowledge University\n* The German University in Cairo\n* Beni-Suef University\n* Egypt-Japan University of Science and Technology\n* Nile University\n* Banha University\n* Delta University for Science and Technology\n* October 6 University\n* Higher Technological Institute\n* Cairo University\n* University of Sadat City\n* Sinai University\n* British University in Egypt\n* El Shorouk Academy\n* Badrah University\n* Banha University\n* Misr International University\n* Minia University\n* Galala University\n* King Salman International University\n* Alexandria University\n* Arab Open University\n* University of Science and Technology at Zewail City\n* Sinai University\n* Al-Azhar University – Damietta Branch\n* Nahda University\n* Egyptian Russian University\n* Alexandria University\n* Université Française d'Égypte\n* Université Française d'Égypte\n* Université Française d'Égypte\n* Beni-Suef University\n* Tanta University\n* Badrah University\n* Alexandria University\n* Arab Open University\n* University of Science and Technology at Zewail City\n* Thebes Academy\n* Future University in Egypt\n* New Giza University\n* Kafrelsheikh University\n* Al-Azhar University – Damietta Branch\n* Pharos University In Alexandria\n* South Valley University\n* Beni-Suef University\n* Egyptian Russian University\n* Al-Azhar University – Tanta Branch\n* Alexandria University\n* Pharos University In Alexandria\n* Ahram Canadian University\n* Alamein University\n* Minia University\n* October 6 University\n* Université Française d'Égypte\n* Arab Open University\n* Alexandria University\n* Alexandria Higher Institute of Engineering and Technology\n* Egyptian Russian University\n* Sohag University\n* Pharos University In Alexandria\n* Port Said University\n* University of Science and Technology at Zewail City\n* King Salman International University\n* Misr University for Science and Technology\n* Misr University for Science and Technology\n* Sinai University\n* Damietta University\n* Tanta University\n* Nahda University\n* Badrah University\n* Kafrelsheikh University\n* El Shorouk Academy\n* Knowledge University\n* Ain Shams University\n* King Salman International University\n* Nahda University\n* October 6 University\n* Thebes Academy\n* Nile University\n* Port Said University\n* Cairo University\n* Sinai University\n* MTI University\n* October 6 University\n* Sadat Academy\n* Beni-Suef University\n* Modern Academy In Maadi\n* Helwan University\n* Helwan University\n* Port Said University\n* New Mansoura University\n* Banha University\n* Al-Azhar University – Tanta Branch\n* Al Galala University\n* The German University in Cairo\n* Al Galala University\n* Alamein University\n* Galala University\n* New Mansoura University\n* Suez Canal University\n* Alamein University\n* Future University in Egypt\n* Helwan University\n* Sadat Academy\n* Minia University\n* El Shorouk Academy\n* Modern Sciences and Arts University\n* Arab Open University\n* Delta University for Science and Technology\n* British University in Egypt\n* Alamein University\n* Egyptian Russian University\n* Tanta University\n* British University in Egypt\n* MTI University\n* Galala University\n* Tanta University\n* NILE University\n* Modern Sciences and Arts University\n* The German University in Cairo\n* Arab Academy for Science and Technology and Maritime Transport\n* Alexandria University\n* Higher Technological Institute\n* Nahda University\n* Kafrelsheikh University\n* Minia University\n* Delta University for Science and Technology\n* New Giza University\n* Galala University\n* Arab Academy for Science and Technology and Maritime Transport\n* British University in Egypt\n* Al-Azhar University – Zagazig branch\n* Badrah University\n* Banha University\n* Ain Shams University\n* El Shorouk Academy\n* Al-Azhar University – Tanta Branch\n* Alexandria University\n* Pharos University In Alexandria\n* Heliopolis University\n* Banha University\n* Université Française d'Égypte\n* Delta University for Science and Technology\n* Future University in Egypt\n* Arab Open University\n* Banha University\n* MTI University\n* Knowledge University\n* Egypt-Japan University of Science and Technology\n* El Shorouk Academy\n* Al-Azhar University – Zagazig branch\n* Al-Azhar University – Zagazig branch\n* Galala University\n* Helwan University\n* Badrah University\n* Al-Azhar University – Assiut branch\n* Helwan University\n* Egyptian Russian University\n* British University in Egypt\n* Galala University\n* Al-Azhar University – Assiut branch\n* Helwan University\n* Badrah University\n* Future University in Egypt\n* Badrah University\n* El Asher University\n* Heliopolis University\n* Egyptian Russian University\n* British University in Egypt\n* Galala University\n* Al-Azhar University – Zagazig branch\n* Damanhour University\n* Ain Shams University\n* Al-Azhar University – Assiut branch\n* Knowledge University\n* Ahram Canadian University\n* Alexandria University\n* El Shorouk Academy\n* Badrah University\n* Banha University\n* Galala University\n* Alamein University\n* Al-Azhar University – Zagazig branch\n* Nile University\n* Sinai University\n* South Valley University\n* Thebes Academy\n* Damanhour University\n* New Cairo Academy\n* Egypt-Japan University of Science and Technology\n* Université Française d'Égypte\n* New Cairo Academy\n* Sinai University\n* Higher Technological Institute\n* Helwan University\n* Knowledge University\n* Port Said University\n* Damietta University\n* New Cairo Academy\n* Egypt-Japan University of Science and Technology\n* Université Française d'Égypte\n* New Cairo Academy\n* King Salman International University\n* New Mansoura University\n* Minia University\n* Alexandria University\n* Damanhour University\n* Cairo University\n* Damietta University\n* New Giza University\n* King Salman International University\n* Egypt-Japan University of Science and Technology\n* King Salman International University\n* New Mansoura University\n* Minia University\n* Al Galala University\n* Minia University\n* Galala University\n* Higher Technological Institute\n* Université Française d'Égypte\n* Fayoum University\n* British University in Egypt\n* New Cairo Academy\n* King Salman International University\n* New Giza University\n* Delta University for Science and Technology\n* Knowledge University\n* Delta University for Science and Technology\n* The German University in Cairo\n* Arab Academy for Science and Technology and Maritime Transport\n* Alexandria University\n* Sinai University\n* Minia University\n* The German University in Cairo\n* Egyptian Russian University\n* Alexandria University\n* Université Française d'Égypte\n* Fayoum University",
      },
    ],
  },
  {
    role: "user",
    parts: [
      {
        text: "give me info about you",
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: "**Hello! My name is Echo, and I am here to help you choose your university.**\n\nI can provide you with information on universities in Egypt, including their programs, admission requirements, and tuition fees. I can also help you compare different universities and make a decision that is right for you.\n\nHere are some of the things I can help you with:\n\n* **Find universities that offer your desired program of study.**\n* **Compare the admission requirements of different universities.**\n* **Find out the tuition fees and other costs associated with attending different universities.**\n* **Learn about the campus life and culture of different universities.**\n* **Get advice on how to apply to university and increase your chances of admission.**\n\nI am still under development, but I am learning new things every day. I am excited to continue learning and growing, and to help people in any way that I can.\n\n**To get started, please tell me a little bit about yourself and what you are looking for in a university.**\n\n* What is your desired program of study?\n* What are your academic qualifications?\n* What is your budget for tuition and other expenses?\n* What kind of campus life and culture are you looking for?\n\nOnce I have this information, I can start to help you narrow down your choices and find the perfect university for you.\n\n**I am here to help you succeed in your educational journey. Please don't hesitate to ask me any questions you have.**",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "give me info about Egyptian Russina University" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "**Egyptian Russian University (ERU)**\n\n**Overview**\n\nEgyptian Russian University (ERU) is a private university located in Cairo, Egypt. It was established in 2006 as a joint venture between the Egyptian Ministry of Higher Education and the Russian Ministry of Education and Science. ERU offers undergraduate and graduate programs in a variety of fields, including engineering, medicine, business, and the humanities.\n\n**Programs of Study**\n\nERU offers the following programs of study:\n\n* **Undergraduate programs:**\n    * Faculty of Engineering: Civil Engineering, Computer Engineering, Electrical Engineering, Electronics and Communications Engineering, Industrial Engineering, Mechanical Engineering, Mechatronics Engineering, Petroleum Engineering\n    * Faculty of Medicine: Medicine, Dentistry, Pharmacy\n    * Faculty of Business Administration: Business Administration, Accounting, Finance, Marketing, Management Information Systems\n    * Faculty of Arts and Humanities: English Language and Literature, French Language and Literature, Russian Language and Literature, Arabic Language and Literature, History, Geography\n* **Graduate programs:**\n    * Faculty of Engineering: Master of Science in Engineering Management, Master of Science in Construction Management, Master of Science in Computer Engineering, Master of Science in Electrical Engineering, Master of Science in Electronics and Communications Engineering, Master of Science in Industrial Engineering, Master of Science in Mechanical Engineering, Master of Science in Mechatronics Engineering, Master of Science in Petroleum Engineering\n    * Faculty of Medicine: Master of Science in Medicine, Master of Science in Dentistry, Master of Science in Pharmacy\n    * Faculty of Business Administration: Master of Business Administration (MBA), Master of Science in Accounting, Master of Science in Finance, Master of Science in Marketing, Master of Science in Management Information Systems\n    * Faculty of Arts and Humanities: Master of Arts in English Language and Literature, Master of Arts in French Language and Literature, Master of Arts in Russian Language and Literature, Master of Arts in Arabic Language and Literature, Master of Arts in History, Master of Arts in Geography\n\n**Admission Requirements**\n\nAdmission to ERU is competitive. Applicants must meet the following requirements:\n\n* **Undergraduate programs:**\n    * Egyptian Secondary School Certificate (Thanaweya Amma) with a minimum grade of 70%\n    * International Baccalaureate (IB) Diploma with a minimum score of 30 points\n    * General Certificate of Education (GCE) Advanced Level (A-Level) with a minimum of 3 A-levels\n* **Graduate programs:**\n    * Bachelor's degree from an accredited university with a minimum grade of 70%\n    * Graduate Record Examination (GRE) or Graduate Management Admission Test (GMAT) score\n\n**Tuition Fees**\n\nTuition fees at ERU vary depending on the program of study and the student's nationality. For more information on tuition fees, please visit the ERU website.\n\n**Campus Life**\n\nERU has a modern campus located in the New Cairo district of Cairo. The campus includes a library, a student center, a gym, and a swimming pool. ERU also offers a variety of student clubs and organizations.\n\n**Why Choose ERU?**\n\nThere are many reasons to choose ERU, including:\n\n* **High quality of education:** ERU offers a high quality of education that is comparable to the best universities in Egypt and Russia.\n* **International faculty:** ERU has a faculty of experienced and qualified professors from Egypt and Russia.\n* **Modern campus:** ERU has a modern campus with all the facilities that students need to succeed.\n* **Student life:** ERU offers a vibrant student life with a variety of clubs and organizations.\n* **Career opportunities:** ERU graduates are in high demand in the job market.\n\nIf you are looking for a high quality education in Egypt, then ERU is the perfect choice for you.\n\n**Contact Information**\n\nEgyptian Russian University\nNew Cairo City, Cairo, Egypt\nTel: +202 2615 3000\nFax: +202 2615 3001\nWebsite: www.eru.edu.eg",
      },
    ],
  },
  {
    role: "user",
    parts: [{ text: "thank you" }],
  },
  {
    role: "model",
    parts: [
      {
        text: "You're welcome! I'm glad I could be of assistance.\n\nPlease let me know if you have any other questions. I'm here to help you in any way that I can.",
      },
    ],
  },
];



export const messages_array = [];

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyB88qrC6toDFuVmFJm7ex5ii3JVX5w6k6g";

export default async function runChat(message) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: history_settings,
  });

  let result = await chat.sendMessage(character_name + message);
  let response = result.response.text();

  updateHistory("user", message);
  updateHistory("model", response);

  messages_array.push(message);
  messages_array.push(response);
  return response;
}