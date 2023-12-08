import {HttpStatus} from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

/**
 * id包含在初始化异常时生成的唯一标识符；
 * timestamp存储初始化异常时的时间戳；
 * domain指定此错误属于哪个业务域或发生错误的位置；
 * message包含用于日志记录的内部消息（可能包含私有数据，例如标识符、异常消息、堆栈跟踪等）；
 * apiMessage包含要在对用户的响应中返回的消息。这个是公开曝光的；
 * status指定发生此错误时服务必须响应的HTTP状态。
 */
export class ApiExceptions extends Error {
	public readonly id: string;
	public readonly timestamp: Date;
	public readonly success: boolean;

	constructor(
			public readonly message: string,
			public readonly status: HttpStatus,
	) {
		super();
		this.id = ApiExceptions.genId();
		this.timestamp = new Date();
		this.success = false;
	}

	private static genId(): string {
		return uuidv4();
	}
}
