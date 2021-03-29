// const abc = greetName(process.argv[2]);
// console.log(abc);

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
