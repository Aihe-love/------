(function ($) {
    'use strict';


    let cache = {
        data: {},
        count: 0,
        addData: function (key, data) {
            if (!this.data[key]) {
                this.data[key] = data;
                this.count++;
            }
        },
        readData: function (key) {
            return this.data[key]
        },
        deleteDataByKey: function (key) {
            delete this.data[key];
            this.count--;
        },
        deleteDataByOrder: function (num) {
            let count = 0;
            for (const dataKey in this.data) {
                if (count >= num) {
                    break;
                }
                count++;
                this.deleteDataByKey(dataKey)
            }
        }
    }

    function Search($elem, options) {
        this.$elem = $elem;
        this.options = options;

        this.$input = this.$elem.find($('.search-inputBox'));
        this.$layer = this.$elem.find($('.search-layer'));
        this.$form = this.$elem.find($('.search-form'));


        this.loaded = false;

        this.$elem.on('click', '.search-btn', this.submit.bind(this))
        if (this.options.autocomplete) {
            this.autocomplete();
        }
    }

    Search.DEFAULTS = {
        autocomplete: false,
        url: 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1600240487418_249&callback=jsonp250&k=1&area=c2c&bucketid=12&q=',
        css3: false,
        js: false,
        animation: 'fade',
        getDataInterVal: 200
    }
    // 提交
    Search.prototype.submit = function () {
        if (this.getInputVal() === '') {
            return false;
        }

        this.$form.submit();
    }
    // 自动完成
    Search.prototype.autocomplete = function () {
        let timer = null;
        let self = this;
        this.$layer.showHide(this.options);
        this.$input
            .on('focus', this.showLayer.bind(this))
            .on('input', function () {
                if (self.options.getDataInterVal) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        self.getData()
                    },self.options.getDataInterVal);
                } else {
                    self.getData()
                }
            })
            .on('click', function () {
                return false
            })
        $(document).on('click', this.hideLayer.bind(this))
    }
    // 获取数据
    Search.prototype.getData = function () {
        let self = this;
        let inputVal = this.getInputVal();
        if (inputVal === '') return self.$elem.trigger('search-noData');

        if (cache.readData(inputVal)) return self.$elem.trigger('search-getData', [cache.readData(inputVal)]);

        // 终止ajax请求
        if (this.jqXHR) this.jqXHR.abort();


        this.jqXHR = $.ajax({
            url: this.options.url + inputVal,
            dataType: 'jsonp',
        }).done(function (data) {
            cache.addData(inputVal, data)
            console.log(cache.data)
            console.log(cache.count)
            self.$elem.trigger('search-getData', [data]);
        }).fail(function () {
            self.$elem.trigger('search-noData');
        }).always(function () {
            self.jqXHR = null;
        })
    }
    // 显示下拉层
    Search.prototype.showLayer = function () {
        if (!this.loaded) return;
        this.$layer.showHide('show');

    }
    // 隐藏下拉层
    Search.prototype.hideLayer = function () {
        this.$layer.showHide('hide');
    }
    // 获取input的值
    Search.prototype.getInputVal = function () {
        return $.trim(this.$input.val())
    }
    // 设置input的值
    Search.prototype.setInputVal = function (val) {
        console.log(val)
        this.$input.val(removeHtmlTags(val))
        // 去除HTML标签
        function removeHtmlTags(str) {
            return str.replace(/<(?:[^>'"]|"[^']*"|'[^']*')*>/g,'');
        }
    }
    // 填充html
    Search.prototype.appendLayer = function (html) {
        this.$layer.html(html)
        this.loaded = !!html;
    }




    $.fn.extend({
        search: function (options,value) {
            return this.each(function () {
                let $this = $(this);
                let search = $this.data('search');
                let option = $.extend({}, Search.DEFAULTS, $this.data(), typeof options === 'object' && options);

                if (!search) {
                    $this.data('search', search = new Search($(this), option))
                }

                if (typeof search[options] === 'function') {
                    search[options](value);
                }
            })
        }
    })

})(jQuery)


// (function ($) {
//     'use strict';
//
//     let $search = $('.search');
//     let $input = $search.find($('.search-inputBox'));
//     let $btn = $search.find($('.search-btn'));
//     let $layer = $search.find($('.search-layer'));
//     let $form = $search.find($('.search-form'));
//
//     // 验证
//     $form.on('submit', function () {
//         if ($.trim($input.val()) === '') {
//             return false;
//         }
//     })
//
//
//     // 自动完成
//     $input.on('input', function () {
//         let url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1600240487418_249&callback=jsonp250&k=1&area=c2c&bucketid=12&q=' + encodeURIComponent($.trim($input.val()));
//
//         $.ajax({
//             url: url,
//             dataType: 'jsonp',
//         }).done(function (data) {
//             // 请求成功调用的
//             let html = '';
//             let maxNum = 10;
//             let dataNum = data['result'].length;
//
//             if (dataNum === 0) {
//                 $layer.hide().html('');
//                 return;
//             }
//             for (let i = 0; i < dataNum; i++) {
//                 if (i >= maxNum) break;
//
//                 html += `
//                 <li class="search-layer-item text-ellipsis">${data['result'][i][0]}</li>
//
//                 `
//             }
//
//             $layer.html(html).show();
//
//         }).fail(function () {
//             // 请求失败调用的
//             $layer.hide().html('');
//         }).always(function () {
//             // 不管成功与否都调用
//             console.log('why always me!')
//         })
//     })
//
//
//     $layer.on('click', '.search-layer-item', function (e) {
//         $input.val(removeHtmlTags($(this).html()));
//         $form.submit();
//     })
//
//     // 显示隐藏下拉层
//     $input.on('focus', function () {
//         $layer.show();
//     }).on('click', function () {
//         return false;
//     });
//     $(document).on('click', function () {
//         $layer.hide();
//     })
//
//     // 去除HTML标签
//     function removeHtmlTags(str) {
//         return str.replace(/<(?:[^>'"]|"[^']*"|'[^']*')*>/g,'');
//     }
//
//
// })(jQuery)