export interface IReqOptions {
    method: string
    meta?: object
    headers?: HeadersInit
    data?: object
    params?: any
}

export const prefixUrl = '/api'

export const request = async (url: string, options: IReqOptions) => {
    const { method, headers, data, params } = options
    const reqObj: RequestInit = {
        method,
    }
    if (headers)
        reqObj.headers = headers

    if (data)
        reqObj.body = JSON.stringify(data)

    url = `${prefixUrl}${url}`
    if (params) {
        const paramsStr = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
        url = `${url}?${paramsStr}`
    }

    const response = await fetch(url, reqObj)
    return response.json()
}
