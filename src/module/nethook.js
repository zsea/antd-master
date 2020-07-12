import { message } from "antd"
import axios from "axios";

export default function () {
    let requestTotal = 0, closer = null;
    axios.interceptors.request.use(function (config) {
        if (requestTotal === 0) {
            closer = message.loading("正在请求，请稍后...", 0);
        }
        requestTotal++;
        return config;
    });
    axios.interceptors.response.use(function (response) {
        requestTotal--;
        if (requestTotal <= 0) {
            requestTotal = 0;
            if (closer) closer();
            closer = null;
        }
        return response;
    }, function (err) {
        requestTotal--;
        if (requestTotal <= 0) {
            requestTotal = 0;
            if (closer) closer();
            closer = null;
        }
        let cfg = err.config;
        message.error(`接口[${cfg.method} ${cfg.url}]发生错误:${err.message}`)
    });
}
