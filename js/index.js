(function ($) {
    // 按需加载
    $('.dropdown').on('dropdown-show', function (e) {
        let $this = $(this);
        let dataLoad = $this.data('load');

        if (!dataLoad) return;

        if (!$this.data('loaded')) {
            let $layer = $this.find($('.dropdown-layer'));
            let html = '';
            $.getJSON(dataLoad, function (data) {
                for (let i = 0; i < data.length; i++) {
                    const argument = data[i];
                    html += `
                    <li><a href="${argument.url}" target="_blank" class="menu-item">${argument.name}</a></li>
                    `
                }
                $layer.html(html);
                $this.data('loaded', true)
            })
        }
    })

    // 使用下拉菜单组件
    $('.dropdown').dropdown({
        css3: true,
        js: false
    })
})(jQuery)