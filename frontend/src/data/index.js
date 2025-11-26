import programming from '../assets/programming.png'
import language from '../assets/language.jpeg'
import skills from '../assets/skills.jpg'
export const courses = [
  {
    id: 1,
    title: "Mastering React and Zustand (The Hooks Edition)",
    img: programming,
    category: "Programming",
    price: 199.99,
    discount: 49.99,
    description:
      "دورة شاملة لبناء تطبيقات React احترافية مع إدارة الحالة بواسطة Zustand.",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Tailwind CSS 3.0: Zero to Hero",
    img: "",
    category: "Design",
    price: 99.0,
    discount: 0,
    description:
      "تعلم تصميم الواجهات بسرعة قياسية باستخدام الـ Utility Classes في Tailwind CSS.",
    rating: 4.5,
  },
  {
    id: 3,
    title: "Complete JavaScript Full Stack Developer",
    img: programming,
    category: "Programming",
    price: 249.5,
    discount: 149.5,
    description:
      "من أساسيات JavaScript حتى بناء مشاريع كاملة باستخدام MERN Stack.",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Professional Graphic Design with Adobe Suite",
    img: "",
    category: "Design",
    price: 150.0,
    discount: 110.0,
    description:
      "أتقن برامج Photoshop و Illustrator لإنشاء تصاميم جرافيكية مذهلة.",
    rating: 4.2,
  },
  {
    id: 5,
    title: "English Fluency: Advanced Conversation",
    img: language,
    category: "Languages",
    price: 79.99,
    discount: 0,
    description: "طور مهاراتك في اللغة الإنجليزية للمحادثات اليومية والعملية.",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Soft Skills for Career Success",
    img: skills,
    category: "Skills",
    price: 49.0,
    discount: 29.0,
    description: "دورة مكثفة في مهارات التفاوض، التواصل الفعّال، وإدارة الوقت.",
    rating: 4.7,
  },
  {
    id: 7,
    title: "Python for Data Science and Machine Learning",
    img: programming,
    category: "Programming",
    price: 299.0,
    discount: 199.0,
    description:
      "استكشف عالم تحليل البيانات والتعلم الآلي باستخدام لغة بايثون.",
    rating: 5.0,
  },
];

export const CATEGORIES = [
  "All",
  "Programming",
  "Languages",
  "Skills",
  "Design",
];
