const axios = require("axios");

// axios
//   .post("http://localhost:3000/api/category", { name: "test" })
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

axios
  .delete("http://localhost:3000/api/courses/3",)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
