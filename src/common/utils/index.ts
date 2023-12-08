import {Request} from "express";

export const env = () =>
		({prod: 'prod', production: 'prod', dev: 'dev', test: 'test'}[
				process.env.NODE_ENV
				] ?? 'local');

export const isProd = env() === 'prod'

/**
 * 获取请求信息
 * @param req
 */
export const getReqMainInfo: (req: Request) => {
	[prop: string]: any;
} = req => {
	const {query, headers, url, method, body, connection} = req;
	// 获取 IP
	const xRealIp = headers['X-Real-IP'];
	const xForwardedFor = headers['X-Forwarded-For'];
	const {ip: cIp} = req;
	const ip = xRealIp || xForwardedFor || cIp;

	return {
		url,
		host: headers.host,
		ip,
		method,
		query,
		body,
	};
}
