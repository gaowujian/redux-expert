function* rootSaga() {
  const a = yield console.log("hello world");
  console.log(a);
}
export default rootSaga;
