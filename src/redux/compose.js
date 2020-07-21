function add1(next) {
  console.log("1");
  return () => {
    console.log("add1\n" + next);
    return 1 + next();
  };
}
function add2(next) {
  console.log("2");
  return () => {
    console.log("add2\n" + next);
    return 2 + next();
  };
}
function add3(next) {
  console.log("3");
  return () => {
    console.log("add3\n" + next);
    return 3 + next;
  };
}

function compose(...fns) {
  if (fns.length === 0) return (...args) => args;
  if (fns.length === 1) return fns[0];
  return function (...args) {
    let last = fns.pop();
    // console.log(last + "假的");
    let value = last(...args);
    return fns.reduceRight((prev, cur) => {
      return cur(prev);
    }, value);
  };
}

const result = compose(add1, add2, add3)("tony");
console.log(result());
// result();
