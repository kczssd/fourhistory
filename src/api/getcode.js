   export default getCode = function() {
           if (sessionStorage.getItem("openid") && sessionStorage.getItem("openid") != "undefined") {
               return false;
           }
           var code = getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
           var local = window.location.href;
           var APPID = 'xxx';
           if (code == null || code === '') {
               window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=#wechat_redirect'
           } else {
               getOpenId(code) //把code传给后台获取用户信息
           }
       }
       //把code传给后台,得到openid
   getOpenId = function(code) {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'xxx',
               data: { code: code },
               success: function(res) {
                   if (res.status == -1) {
                       // 提示没有关注公众号 没有关注公众号跳转到关注公众号页面
                       console.log('您还未关注公众号喔');
                       //二维码弹窗
                       $('.openPopup').click();
                       return;
                   } else {
                       // 本地存储这个openid，并刷新页面
                       sessionStorage.setItem("openid", res.data.openid);
                       location.reload();
                   }
               }
           });
       }
       //获取地址栏的参数
   getUrlParam = function(name) {
           var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
           var r = window.location.search.substr(1).match(reg);
           if (r != null) return unescape(r[2]);
           return null;
       }
       //页面执行调用
   getCode();