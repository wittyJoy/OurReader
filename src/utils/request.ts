import axios from "axios";
import { Notification } from "../utils/notification";

const notification = new Notification(`连接中...`);

const service = axios.create({
  // baseURL: "http://192.168.3.72:1111",
  timeout: 9000, // 超时时间
});
/** 请求拦截器 */
service.interceptors.request.use(
  (config: any) => {
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
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.errorMsg || res.data);
    }
  },
  (error) => {
    // 获取状态码
    const { status } = error.response;

    // if (status === 401) {
    //   Message.error("请重新登录");
    //   //清楚token
    //   localStorage.removeItem("eToken");
    //   //跳转到登录页面
    //   router.push("/login");
    // }
    return Promise.reject(error);
  }
);

export default service;

// import { TreeNode } from "../explorer/TreeNode"; // import
// import request from "../utils/request"; // import
// const api_getBookshelf = (): any => {
//   return request({
//     url: `/getBookshelf`,
//     method: "get",
//   });
// };
// const getBookshelf = (): Promise<TreeNode[]> => {
//   return new Promise(async (resolve) => {
//     const data = await api_getBookshelf();
//     resolve(data);
//   });
// };
