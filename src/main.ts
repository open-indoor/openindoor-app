import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss";
import "./assets/map-box-gl-custom.css";
import "./custom-gl/src/styles/style.css";
import "ant-design-vue/dist/antd.css";
import { Modal, Icon, Button, Alert, Row, Col } from "ant-design-vue";
Vue.config.productionTip = false;

Vue.use(Modal);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Alert);
Vue.use(Row);
Vue.use(Col);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
