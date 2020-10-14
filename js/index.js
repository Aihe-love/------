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

    // 使用下拉菜单menu组件
    $('.dropdown').dropdown({
        css3: true,
        js: false
    })


    // header search
    let $headerSearch = $('#header-search');
    let html = '';
    let maxNum = 10;
    $headerSearch.on('search-getData', function (e, data) {
        let $this = $(this);
        html = createHeaderSearch(data, maxNum);
        $this.search('appendLayer', html)

        if (html) {
            $this.search('showLayer')
        } else {
            $this.search('hideLayer')
        }

    }).on('search-noData', function (e) {
        $(this).search('hideLayer').search('appendLayer', '')

    }).on('click', '.search-layer-item', function (e) {
        console.log($(this).html())
        $headerSearch.search('setInputVal', $(this).html())
        $headerSearch.search('submit')
    })
    $headerSearch.search({
        autocomplete: true,
        css3: false,
        js: false,
        animation: 'fade',
        getDataInterVal: 0
    })

    function createHeaderSearch(data, maxNum) {
        let dataNum = data['result'].length;
        let html = '';
        if (dataNum === 0) {
            return '';
        }
        for (let i = 0; i < dataNum; i++) {
            if (i >= maxNum) break;

            html += `
                <li class="search-layer-item text-ellipsis">${data['result'][i][0]}</li>

                `
        }
        return html;

    }


})(jQuery)