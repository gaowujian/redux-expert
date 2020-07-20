let observer = {};

function take(actionType, listener) {
  observer[actionType] = listener;
}

take("ASYNC_INCREMENT", () => {
  console.log("code runner");
});

function fire(actionType) {
  observer[actionType] && observer[actionType]();
  //   delete observer[actionType];
}

fire("ASYNC_INCREMENT");
fire("ASYNC_INCREMENT");
