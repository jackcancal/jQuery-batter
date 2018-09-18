$(document).ready(function () {
  let mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    effect : 'fade',
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    }
  })
})
$(function () {
  //头部下拉显示
  let $fixedHeader = $('.header-fixed')
  $(document).scroll(function () {
    if ($(this).scrollTop()>100){
      $fixedHeader.addClass('active')
    } else {
      $fixedHeader.removeClass('active')
    }
  })
  $.get('http://localhost:3000/index', function (data) {
    let obj = {data}
    const navList = template('nav-list', obj)
    const severList = template('sever', obj)
    $('.nav-list .list').append(navList)
    $('.content-main').append(severList)
  })
  $.get('http://localhost:3000/hotCity', function (data) {
    let obj = {data}
    const hotCity = template('hot-city', obj)
    $('.hot-city-name').append(hotCity)
  })
})
