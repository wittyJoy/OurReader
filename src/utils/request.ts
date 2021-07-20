import axios from "axios";
import { Notification } from "../utils/notification";

const notification = new Notification();

const service = axios.create({
  // baseURL: "http://192.168.3.72:1111",
  timeout: 9000, // 超时时间
});
/** 请求拦截器 */
service.interceptors.request.use(
  (config: any) => {
    notification.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/** 响应拦截器 */
service.interceptors.response.use(
  (response: any) => {
    notification.stop();
    const res = response.data;
    if (res.isSuccess) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res.errorMsg || res);
    }
  },
  (error) => {
    notification.stop();
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default service;
