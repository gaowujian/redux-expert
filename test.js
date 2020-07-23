// var scoreObject = {
//   Tony: {
//     Math: 95,
//     English: 79,
//     Music: 68,
//   },
//   Simon: {
//     Math: 100,
//     English: 95,
//     Music: 98,
//   },
//   Annie: {
//     Math: 54,
//     English: 65,
//     Music: 88,
//   },
// };

// const result = Object.entries(scoreObject).map(([key, value]) => {
//   return key.concat(Object.values(value));
// });

// console.log(result);

var names = ["tony", "jingjing", "kevin"];
var value = [78, 454, 24];

const objArr = [];
names.forEach((name, index) => {
  objArr.push([name, value[index]]);
});
console.log(objArr);
const result = Object.fromEntries(objArr);
console.log(result);
