export function delay(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res("ok");
      console.log(this.name);
    }, ms);
  });
}

export function readFile(filename, callback) {
  setTimeout(() => {
    callback(null, filename + "content");
  }, 1000);
}
