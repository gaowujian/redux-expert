export function delay(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res("ok");
      console.log(this.name);
    }, ms);
  });
}
