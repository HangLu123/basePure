<template>
  <div ref="terminal" class="show-info" />
</template>

<script setup lang="ts" name="terminal">
import { onMounted, onUnmounted, ref } from "vue";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from "@xterm/addon-fit";
import { useI18n } from "vue-i18n";
import $websocket from "@/utils/web-socket";

const { t } = useI18n();
const terminal = ref(null); // 这是 DOM 的 ref
let term: Terminal | null = null; // 需要在组件销毁时销毁 Terminal 实例
let socket: WebSocket | null = null;

const props = defineProps<{
  detailInfo: any;
}>();

const onmessage = (msg: any) => {
  console.log(123);
};

function resetLog() {
  console.log(123);
}

function addSSE() {
  if (!$websocket.instance) {
    const userName =
      localStorage.getItem("APPFORM_LOGIN_NAME") ||
      localStorage.getItem("SYSADMIN_LOGIN_NAME");
    const ws = location.protocol == "https:" ? "wss:" : "ws:";
    // websocket主机名 如果配置了，使用已配置的，如果未配置动态读取

    // const url = `${ws}//${window.location.host}/jhai/log/${userName}/${userName}/${props.jobId}`;
    const url = `/jhai/ws/client/ubuntu22gfbai:2375/container/88ae248f8f8ba317d981a8149ab6dcbaaeeba9e77d8ebb88fb26bb385ea56b17/terminal/L2Jpbi9iYXNo`;
    $websocket.open(url, {
      eventName: "RESET",
      handler: resetLog
    });
    $websocket.bindEvent({
      eventName: "LOG",
      handler: onmessage
    });
  }
}

onMounted(() => {
  $websocket && $websocket.instance && $websocket.close();
  addSSE();
  // 初始化 Terminal 实例
  const rowNum = 30; // 设置行数
  const colNum = 100; // 设置列数
  term = new Terminal({
    rows: rowNum, //行数
    cols: colNum, // 设置之后会输入多行之后覆盖现象
    fontFamily: 'monaco, Consolas, "Lucida Console", monospace',
    convertEol: false, //启用时，光标将设置为下一行的开头
    fontSize: 18, //字体大小
    tabStopWidth: 4,
    theme: {
      foreground: "#FFFFFF",
      background: "#1b1b1b",
      black: "#000000",
      brightBlack: "#555555",
      red: "#F00",
      brightRed: "#ef4f4f",
      green: "#67c23a",
      brightGreen: "#67c23a",
      yellow: "#e6a23c",
      brightYellow: "#e6a23c",
      blue: "#409eff",
      brightBlue: "#409eff",
      magenta: "#ef4f4f",
      brightMagenta: "#ef4f4f",
      cyan: "#17c0ae",
      brightCyan: "#17c0ae",
      white: "#bbbbbb",
      brightWhite: "#ffffff"
    }
  });

  // 初始化 WebSocket 连接
  // socket = new WebSocket(
  //   "wss://docker.example.com/containers/mycontainerid/attach/ws"
  // );

  const attachAddon = new AttachAddon($websocket.instance);
  const fitAddon = new FitAddon();

  term.loadAddon(attachAddon);
  term.loadAddon(fitAddon);

  // 确保 DOM 元素已渲染后再调用 term.open
  if (terminal.value) {
    term.open(terminal.value); // 使用 terminal.value 以获取真实的 DOM 元素
  }

  // // WebSocket 错误处理
  // socket.addEventListener("error", event => {
  //   console.error("WebSocket error:", event);
  // });

  // // WebSocket 关闭处理
  // socket.addEventListener("close", () => {
  //   console.log("WebSocket connection closed");
  // });
});

onUnmounted(() => {
  // 组件卸载时清理资源
  if (term) {
    term.dispose();
    term = null;
  }
  if (socket) {
    socket.close();
    socket = null;
  }
});
</script>

<style scoped>
.show-info {
  font-family: "Source Han Sans CN", sans-serif;
  height: 100%;
}
</style>
