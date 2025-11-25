const axios = require("axios");
const newCourse = {
  title: "testttt",
  instructor: "ahmed",
  duration: 20,
  difficulty: "Advanced",
  categoryId: 3,
  lessons: [
    {title: "aha" , content : "how to say aha", duration : "1 min"}
  ]
};

axios
  .post("http://localhost:3000/api/courses", newCourse)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// axios
//   .delete("http://localhost:3000/api/courses/8",)
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
