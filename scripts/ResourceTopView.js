/*
   인재풀 등록/보기 상단 화면 직군 제어용 스크립트
*/
$(document).ready(function () {
  $('#jobType_box .link_selected').click(function () {
    $(this).parent().toggleClass('state_on')
  })

  $('#jobType_list .jobType_option').click(function () {
    $('#jobType_box')
      .removeClass('state_on')
      .addClass('state_done')
      .find('.link_selected')
      .html($(this).text() + '<span class="ico_arr"></span>')
    $('#jobType_list').find('li').removeClass('on')
    $(this).parent().addClass('on')
  })
})
