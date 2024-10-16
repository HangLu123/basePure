// 获取assets静态资源
export const getAssetsImg = (url: string) => {
  return new URL(`../assets/img/${url}`, import.meta.url).href;
};

export const deepClone = function (value: any) {
  // 数组克隆
  if (Array.isArray(value)) {
    const clone: any[] = [];
    for (let i = 0; i < value.length; i++) {
      clone[i] = deepClone(value[i]);
    }
    return clone;
  }

  // Date类型
  if (value instanceof Date) {
    const copy = new Date();
    copy.setTime(value.getTime());
    return copy;
  }
  // 正则类型类型
  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  // 对象克隆
  if (typeof value === "object" && value !== null) {
    const clone: { [key: string]: any } = {};

    for (const key in value as object) {
      clone[key] = deepClone(value[key]);
    }
    return clone;
  }
  // string number boolean function 等属性直接返回
  return value;
};

// 深度拷贝一个节点（除了children之外的其他）属性
export const copyNodeWithoutChildren = function (value: object) {
  // 对象克隆
  if (typeof value === "object" && value !== null) {
    const clone: { [key: string]: any } = {};
    for (const key in value as object) {
      if (key !== "children") {
        clone[key] = deepClone((value as any)[key]);
      }
    }
    return clone;
  }
  return value;
};

// 实现json对象深拷贝，防止修改来源参数
export const copy = function (data: any) {
  if (data != undefined) {
    // 会丢失function属性
    return JSON.parse(JSON.stringify(data));
  } else {
    return undefined;
  }
};

// 是否是其中一个，只能是数字、字符串、boolean
const oneOf = function (value: any, validList: any[]) {
  for (const v of validList) {
    if (value === v) {
      return true;
    }
  }
  return false;
};

// 如果参数是list中的一个，则返回
export const getOneOf = function (
  value: any,
  validList: any[],
  defaultValue: any
) {
  if (oneOf(value, validList)) {
    return value;
  } else if (oneOf(defaultValue, validList)) {
    return defaultValue;
  } else {
    return undefined;
  }
};

// Icon组件在自定义图标时需将name传给custom属性，iview内置name直接传给type属性
export const getIconBindType = function (type: string) {
  if (type && type.startsWith("sys-icon-")) {
    return { custom: type };
  } else {
    return { type };
  }
};

// 2个json对象是否相等（内容完全相同）
export const isEqual = function (newVal: any, oldVal: any) {
  const nv = JSON.stringify(newVal);
  const ov = JSON.stringify(oldVal);
  return nv == ov;
};

export const formatUnit = (size: number) => {
  var int = parseInt(size);
  if (isNaN(int) || int == 0) {
    return size;
  }
  var unit = ["B", "KiB", "MiB", "GiB"].find(function (unit, index) {
    int = size / 1024;
    if (parseInt(int) !== 0) {
      if (index == 3) {
        return unit;
      }
      size = int;
    } else {
      return unit;
    }
  });
  return ((size | 0) === size ? size : size.toFixed(2)) + unit;
};

/**
 * 将日期显示为 刚刚 x分钟之前 x小时之前 x天之前 MM-dd yyyy-MM-dd
 * @param {*} timeStr yyyy-MM-dd HH:mm:ss 日期格式字符串
 */
export const toTimeLabel = function (timeStr: string, isEnLang: boolean) {
  // 非法的日期
  if (isNaN(new Date(timeStr).getTime())) {
    return timeStr;
  }
  const now = new Date();
  // 日期是否超过1年
  const time1 = new Date(timeStr);
  time1.setFullYear(time1.getFullYear() + 1);
  if (time1 < now) {
    // 显示yyyy-MM-dd
    return timeStr.substring(0, 10);
  }
  // 是否超过1周
  const time2 = new Date(timeStr);
  time2.setDate(time2.getDate() + 7);
  if (time2 < now) {
    // 显示 MM-dd
    return timeStr.substring(5, 10);
  }
  // 是否超过1天
  const time3 = new Date(timeStr);
  time3.setDate(time3.getDate() + 1);
  if (time3 < now) {
    // 显示 x天之前
    const days =
      Math.floor((now.getTime() - time3.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    if (days > 1) {
      return days + (isEnLang ? " days ago" : "天之前");
    } else {
      return isEnLang ? "a day ago" : "1天之前";
    }
  }
  // 是否超过1小时
  const time4 = new Date(timeStr);
  time4.setHours(time4.getHours() + 1);
  if (time4 < now) {
    // 显示 x小时之前
    const hours =
      Math.floor((now.getTime() - time4.getTime()) / (60 * 60 * 1000)) + 1;
    if (hours > 1) {
      return hours + (isEnLang ? " hours ago" : "小时之前");
    } else {
      return isEnLang ? "an hour ago" : "1小时之前";
    }
  }
  // 是否超过1分钟
  const time5 = new Date(timeStr);
  time5.setMinutes(time5.getMinutes() + 1);
  if (time5 < now) {
    // 显示 x分钟之前
    const minutes =
      Math.floor((now.getTime() - time5.getTime()) / (60 * 1000)) + 1;
    if (minutes > 1) {
      return minutes + (isEnLang ? " minutes ago" : "分钟之前");
    } else {
      return isEnLang ? "a minute ago" : "1分钟之前";
    }
  }
  // 1分钟之内显示刚刚
  return isEnLang ? "a second ago" : "刚刚";
};

// 提取html字符串中的文字
export const getHtmlPlainText = function (htmlStr: string) {
  const re = new RegExp("<[^<>]+>", "g");
  const text = htmlStr.replace(re, "");
  return text;
};

/**
 * @function requestDataSort 对接口返回的数据进行排序
 * @param { Array } data 需要排序的数据
 * @param { string } key 排序依据的key
 * */
export const requestDataSort = (data: any[], key: string) => {
  const newData: any = deepClone(data);
  newData.sort((prev: any, next: any) => {
    const nextVal = next[key].toLowerCase();
    const prevVal = prev[key].toLowerCase();
    if (nextVal > prevVal) {
      return -1;
    }
    if (nextVal < prevVal) {
      return 1;
    }
    return 0;
  });

  return newData;
};

export const generateRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

export const dealEmpty = (input: any) => {
  return input || input === 0 ? input : "-";
};

export const openServer = (url, title, jhDesktopId?) => {
  let win = null;
  if (jhDesktopId) {
    var DEGENERATE_CON_LOCALSTORAGE_KEY =
      "JH_DEGENERATE_CONNECTION_" + jhDesktopId;
    localStorage.removeItem(DEGENERATE_CON_LOCALSTORAGE_KEY);
  }
  if (title) {
    win = window.open(`${window.location.host}${url}`, title);
    const loop = setInterval(function () {
      if (win.closed) {
        clearInterval(loop);
      } else {
        win.document.title = title;
      }
    }, 1000);
  } else {
    win = window.open(url);
  }
};

export function initIframeWindow(target: string, catogory: string) {
  const iframeTimer = setInterval(function () {
    const iframes = (window as any).top.Appform.getWindow(
      `appwindow-${target}-1`
    ).wrapper.find("iframe:eq(0)");
    if (iframes && iframes.length) {
      const iframeWindow = iframes[0].contentWindow;
      if (iframeWindow && iframeWindow.selectNodeInit) {
        iframeWindow.selectNodeInit(catogory);
        if (iframeTimer) {
          clearInterval(iframeTimer);
        }
      }
    }
  }, 200);
}
