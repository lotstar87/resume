/**
 *  내지원정보 function
 *  지원취소, 지원삭제
 */

function fn_action(type, id) {
  var titleMsg = '<h3>지원취소 하시겠습니까?</h3>'
  var confirmMsg = '<h3>지원취소가 완료되었습니다.</h3>'

  if (type == 'delete') {
    titleMsg = '<h3>지원서의 모든 내용이 삭제됩니다. <br> 지원서를 삭제하시겠습니까?</h3>'
    confirmMsg = '<h3>지원서가 삭제 완료되었습니다.</h3>'
  }

  Dialog.confirm({
    subject: '',
    contents: titleMsg,
    approve: '확인',
    cancel: '취소',
    align: 'center',
    callback: _.bind(function (isAppoved) {
      if (isAppoved) {
        $.ajax('/resume/' + id + '/' + type, {
          method: 'POST',
          dataType: 'json',
          success: function (data, textStatus, $xhr) {
            Dialog.alert({
              subject: '',
              contents: confirmMsg,
              approve: '확인',
              align: 'center',
              callback: function () {
                location.href = '/resume/review'
              },
            })
          },
          error: function (model, response, options) {
            var err = getJSONResponse(model)
            var msg = err.message

            if (err.display) {
              showAlarmDialog(
                msg,
                _.bind(function () {
                  location.href = '/resume/review'
                }, this)
              )
            } else {
              showErrorDialog(
                msg,
                _.bind(function () {
                  location.href = '/resume/review'
                }, this)
              )
            }
          },
        })
      }
    }, this),
  })
}
