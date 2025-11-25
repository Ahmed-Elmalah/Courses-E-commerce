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
  .delete("http://localhost:3000/api/category/4",)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
