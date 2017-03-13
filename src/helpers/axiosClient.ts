import { STORAGE } from './storage';
import { AppSetting } from './../appsettings/index';
import axios, { AxiosInstance } from 'axios';
import { Container } from "aurelia-framework/dist/aurelia-framework";
let storage = Container.instance.get(STORAGE);
let httpClient: AxiosInstance;
httpClient = axios.create({
    baseURL: AppSetting.apiEndPoint,
    headers: { 'Authorization': storage.get(STORAGE.tokenKey) }
});
export default httpClient; 