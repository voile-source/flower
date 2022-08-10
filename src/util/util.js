import router from "../router/index";
//路由跳转
export function _to(url,query) {
  router.push({path:url,query:query});
}

// 节流
export function _throttle(fn, interval = 1000) {
  let last;
  let timer;
  return function () {
      let th = this
      let args = arguments;
      let now = + new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              fn(th, args);
          }, interval);
      } else {
          last = now;
          fn.apply(th, args);
      }
  }
}

// 防抖
export function _debounce(fn, delay = 1000) {
  let timer;
  return function () {
      let th = this;
      let args = arguments;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
      }, delay);
  };
}