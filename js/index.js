(function ($) {

    // 使用下拉菜单menu组件
    $('.menu').on('dropdown-show', function (e) {
        loadOne($(this), buildMenuItem)
    }).dropdown({
        css3: true,
        js: false
    })

    function buildMenuItem($elem, data) {
        let html = '';
        if (data.length === 0) return;

        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            html += `
                <li><a href="${datum.url}" target="_blank" class="menu-item">${datum.name}</a></li>
            `;
            $elem.find($('.dropdown-layer')).html(html)
        }
    }


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

    // focus-category
    $('#focus-category').find($('.dropdown')).on('dropdown-show', function () {
        loadOne($(this), createCategoryDetails);
    }).dropdown({
        css3: false,
        js: false,
        animation: 'fade'
    })

    function createCategoryDetails($elem, data) {
        console.log($elem)
        console.log(data)
        let html = '';
        for (let i = 0; i < data.length; i++) {
            const datum = data[i];
            html += `
            <dl class="category-details cf"><dt class="category-details-title fl"><a href="###" target="_blank" class="category-details-title-link">${data[i].title}</a></dt><dd class="category-details-item fl">
            `;
            for (let j = 0; j < datum.items.length; j++) {
                const datumElement = datum.items[j];
                html += `
                    <a href="###" target="_blank" class="link">${datumElement}</a>
                `
            }

            html += `</dd></dl>`;
        }
        $elem.find('.dropdown-layer').html(html)
    }


    // 获取数据
    function loadOne($elem, success) {
        let dataLoad = $elem.data('load');

        if (!dataLoad) return;

        if (!$elem.data('loaded')) {
            $elem.data('loaded', true);
            $.getJSON(dataLoad).done(function (data) {
                if (typeof success === 'function') success($elem, data);
            }).fail(function () {
                $elem.data('loaded', false);
            })
        }
    }


})(jQuery)