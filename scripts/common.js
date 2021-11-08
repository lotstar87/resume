var jobs = jobs || {}
if (!window.__console_log) {
  console.log = console.dir = function () {}
}
jobs.JOB_OFFER_ID = 'kjid'
jobs.JOB_BIRTHDAY_CONFIRM = 'kjbirth'

function getJSONResponse(xhr) {
  if (!!xhr.responseJSON) {
    return xhr.responseJSON
  }
  var response
  try {
    response = JSON.parse(xhr.responseText)
  } catch (err) {
    response = { msg: xhr.responseText }
  }
  return response
}

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
  if (Raven) {
    Raven.captureMessage(thrownError || jqxhr.statusText, {
      extra: {
        type: settings.type,
        url: settings.url,
        data: settings.data,
        status: jqxhr.status,
        error: thrownError || jqxhr.statusText,
        response: jqxhr.responseText.substring(0, 100),
      },
    })
  }
  var res = getJSONResponse(jqxhr)
  if (!!res) {
    var msg = res.message || ''
    if (msg.indexOf('Expected CSRF token not found') == 0 || msg.indexOf('Invalid CSRF Token') == 0) {
      jobs._warn_on_unload = false
      Dialog.alert('', '로그아웃되었습니다.<br/>시작페이지로 돌아갑니다.', function () {
        location.pathname = location.pathname.startsWith('/m/') ? '/m/index' : '/index'
      })
    }
  }
})

/**
 * 숫자만 입력가능하게 하는 함수
 */
function fn_onlyNumber(event) {
  event = event || window.event
  var keyID = event.which ? event.which : event.keyCode
  if (
    (keyID >= 48 && keyID <= 57) ||
    (keyID >= 96 && keyID <= 105) ||
    keyID == 8 ||
    keyID == 9 ||
    keyID == 46 ||
    keyID == 37 ||
    keyID == 39
  )
    return
  else return false
}

function isValidDateStr(str) {
  var date = new Date(str)
  return !_.isNaN(date.getTime())
}

/**
 * 문자를 제거하는 함수
 */
function removeChar(event) {
  event = event || window.event
  var keyID = event.which ? event.which : event.keyCode
  if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39) return
  else event.target.value = event.target.value.replace(/[^0-9]/g, '')
}

/**
 * 핸드폰 번호 입력할 때 자동대시
 * 11자리 : 000-0000-0000
 * 10자리 : 000-000-0000
 */
function autoDashPhoneNumber(str) {
  str = str.replace(/[^0-9]/g, '')
  var tmp = ''
  if (str.length < 4) {
    return str
  } else if (str.length < 7) {
    tmp += str.substr(0, 3)
    tmp += '-'
    tmp += str.substr(3)
    return tmp
  } else if (str.length < 11) {
    tmp += str.substr(0, 3)
    tmp += '-'
    tmp += str.substr(3, 3)
    tmp += '-'
    tmp += str.substr(6)
    return tmp
  } else {
    tmp += str.substr(0, 3)
    tmp += '-'
    tmp += str.substr(3, 4)
    tmp += '-'
    tmp += str.substr(7)
    return tmp
  }
  return str
}

/**
 * 생일 입력할 때 자동대시
 */
function autoDashDate(str) {
  str = str.replace(/[^0-9]/g, '')

  var tmp = ''
  if (str.length < 5) {
    return str
  } else if (str.length < 7) {
    tmp += str.substr(0, 4)
    tmp += '-'
    tmp += str.substr(4, 5)
    return tmp
  } else {
    tmp += str.substr(0, 4)
    tmp += '-'
    tmp += str.substr(4, 2)
    tmp += '-'
    tmp += str.substr(6, 2)
    return tmp
  }
}

function autoDashYYYYMMDate(str) {
  return autoDashDate(str).substr(0, 7)
}

/**
 * 주민번호 입력시에 자동대시
 */
function autoDashResidentNumber(str) {
  str = str.replace(/[^0-9]/g, '')
  var tmp = ''
  if (str.length > 13) {
    tmp += str.substr(0, 6)
    tmp += '-'
    tmp += str.substr(6, 7)
    return tmp
  } else if (str.length > 6) {
    tmp += str.substr(0, 6)
    tmp += '-'
    tmp += str.substr(6, str.length)
    return tmp
  } else {
    return str
  }
}

/**
 * 입력폼내용을 object로 serialize해줌
 */
$.fn.serializeObject = function () {
  var o = {}
  var a = this.serializeArray()
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]]
      }
      o[this.name].push(this.value || '')
    } else {
      o[this.name] = this.value || ''
    }
  })
  return o
}

/**
 * 접속 브라우저가 Flash를 지원하는지 여부 리턴
 */
function is_flash_installed() {
  var is_flash_installed = false
  try {
    if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) is_flash_installed = true
  } catch (e) {
    if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) is_flash_installed = true
  }
  return is_flash_installed
}

/**
 * 금액 입력시에 comma추가
 * @param x
 * @returns {XML|*|string|void}
 */
function numberWithCommas(x) {
  if (!x) {
    return ''
  }
  var val = x
    .toString()
    .trim()
    .replace(/[^0-9]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return val
}

/**
 * 접속 브라우저가 Flash 지원을 하지 않을 경우
 * 클립보드 복사
 */
function copy_to_clipboard(str) {
  prompt(msg('common.copy_popup'), str)
}

/**
 * 인사이드 페이지 HeadType가져오기
 */
function insideHeadType(keyword, type) {
  if (
    keyword == 'townhall' ||
    keyword == 'jejulife' ||
    keyword == 'interviewroom' ||
    keyword == 'cola' ||
    keyword == 't500'
  ) {
    if (type == 'head') return 'head_type1'
    else return 'paging_type2'
  } else {
    if (type == 'head') return 'head_type3'
    else return 'paging_type1'
  }
}

/**
 * 첨부파일 사이즈 가져오기
 * */
function formatBytes(bytes, decimals) {
  if (bytes == 0) return '0 Byte'
  var k = 1000
  var dm = decimals + 1 || 3
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 자료형에 상관없이 빈값인지 확인하고 싶은때 사용
 */
function isEmpty(value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)
  ) {
    return true
  } else {
    return false
  }
}

/**
 * Html에서 태그를 제거
 */
function RemoveHTML(text) {
  var objReg = new RegExp()
  objReg = /[<][^>]*[>]/gi
  text = text.replace(objReg, '')
  return text
}

/**
 * 1자리 숫자일 경우 0붙여주기
 * @param n
 * @returns {string}
 */
function addZero(n) {
  return n < 10 ? '0' + n : n
}

/**
 * 태그 제거하기
 * @param input
 * @param allowed
 * @returns {XML|string}
 */
function strip_tags(input, allowed) {
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
  })
}

function showAlarmDialog(msg, callback) {
  if (typeof msg == 'undefined') {
    msg = ''
  }

  Dialog.alert({
    subject: '시스템 알림',
    contents: '<h3>' + msg + '</h3>',
    approve: '확인',
    callback: callback,
  })
}

function showErrorDialog(msg, callback) {
  if (typeof msg == 'undefined') {
    msg = ''
  }

  Dialog.alert({
    subject: '오류 발생',
    contents: '다음과 같은 오류가 발생하였습니다.<br><br>' + '<h3>' + msg + '</h3>',
    approve: '확인',
    callback: callback,
  })
}

function msg(code) {
  var _arguments = arguments
  var locale = getCookie('lang')

  if (!englishTarget()) {
    locale = 'ko'
  }
  var messages = ''
  if (code == '') {
    return messages
  }
  if (!msg.loaded) {
    jQuery.i18n.properties({
      name: 'messages',
      path: '/messages/',
      mode: 'map',
      language: locale,
      async: false,
      checkAvailableLanguages: true,
      callback: function () {
        msg.loaded = true
        messages = jQuery.i18n.prop.apply(this, _arguments)
      },
    })
  } else {
    messages = jQuery.i18n.prop.apply(this, _arguments)
  }
  return messages
}
msg.loaded = false

function englishTarget() {
  var url = window.location.pathname

  if (
    url.indexOf('/login') > -1 ||
    url.indexOf('/index') > -1 ||
    url.indexOf('/inside/') > -1 ||
    url.indexOf('/krew') > -1 ||
    url.indexOf('/interview/') > -1 ||
    url.indexOf('/ai') > -1 ||
    url.indexOf('/jobs') > -1 ||
    url.indexOf('/jobs/') > -1 ||
    url.indexOf('/process') > -1 ||
    url.indexOf('/notice') > -1 ||
    url.indexOf('/notice/') > -1 ||
    url.indexOf('/faq') > -1
  ) {
    return true
  } else {
    return false
  }
}

/**
 * 쿠키관련 함수 (get/set/delete)
 * @param name
 * @returns {T}
 */
function getCookie(cName) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + cName + '=')
  if (parts.length == 2) return parts.pop().split(';').shift()
}

function setCookie(cName, cValue, cDay) {
  var expire = new Date()
  expire.setDate(expire.getDate() + cDay)
  cookies = cName + '=' + escape(cValue) + '; domain=' + location.hostname + '; path=/;'
  if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';'
  document.cookie = cookies
}

function DeleteCookie(name) {
  setCookie(name, '', -1)
}

function msieversion() {
  var ua = window.navigator.userAgent
  var msie = ua.indexOf('MSIE ')
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer, return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)))
  }
}

function checkIe() {
  // const protocol = location.protocol;
  // const host = location.host;
  // const browserSupportUrl = protocol + host + '/browserSupport';
  //
  if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    window.location = 'microsoft-edge:' + window.location
    return setTimeout(function () {
      window.location = '/browserSupport'
    }, 1)
  }
}

if (!window.history) {
  jobs.pushState = function () {}
  jobs.renderHistorySensitiveSection = function (initState, handler, ctx) {
    'use strict'
    var ctx = ctx || window
    handler.call(ctx, initState, null)
  }
} else {
  jobs.pushState = function (state, title, url) {
    'use strict'
    if (history.state == null || history.state.id != state.id) {
      console.log('pushState:', state.id)
      history.pushState(state, title, url)
    } else {
      console.log('replaceState:', state.id)
      history.replaceState(state, title, url)
    }
  }

  jobs.renderHistorySensitiveSection = function (initState, handler, ctx) {
    'use strict'
    var ctx = ctx || window
    var lastState = initState

    // jobs.pushState(initState, "", location.pathname);
    handler.call(ctx, initState, null)
    $(window).on('popstate', function (event) {
      var curState = event.originalEvent.state
      if (curState == null) {
        history.back()
      } else {
        handler.call(ctx, curState, lastState)
        lastState = curState
      }
    })
  }
}

function renderHashSensitiveSection(handler, ctx) {
  'use strict'
  var ctx = ctx || window
  var oldHash = location.hash.substring(1)

  // First-time calling.
  handler.call(ctx, oldHash, null)
  $(window).on('hashchange', function () {
    'use strict'
    var newHash = location.hash.substring(1)
    if (oldHash != newHash) {
      // Hash changed.
      handler.call(ctx || window, newHash, oldHash)
      oldHash = newHash
    }
  })
}

String.prototype.replaceAll = function (org, dest) {
  return this.split(org).join(dest)
}

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1
  var dd = this.getDate()

  return [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-')
}
