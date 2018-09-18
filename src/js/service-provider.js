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
  $.get('http://localhost:3000/service', function (data) {
    $('.provider-list').append(template('provider', {data}))
  })
  $.get('http://localhost:3000/hotCity', function (data) {
    $('.hot-city-name').append(template('hot-city', {data}))
  })
})
