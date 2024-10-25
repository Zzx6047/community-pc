import axios from 'axios';
import { ElMessage } from 'element-plus'; // 假设使用 Element Plus 作为 UI 库，用于错误提示
import mock from './mock'; // 如果使用 Mock，则导入 mock

// Http 配置对象
const defaultConfig = {
  baseURL: 'https://api.example.com',
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json', // 默认 header
  },
};

// Http 类封装 Axios
class Http {
  constructor(config = {}) {
    this.instance = axios.create({ ...defaultConfig, ...config });
    this.setupInterceptors();
    this.setupMock();
  }

  // 设置拦截器
  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加 token 到 headers 中（如果存在）
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // 允许传入自定义 headers
        if (config.headers) {
          Object.assign(config.headers, this.instance.defaults.headers);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // 根据需要处理响应数据
        return response.data;
      },
      (error) => {
        // 错误处理
        const { status, data } = error.response || {};
        if (status === 401) {
          ElMessage.error('Token 过期或无效，请重新登录。');
          // 可以处理 token 刷新或重定向到登录页
        } else if (status === 403) {
          ElMessage.error('没有权限访问该资源。');
        } else if (data && data.code) {
          // 根据后端返回的错误码进行处理
          ElMessage.error(`请求出错: ${data.message || '未知错误'}`);
        } else {
          ElMessage.error(`请求出错: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  // 设置 Mock（如果是开发环境）
  setupMock() {
    if (process.env.NODE_ENV === 'development') {
      mock();
    }
  }

  // 封装请求方法
  request(config) {
    return this.instance.request(config);
  }

  // 封装 GET 请求
  get(url, params = {}, config = {}) {
    return this.instance.get(url, { params, ...config });
  }

  // 封装 POST 请求
  post(url, data = {}, config = {}) {
    return this.instance.post(url, data, { ...config });
  }

  // 封装 PUT 请求
  put(url, data = {}, config = {}) {
    return this.instance.put(url, data, { ...config });
  }

  // 封装 DELETE 请求
  delete(url, params = {}, config = {}) {
    return this.instance.delete(url, { params, ...config });
  }

  // 使用 fetch 进行文件上传（支持流）
    async uploadFile(url, file, config = {}) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(url, {
            method: 'POST',
            body: formData,
            ...config, // 允许传递额外的配置，如 headers
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json(); // 假设服务器返回 JSON 格式数据
        } catch (error) {
            // 处理上传错误，例如网络问题或服务器错误
            ElMessage.error(`文件上传失败: ${error.message}`);
            throw error; // 重新抛出错误以便上层处理
        }
    }
  
  // 检查 token 是否有效，如果无效则抛出错误或进行处理
  checkToken() {
    const token = localStorage.getItem('token');
    if (!token || /* 添加其他检查 token 有效性的逻辑，如过期时间检查 */) {
      ElMessage.error('Token 无效或已过期，请重新登录。');
      // 这里可以处理重定向到登录页或其他逻辑
      return false;
    }
    return true;
  }
  
  // 设置自定义 header
  setHeader(headers) {
    Object.assign(this.instance.defaults.headers, headers);
  }
  
  // 实例化 Http 类时，可以传入一个可选的 config 对象来覆盖默认配置
  static createInstance(config = {}) {
    return new Http({ ...defaultConfig, ...config });
  }
}

// 导出 Http 类的实例，以便在 Vue 组件中使用
const http = Http.createInstance();
export default http;
