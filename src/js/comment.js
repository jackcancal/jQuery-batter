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
  //转换二维数组
  function arrTo2x(arr, max) {
    let arr1 = []
    let arr2 = []
    for (let i = 0; i < arr.length; i++) {
      arr2.push(arr[i])
      if (arr2.length === max || i === arr.length){
        arr1.push(arr2)
        arr2 = []
      }
    }
    return arr1
  }
  //时间戳转换
  function dateFormat(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    // let h = date.getHours() + ':';
    // let m = date.getMinutes() + ':';
    // let s = date.getSeconds();
    return Y+M+D
  }
  // art-template日期格式化
  template.defaults.imports.dateFormat = dateFormat
  // template.defaults.imports.dateFmt = function (ns) {
  //   return new Date(parseInt(ns)).toLocaleString();
  // }
  $.get('http://localhost:3000/hotCity', function (data) {
    $('.hot-city-name').append(template('hot-city', {data}))
  })
  $.get('http://localhost:3000/comment', function (data) {
    var preIndex = 0
    const ratings = arrTo2x(data, 9)//获取数据生成二维数组
    let rat = $('.rat')
    rat.append(template('rating', {rating: ratings[preIndex]}))//初始化显示第零项内容
    $('.paging').append(template('page', {pages: ratings}))
    let pages = $('.paging .item')
    $(pages[0]).addClass('active')
    pages.each(function (index, item) {
      $(item).on('click', function () {//点击监听每个page
        $(pages[preIndex]).removeClass('active')
        preIndex = Number(this.innerHTML - 1)//获得当前所需展示的下标
        $(pages[preIndex]).addClass('active')
        rat.empty()//清空原来的数据
        rat.append(template('rating', {rating: ratings[preIndex]}))//添加对应的数据
      })
    })
    $('.paging .up').on('click', function () {
      if (preIndex <= 0) return
      $(pages[preIndex]).removeClass('active')
      preIndex--
      $(pages[preIndex]).addClass('active')
      rat.empty()
      rat.append(template('rating', {rating: ratings[preIndex]}))
    })
    $('.paging .down').on('click', function () {
      if (preIndex >= ratings.length-1) return
      $(pages[preIndex]).removeClass('active')
      preIndex++
      $(pages[preIndex]).addClass('active')
      rat.empty()
      rat.append(template('rating', {rating: ratings[preIndex]}))
      }
    )
  })

})
