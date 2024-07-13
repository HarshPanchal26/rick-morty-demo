/**
 * Class structure of Axios library for batter access in api callls.
 */

import axios from "axios";
import { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'
// import { environment } from '../../environments/environment';

const BASE_URL = ""

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
    /**
     *  @description proparty to share in Axious Instance 
     * 
     */
    public static axiosInstance: AxiosInstance
    public static cancelTokens: unknown[] = []
    // private static access_token: string | null

    /**
    * @description initialize vue axios
    */
    public static init() {
        ApiService.axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
        })
        
        ApiService.axiosInstance.interceptors.response.use(
            function (response: AxiosResponse) {
                // Success response
                if (response.status === 200 || response.status === 201) {
                    return response
                }

                return Promise.reject(response)
            },
        )
    }

    public static initForServerSideRendering() {
        ApiService.axiosInstance = axios.create({
            baseURL: 'http://dash.goavido.com/api',
            timeout: 10000,
        })

        ApiService.axiosInstance.interceptors.response.use(
            function (response: AxiosResponse) {
                // Success response
                if (response.status === 200 || response.status === 201) {
                    return response
                }
                return Promise.reject(response)
            })
    }

    /**
    * @description set the default HTTP request headers
    */
    public static setHeader(access_token: string | null): void {
        ApiService.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        ApiService.axiosInstance.defaults.headers.common['Accept'] = 'application/json'
    }

    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static async query(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
        const source = axios.CancelToken.source()
        ApiService.cancelTokens.push(source)
        try {
            return await ApiService.axiosInstance.get(resource, {
                ...params,
                cancelToken: source.token,
            })
        } catch (error) {
            console.error(error)
            return await Promise.reject(error)
        }
    }

    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param slug: string
     * @returns Promise<AxiosResponse>
     */
    public static async get(resource: string): Promise<AxiosResponse> {
        const source = axios.CancelToken.source()
        ApiService.cancelTokens.push(source)
        try {
            return ApiService.axiosInstance.get(`${resource}`)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description set the POST HTTP request
     * @param resource: string
     * @param data : Data object to pass in request's body
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static async post(resource: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        const source = axios.CancelToken.source()
        ApiService.cancelTokens.push(source)

        try {
            return ApiService.axiosInstance.post(`${resource}`, data, config)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description send the UPDATE HTTP request
     * @param resource: string
     * @param slug: string
     * @param data: any
     * @param config: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static async update(resource: string, slug: string, data: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        const source = axios.CancelToken.source()
        ApiService.cancelTokens.push(source)

        try {
            return ApiService.axiosInstance.put(`${resource}/${slug}`, data, config)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Send the PUT HTTP request
     * @param resource: string
     * @param data: any
     * @param config: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    public static async put(resource: string, data: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        const source = axios.CancelToken.source()
        ApiService.cancelTokens.push(source)

        try {
            return ApiService.axiosInstance.put(`${resource}`, data, config)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     * @description Send the DELETE HTTP request
     * @param resource: string
     * @returns Promise<AxiosResponse>
     */
    public static async delete(resource: string): Promise<AxiosResponse> {
        try {
            return ApiService.axiosInstance.delete(resource)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default ApiService
