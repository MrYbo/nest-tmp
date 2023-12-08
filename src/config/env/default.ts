export default () => ({
	database: {
		host: '127.0.0.1',
		port: 3306,
		user: 'root',
		password: '12345678',
		dbName: 'huitest',
		charset: 'utf8',
		collation: 'utf8_general_ci',
		debug: true,
	},

	redis: {
		host: '127.0.0.1',
		port: 6379,
		keyPrefix: 'test-aa:',
	},

	jwt: {
		secret: 'secretKey',
		expiresIn: '2h',
	},

	logger: {
		dirname: 'logs', // 日志保存的目录
		infoFilename: '%DATE%.info.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
		errorFilename: '%DATE%.error.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
		datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
		zippedArchive: false, // 是否通过压缩的方式归档被轮换的日志文件。
		maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
		maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
	}
});
