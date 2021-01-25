import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAnalytics from "vue-analytics";
import "./assets/styles/main.scss";
import "./assets/map-box-gl-custom.css";
import "./custom-gl/src/styles/style.css";
import "ant-design-vue/dist/antd.css";
import {
  Modal,
  Input,
  Icon,
  Button,
  Alert,
  Row,
  Col,
  FormModel
} from "ant-design-vue";
Vue.config.productionTip = false;

Vue.use(Input);
Vue.use(FormModel);
Vue.use(Modal);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Alert);
Vue.use(Row);
Vue.use(Col);
Vue.use(VueAnalytics, {
  id: "GOOGLE_ANALYTICS_ID",
  router
});
new Vue({
  comments: true,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
