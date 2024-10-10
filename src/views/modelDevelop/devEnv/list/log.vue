<template>
  <div v-if="logSatus === 0" ref="scroller" class="trainLog thinScrollbar">
    <div v-for="(item, key) in logContent" :key="key">
      <p v-html="item.text" />
    </div>
  </div>
  <div v-else-if="logSatus > 0" class="trainLog center">空</div>
</template>

<script setup lang="ts">
import _ from "lodash";
import {
  ref,
  watch,
  reactive,
  defineProps,
  onMounted,
  onBeforeUnmount,
  nextTick
} from "vue";
// import Convert from "ansi-to-html";
// var convert = new Convert();
import { onBeforeRouteLeave } from "vue-router";
import $websocket from "@/utils/web-socket";

interface Props {
  id: number;
  tab: string;
  jobId: number;
}
const props = defineProps<Props>();
let logSatus = ref(-1);
const logContent = reactive<any[]>([]);
const scroller = ref<HTMLElement | null>(null);
const charWidth = 7; // 假设每个字符的宽度为 8px（可根据实际情况调整）
const lineHeight = 30; // 每行 40px 高度

function scrollToBottom() {
  if (scroller.value) {
    scroller.value.scrollTop = scroller.value.scrollHeight;
  }
}

const onmessage = (msg: any) => {
  let data = JSON.parse(msg);
  if (data.code == "0") {
    logSatus.value = 0;
    const arr = data.value.split(/\r\n|\r|\n/);
    arr.forEach((element: string, index: number) => {
      logContent.push({
        // text: convert.toHtml(element),
        text: element,
        id: logContent.length + index
      });
    });
  } else {
    logSatus.value = parseInt(data.code);
  }
  if (logContent.length > 2000) {
    logContent.splice(0, logContent.length - 2000);
  }
  nextTick(() => {
    scrollToBottom();
  });
};

function resetLog() {
  logContent.length = 0;
  logSatus.value = -1;
}

function addSSE() {
  if (!$websocket.instance) {
    const userName =
      localStorage.getItem("APPFORM_LOGIN_NAME") ||
      localStorage.getItem("SYSADMIN_LOGIN_NAME");
    const ws = location.protocol == "https:" ? "wss:" : "ws:";
    // websocket主机名 如果配置了，使用已配置的，如果未配置动态读取

    // const url = `${ws}//${window.location.host}/jhai/log/${userName}/${userName}/${props.jobId}`;
    const url = `/jhai/log/jhadmin/jhadmin/194/`;
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

const containerWidth = ref(window.innerWidth - 80); // 减去 padding

function updateContainerWidth() {
  containerWidth.value = window.innerWidth - 80;
  updateMessageHeights();
}

function updateMessageHeights() {
  logContent.forEach(item => {
    const lines = Math.ceil(
      (item.text.length * charWidth) / containerWidth.value
    );
    item.height = lines * lineHeight;
  });
}

window.addEventListener("resize", updateContainerWidth);

watch(
  () => props.id,
  (newV, oldV) => {
    if (newV !== oldV && oldV && props.tab === "trainLog") {
      $websocket && $websocket.instance && $websocket.close();
      addSSE();
    }
  },
  { immediate: true }
);

watch(
  () => props.tab,
  (newV, oldV) => {
    if (newV !== oldV && newV === "trainLog") {
      addSSE();
    }
    if (newV !== oldV && oldV === "trainLog") {
      logContent.length = 0;
      $websocket && $websocket.instance && $websocket.close();
    }
  },
  { immediate: true }
);

onBeforeRouteLeave(() => {
  $websocket && $websocket.instance && $websocket.close();
});

onMounted(() => {
  updateContainerWidth();
  $websocket && $websocket.instance && $websocket.close();
  addSSE();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateContainerWidth);
});
</script>

<style scoped>
.trainLog {
  height: calc(100% - 10px);
  padding: 0 40px 20px 40px;
  flex: 0 1 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .scroller {
    flex: auto 1 1;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 transparent;
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      min-height: 6px;
      width: 5px;
    }
    .message {
      padding: 5px 10px 9px;
      margin: 5px 0;
      line-height: 1.5;
      word-break: break-word;
    }
  }
}
.center {
  justify-content: center;
}
</style>
