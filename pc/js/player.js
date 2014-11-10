(function(){
    function Player(el, callback){
        this.el = el;
        this.callback = callback || function(){}
        this.isPlay = true;
        this.init();
    }
    Player.prototype = {
        init: function(){
            var _this = this,
                attr = {loop: true, preload: "auto", src: this.el.attr("data-src")};

            this._audio = new Audio();
           
            $(this._audio).on({
                canplay: function(){
                    console.log('canplay')
                    _this.callback.call(_this, true);
                    
                },
                error: function(e){
                    console.log('error')
                    _this.callback.call(_this, false, e);
                }

            })

            try{
                for (var i in attr){
                    attr.hasOwnProperty(i) && i in this._audio && (this._audio[i] = attr[i]);
                }

                this._audio.load();
    
            }catch(e){
                console.log('exception')
                this.callback.call(_this, false, e);
            }
            
            this.el.on('click', function(){
                _this._play();
            });
        },
        _play: function(){
            var _text = this.el.prev()[0];

            
            if(!this.isPlay){
                this._audio.play();
                this.el.addClass('on');
                this.el.parent().addClass('on');
                $(_text).text('打开');
            }else{
                //alert(1)
                this._audio.pause();
                this.el.removeClass('on');
                this.el.parent().removeClass('on');
                $(_text).text('关闭');
            }
            console.log('this.isPlay',this.isPlay);
            this.isPlay = !this.isPlay;

            _text.className = 'text';
            setTimeout(function(){
                _text.className = 'text move hide';
            }, 1000);
        }
    }

    function Media(el, showCb, closeCb){
        this.el = el;
        this.init(showCb, closeCb);
    }
    Media.prototype = {
        init: function(showCb, closeCb){
            var attr = {controls: "controls", preload: "none", src: $(this.el).data('src')},
                _video = $("<video></video>")[0],
                _videoWrap = $('<div class="video_wrap"><a href="javascript:void(0);" class="video_close"></a></div>').appendTo($('.container')),
                _this = this;

            for (var i in attr){
                attr.hasOwnProperty(i) && i in _video && (_video[i] = attr[i]);
            }

            _videoWrap.append(_video);

            $(this.el).on('click', function(){
                'function' == typeof showCb && showCb();

                $(this).hide();             
                if(/android/i.test(navigator.userAgent)){
                    setTimeout(function() {
                        _videoWrap.addClass('show');
                        setTimeout(function() {
                            "function" == typeof _video.play && _video.play();
                        }, 500);
                    }, 20);
                }else{
                    _videoWrap.addClass('show');
                    _video.play();
                }
                
                return false;
            });
            
            _videoWrap.find('.video_close').on('click', function(){
                _videoWrap.removeClass('show');
                $(_this.el).show();
                'function' == typeof closeCb && closeCb();
            });
        }
    }

    window.Player = Player;
    window.Media = Media;
})();