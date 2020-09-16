(function ($) {
    'use strict'

    function Dropdown($elem, options) {
        this.$elem = $elem;
        this.options = options;
        this.$layer = this.$elem.find($('.dropdown-layer'))
        this.activeClass = options.active + '-active';
        this._init();
    }

    Dropdown.DEFAULTS = {
        event: 'hover', //click
        css3: false,
        js: false,
        animation: 'fade',
        active: 'dropdown',
        delay: 0,
    }

    Dropdown.prototype._init = function () {
        this.$layer.showHide(this.options);
        let self = this;

        this.$layer.on('show shown hide hidden', function (e) {
            self.$elem.trigger('dropdown-' + e.type)
        })

        if (this.options.event === 'click') { // click
            this.$elem.on('click', function (e) {
                self.show();
                e.stopPropagation();
            });
            $(document).on('click', this.hide.bind(this))
        } else {
            this.$elem.hover(this.show.bind(this), this.hide.bind(this))
        }
    }

    Dropdown.prototype.show = function () {
        let self = this;
        if (this.options.delay) { //delay
            this.timer = setTimeout(function () {
                _show();
            }, this.options.delay);
        } else {
            _show();
        }

        function _show() {
            self.$elem.addClass(self.activeClass)
            self.$layer.showHide('show');
        }
    }


    Dropdown.prototype.hide = function () {
        if (this.timer) clearTimeout(this.timer);
        this.$elem.removeClass(this.activeClass);
        this.$layer.showHide('hide');
    }


    $.fn.extend({
        dropdown: function (options) {
            return $(this).each(function () {
                let $this = $(this);
                let option = $.extend({}, Dropdown.DEFAULTS, $this.data(), typeof options === 'object' && options);
                let dropdown = $this.data('dropdown');

                if (!dropdown) {
                    $this.data('dropdown', dropdown = new Dropdown($(this), option))
                }

                if (typeof dropdown[options] === 'function') {
                    dropdown[options]();
                }
            })
        }
    })


    //1---------------
    // function dropdown(elem,options) {
    //     let $elem = $(elem);
    //     let $layer = $elem.find($('.dropdown-layer'))
    //     let activeClass = $elem.data('active') + '-active';
    //
    //     $layer.showHide(options);
    //     $elem.hover(function () {
    //         $elem.addClass(activeClass)
    //         $layer.showHide('show');
    //     },function () {
    //         $elem.removeClass(activeClass);
    //         $layer.showHide('hide');
    //
    //     })
    // }
    //
    // let defaults = {
    //     css3: false,
    //     js: false,
    //     animation: 'fade'
    // }
    //
    // $.fn.extend({
    //     dropdown:function (options) {
    //         return this.each(function () {
    //             let option = $.extend({}, defaults, options);
    //             dropdown(this,option)
    //         })
    //     }
    // })

})(jQuery);