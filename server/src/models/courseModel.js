// src/models/courseModel.js

let courses = [
    // --- Category 1: Programming ---
    { 
        id: 1, 
        title: "Complete React Developer Guide", 
        instructor: "Andrew Mead", 
        duration: 40, 
        description : "ahaaaaaaaaaaaaaaaa",
        difficulty: "Intermediate",
        img : "https://www.classcentral.com/report/wp-content/uploads/2022/03/Frame-3.png",
        categoryId: 1,
        price: 100, 
        lessons: [
            { id: 1, title: "Introduction to React", content: "Understanding the Virtual DOM", duration: "10 mins" },
            { id: 2, title: "JSX Basics", content: "Writing HTML inside JavaScript", duration: "15 mins" },
            { id: 3, title: "Components & Props", content: "Reusing UI logic", duration: "20 mins" }
        ]
    },
    { 
        id: 2, 
        title: "Node.js: The Complete Bootcamp", 
        instructor: "Jonas Schmedtmann", 
        duration: 35, 
        difficulty: "Advanced",
        categoryId: 1,
        img : "https://www.classcentral.com/report/wp-content/uploads/2022/03/Frame-3.png",
        price: 120,
        lessons: [
            { id: 1, title: "Node.js Architecture", content: "Event Loop and Thread Pool", duration: "25 mins" },
            { id: 2, title: "Modules System", content: "Importing and Exporting", duration: "15 mins" }
        ]
    },
    { 
        id: 3, 
        title: "Python for Data Science", 
        instructor: "Jose Portilla", 
        duration: 25, 
        difficulty: "Beginner",
        categoryId: 1,
        img : "https://www.classcentral.com/report/wp-content/uploads/2022/03/Frame-3.png",
        price: 90,
        lessons: [
            { id: 1, title: "Python Setup", content: "Installing Anaconda", duration: "10 mins" },
            { id: 2, title: "Variables and Types", content: "Numbers, Strings, and Lists", duration: "30 mins" }
        ]
    },

    // --- Category 2: Languages ---
    { 
        id: 4, 
        title: "Learn Spanish: Zero to Hero", 
        instructor: "Maria Rodriguez", 
        duration: 20, 
        difficulty: "Beginner",
        categoryId: 2,
        img : "https://www.llinstitute.com/wp-content/uploads/2022/12/feature-image.png",
        price: 50,
        lessons: [
            { id: 1, title: "The Alphabet", content: "Pronunciation basics", duration: "15 mins" },
            { id: 2, title: "Common Greetings", content: "Hola, Como estas?", duration: "10 mins" }
        ]
    },
    { 
        id: 5, 
        title: "Business English Masterclass", 
        instructor: "Robert Smith", 
        duration: 15, 
        difficulty: "Intermediate",
        categoryId: 2,
        img : "https://www.llinstitute.com/wp-content/uploads/2022/12/feature-image.png",
        price: 80,
        lessons: [
            { id: 1, title: "Email Etiquette", content: "Writing professional emails", duration: "20 mins" },
            { id: 2, title: "Meeting Vocabulary", content: "How to speak in meetings", duration: "15 mins" }
        ]
    },

    // --- Category 3: Soft Skills ---
    { 
        id: 6, 
        title: "Public Speaking & Communication", 
        instructor: "Julian Treasure", 
        duration: 5, 
        difficulty: "Beginner",
        categoryId: 3,
        img  :"https://www.totalsuccess.co.uk/wp-content/uploads/2018/06/iStock-637711196_super-scaled.jpg",
        price: 40,
        lessons: [
            { id: 1, title: "Overcoming Fear", content: "Psychological tricks", duration: "12 mins" },
            { id: 2, title: "Body Language", content: "Using your hands effectively", duration: "18 mins" }
        ]
    },
    { 
        id: 7, 
        title: "Time Management for Productivity", 
        instructor: "Brian Tracy", 
        duration: 3, 
        difficulty: "All Levels",
        categoryId: 3,
        price: 30,
        lessons: [
            { id: 1, title: "The 80/20 Rule", content: "Pareto Principle explained", duration: "10 mins" },
            { id: 2, title: "Eliminating Distractions", content: "Deep work techniques", duration: "15 mins" }
        ]
    }
];

module.exports = courses;