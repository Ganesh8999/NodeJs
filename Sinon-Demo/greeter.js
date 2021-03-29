// const abc = greetName(process.argv[2]);
// console.log(abc);

// for exporting
(function (exports) {
  function greetName(name) {
    console.log("j");

    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    var now = new Date();

    var formattedDate = now.toLocaleDateString("en-US", options);

    return `Hello , ${name} Today is ${formattedDate}`;
  }

  exports.greetName = greetName;
})(this);
// function greetName(name) {
//   console.log("j");

//   var options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };

//   var now = new Date();

//   var formattedDate = now.toLocaleDateString("en-US", options);

//   return `Hello , ${name} Today is ${formattedDate}`;
// }
