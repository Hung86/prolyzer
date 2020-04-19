import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'https://a5wmdtrzg7.execute-api.ap-southeast-1.amazonaws.com/production';

export default class Api {
    static axiosInstance = axios.create({
        baseURL: `${API_URL}/`,
        timeout: 30000
    });

    // TODO: Uncomment the following for overrides
    // static get = Api.axiosInstance.get;
    // static request = Api.axiosInstance.request;
    // static delete = Api.axiosInstance.delete;
    // static head = Api.axiosInstance.head;
    // static options = Api.axiosInstance.options;
    // static post = Api.axiosInstance.post;
    // static put = Api.axiosInstance.put;
    // static patch = Api.axiosInstance.patch;
    // static getUri = Api.axiosInstance.getUri;
    //https://a5wmdtrzg7.execute-api.ap-southeast-1.amazonaws.com/production/dbusersearch?user=tom&search=iphonex

    static prolyzer = (search, user) => Api.axiosInstance.get('/prolyzer', {params: {search, user: user || "anonymous"}});
    static prolyzer_hash_tag = (search) => Api.axiosInstance.get('/dbhashtagscount', {params: {search}});
    static prolyzer_user_history = (user) => Api.axiosInstance.get('/dbuser', {params: {user}});
    static prolyzer_last_10_days = (search, user) => Api.axiosInstance.get('/dbusersearch', {params: {user, search}});
}
