const ua = navigator.userAgent
let utils = {
	/**
	 * 对日期进行格式化
	 * @param date 要格式化的日期
	 * @param format 进行格式化的模式字符串
	 *     支持的模式字母有：
	 *     y:年,
	 *     M:年中的月份(1-12),
	 *     d:月份中的天(1-31),
	 *     H:小时(0-23),
	 *     m:分(0-59),
	 *     s:秒(0-59),
	 *     S:毫秒(0-999),
	 *     q:季度(1-4)
	 * @return String
	 */
	dateformat: (date, format) => {
		if (!date) return

		var o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		}

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}

		for (var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) // eslint-disable-line
			}
		}

		return format
	},
}
export default utils
