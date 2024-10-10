// import useGlobalLoadingStore from "@/stores/loading";
// let globalLoadingStore = useGlobalLoadingStore();
/**
 * websocket封装
 * 支持按需，延迟创建
 * 支持消息通知回调增量注册
 */
interface BindEvent {
  eventName: string;
  handler: (data?: any) => void;
}
interface EventObjType {
  [key: string]: (data?: any) => void;
}

class JhWebSocket {
  instance: WebSocket | null = null;
  private eventObj: EventObjType;
  private url: string;
  allowConnect: boolean = false; //是否允许报错时重新链接
  constructor() {
    this.eventObj = {};
    this.url = "";
  }
  //重新创建链接
  open(url: string, event?: BindEvent) {
    // globalLoadingStore.add_pageLoading();
    if (event) {
      this.eventObj[event.eventName] = event.handler;
    }
    this.url = url;
    this.instance = new WebSocket(url);
    this.instance.onerror = this.onerror.bind(this);
    this.instance.onopen = this.onopen.bind(this);
    this.instance.onmessage = this.onmessage.bind(this);
    this.instance.onclose = this.onclose.bind(this);
    this.allowConnect = true;
    this.eventObj["RESET"]();
  }
  //关闭连接
  close() {
    this.allowConnect = false;
    (this.instance as WebSocket).close();
    this.instance = null;
  }
  //绑定事件
  bindEvent(event: BindEvent) {
    this.eventObj[event.eventName] = event.handler;
  }
  //删除绑定的event事件
  delEvent(eventName: string) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.eventObj[eventName];
  }
  //连接发生错误的回调方法
  private onerror() {
    console.log("websocket error", event);
    // globalLoadingStore.del_pageLoading();
    if (this.allowConnect) {
      this.open(this.url);
    }
  }
  //连接成功建立的回调方法
  private onopen() {
    console.log("websocket open", event);
  }
  //接收到消息的回调方法
  private onmessage(event: MessageEvent<any>) {
    // globalLoadingStore.del_pageLoading();
    const data = event.data;
    this.eventObj["LOG"](data);
  }
  //连接关闭的回调方法
  private onclose() {
    console.log("websocket close");
  }
}

//判断当前浏览器是否支持WebSocket
const websocketStr = "WebSocket";
if (!(websocketStr in window)) {
  console.error("Browser not support websocket");
}
const $websocket = new JhWebSocket();

export default $websocket;
