// nav-site
// nav-site  第一种方法  此方法会引起回流和重绘不建议使用
// $('.dropdown').hover(function () {
//     let dropdown = $(this);
//     dropdown.find($('.dropdown-toggle')).css({
//         'background': '#fff',
//         'border-color':'#cdd0d4'
//     })
//     dropdown.find($('.dropdown-arrow')).css({
//         'background-image': 'url("./img/dropdown-arrow-active.png")',
//         'border-color':'#cdd0d4'
//     })
//
//     dropdown.find($('.dropdown-layer')).show();
// },function () {
//     let dropdown = $(this);
//     dropdown.find($('.dropdown-toggle')).css({
//         'background': '',
//         'border-color':'#f3f5f7'
//     })
//     dropdown.find($('.dropdown-arrow')).css({
//         'background-image': 'url("./img/dropdown-arrow.png")',
//         'border-color':'#cdd0d4'
//     })
//
//     dropdown.find($('.dropdown-layer')).hide();
// })

// nav-site第二种方法   直接使用添加class的方式可以减少重绘和回流
// $('.dropdown').hover(function () {
//     $(this).addClass('dropdown-active');
// },function () {
//     $(this).removeClass('dropdown-active');
// })