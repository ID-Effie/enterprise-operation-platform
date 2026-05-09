import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// 创建 Vue 应用，然后挂载到页面里的 #app 节点
createApp(App).use(router).mount("#app");
