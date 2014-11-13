/*
    微信分享
*/
(function(){
    var imgUrl = 'http://h5.mediadreamworks.net/dl_final/images/share.jpg';
    var lineLink = 'http://h5.mediadreamworks.net/dl_final/index.html';
    var descContent = '2015年浙报集团校招走你，融合创新';
    var shareTitle = "2015年浙报集团校招走你";
    var appid = 'wx9c8b0d9821a73d73';//传媒梦工场

    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
            "appid": appid,
            "img_url": imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
            //_report('send_msg', res.err_msg);
        })
    }
    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline',{
            "img_url": imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
               //_report('timeline', res.err_msg);
        });
    }
    function shareWeibo() {
        WeixinJSBridge.invoke('shareWeibo',{
            "content": descContent,
            "url": lineLink,
        }, function(res) {
            //_report('weibo', res.err_msg);
        });
    }

    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            shareTimeline();
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            shareWeibo();
        });
        
    }, false);
})();

var App = {
    imgUrl:'images/'
};
var config = {
    coverUrl:'',
    swipeCur: 0,
    swipeDir:'vertical', // 'vertical' // horizontal
};

var imgLoad = (function(){
    return function(url, callback, errorCb){
        var img = new Image();

        img.src = url;

        if (img.complete) {
            callback.call(img);
            return;
        };

        img.onload = function () {
            callback.call(this);
            img = img.onload = img.onerror = null;
        };

        img.onerror = errorCb || function(){};
    }
})();


$(function(){
    var _imgload = function(imgs) {
        var imgs= imgs || [];
        var length = imgs.length, index = 0;
        var loadspan=document.getElementById('loadspan'),loadtxt=document.getElementById('id_load_num') 
        function load(){
            var img=new Image();
            img.src = window.App.imgUrl + imgs[index];
            if(img.complete){
                img=null;           
                setTimeout(function(){
                    onload();
                },10)
                return ;
            }
            img.onload=function(){
                img=null;   
                setTimeout(function(){
                    onload();
                },10)
            };
            img.onerror = function(){
                img=null;   
                setTimeout(function(){
                    onload();
                },10)
            };    
            function onload(){
                index++;
                var a = Math.floor(100 / length * index);       
                loadspan.style.width=a+'%';
                loadtxt.innerHTML=a+'%'             
                //修改进度
                if (index == length) {  
                    //进度改成100%
                    page_load_done();             
                }else{
                    load();
                }       
            }
        }
        load();
    };
    // 每页绑定滑动
    var mySwiper = new Swiper('.swipe',{
        loop:true,
        slideActiveClass:'cur',
        onSlideChangeEnd:function(swiper){
            setTimeout(function(){
                var $cur = $('.cur'),role = $cur.attr('data-role');
                
                if(role === 'office'){
                    $('.scroll-box').addClass('show');
                }
                
            },10);
        },
        onTouchMove:function(swiper){
            //console.log(swiper)
        },
        mode:'vertical',
        //pagination: '.pagination',
        loop:false,
        grabCursor: true
        //paginationClickable: true
    });
   
    //close.png
    
    var myScroll = null;
    
    $('body').on('click','.scroll-box-close',function(e){
        $('.scroll-box').removeClass('show');
    });
    $('body').on('click','.scroll-img',function(e){
        var link = 'http://campus.51job.com/zjdpg';
        alert('报名地址:http://campus.51job.com/zjdpg');
    });
    function page_load_done(){
        
        $('#loadspan').css('width','100%');
        $('#id_load_num').text('100%');
        $('.page_load').addClass('ok');
        $('body').addClass('load');
        var myScroll = new iScroll('scroll', {  });
    }
    function init(){
        var imgs = ['001.gif','002.gif','003.gif','004.gif','005.gif','arrow.png','006.jpg','007.jpg','close.png'];
        _imgload(imgs);

    }

   

    init();


   
});
    