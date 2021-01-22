// 用来实现发布订阅机制
function createChannel() {
  let currentTakers = [];
  // 使用effects中的take, taker就是生成器函数的next
  // 注册监听  actiontype: ASYNC_ADD
  function take(actionType, taker) {
    taker.actionType = actionType;
    taker.cancel = () => {
      currentTakers = currentTakers.filter((item) => item !== taker);
    };
    currentTakers.push(taker);
  }
  // 使用effects中的put
  // 触发监听
  function channelPut(action) {
    currentTakers.forEach((taker) => {
      if (taker.actionType === action.type) {
        // taker是一次性的，触发完之后要取消监听
        // 下次take再注册监听
        taker.cancel();
        // action应该是 ADD 但是现在是ASYNC_ADD
        taker(action);
      }
    });
  }
  return {
    take,
    channelPut,
  };
}

export default createChannel;
