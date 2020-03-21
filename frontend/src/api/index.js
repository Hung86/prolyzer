import axios from "axios";

export default class Api {
    static axiosInstance = axios.create({
        baseURL: 'https://8lfgp7w038.execute-api.ap-southeast-1.amazonaws.com/production/',
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

    static prolyzer = (search) => Api.axiosInstance.get('/prolyzer', {params: {search}});
}
