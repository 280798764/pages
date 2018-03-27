
export default {
  // 千分位
  toThousands(num) {
    const Num = num.toString().split('.');
    const InitNum = Num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    let point = '';
    if (Num[1]) {
      point = Num[1].length !== 2 ? Num[1] + '0' : Num[1];
    } else {
      point = '00';
    }
    return `${InitNum}.${point}`;
  },
  // 日期转换
  formatDay(date, type) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    const hour = date.substring(8, 10);
    const minute = date.substring(10, 12);
    const second = date.substring(12, 14);
    if (!date) return '----';
    if (type === 'YYYY-MM-DD HH:MM:SS') {
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  }
}
