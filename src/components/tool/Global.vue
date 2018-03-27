<script type="text/javascript">
  const HOST = location.host;
  const ENV = [
    { host: /xfplink\./, env: 'PROD' },
    { host: /.*/, env: 'TEST' }
  ].find(item => item.host.test(HOST)).env;

  const HTTP_URL_MAP = {
    TEST: 'http://www.e-fp.cn',
    PROD: 'http://www.xfplink.cn'
  };

  const ENV_MAP = {
    TEST: 'dev',
    PROD: 'prod'
  };

  const API_KEY_MAP = {
    TEST: 'YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D',
    PROD: 'YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D'
  }

  const httpUrl = `${HTTP_URL_MAP[ENV]}/issp/ApiService?APIKey=`;
  const httpLink = HTTP_URL_MAP[ENV];
  const env = ENV_MAP[ENV];
  const apikey = API_KEY_MAP[ENV];

  //测试环境
  //  const httpUrl = 'http://www.e-fp.cn/issp/ApiService?APIKey='
  //  const httpLink = 'http://www.e-fp.cn'
  //  const env = 'dev'
  //  const apikey="YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D"

  //正式环境

  // const httpUrl = 'http://www.xfplink.cn/issp/ApiService?APIKey='
  // const httpLink = 'http://www.xfplink.cn'
  // const env = 'prod'
  // const apikey="YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D"  //上线使用


   function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
    }else{
      return false;
    }
  }
  function isEmpty(object){
    if (object == undefined || object == null || object == "") {
      return true;
    } else {
      return false;
    }
  }
  function closeWXWindow(){
    WeixinJSBridge.call('closeWindow');
  }
  export default
  {
    apikey,
    env,
    httpUrl,
    httpLink,
    isWeiXin,
    isEmpty,
    closeWXWindow
  }
</script>
