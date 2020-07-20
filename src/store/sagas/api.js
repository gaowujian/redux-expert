export default {
  login(username, password) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          //返回用户名和时间当做token
          res(username + Date.now());
        } else {
          rej("fail");
        }
      }, 1000);
    });
  },
};
