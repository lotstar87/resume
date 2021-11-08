var jobs = jobs || {}
_.extend(jobs, Backbone.Events)
var CommonPageView = Backbone.View.extend({
  el: 'body',

  //KAKAO_HEAD_CLASS_ON_SCROLL: "head_type2",

  initialize: function () {
    this.$kakaoHead = $('#kakaoHead')
    this.$gnbSubList = $('#kakaoHead .list_sub')
    this.$openGnbMenu = null

    this.kakaoHeadClass = ''
    if (this.$kakaoHead.hasClass('head_type1')) {
      this.kakaoHeadClass = 'head_type1'
    } else if (this.$kakaoHead.hasClass('head_type3')) {
      this.kakaoHeadClass = 'head_type3'
    }

    $(window).on('scroll', _.bind(this.window_scrolled, this))
    this.listenTo(this.model, 'change', this.updateGnb)
    this.model.set('isPageScrollTop', this._getScrollTop() == 0)
  },

  _getScrollTop: function () {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  },

  changeGnbBgToOpaque: function () {
    this.$kakaoHead.removeClass(this.kakaoHeadClass)
    //  this.$kakaoHead.addClass(this.KAKAO_HEAD_CLASS_ON_SCROLL);
  },

  changeGnbBgToTransparent: function () {
    if (this.$kakaoHead.hasClass('head_type1')) {
      this.kakaoHeadClass = 'head_type1'
    } else if (this.$kakaoHead.hasClass('head_type3')) {
      this.kakaoHeadClass = 'head_type3'
    }

    //  this.$kakaoHead.removeClass(this.KAKAO_HEAD_CLASS_ON_SCROLL);
    this.$kakaoHead.addClass(this.kakaoHeadClass)
  },

  events: {
    'mouseenter #kakaoHead': 'mouseEnterGnb',
    'mouseleave #kakaoHead': 'mouseLeaveGnb',
    'mouseenter .list_gnb li': 'mouseEnterGnbItem',
  },

  window_scrolled: function () {
    this.model.set('isPageScrollTop', this._getScrollTop() == 0)
  },

  mouseEnterGnb: function () {
    this.model.set('isMouseOnGnb', true)
  },

  mouseLeaveGnb: function () {
    this.model.set('isMouseOnGnb', false)
    this.updateGnb(this.model)
    this.closeSubGnb(
      false,
      function () {
        this.model.set('isMouseOnGnb', false)
      },
      this
    )
  },
  updateGnb: function (model, options) {
    if (model.get('isPageScrollTop')) {
      if (model.get('isMouseOnGnb')) {
        this.changeGnbBgToOpaque()
      } else {
        this.changeGnbBgToTransparent()
      }
    } else {
      this.changeGnbBgToOpaque()
    }
  },

  mouseEnterGnbItem: function ($event) {
    var $currentTarget = $($event.currentTarget)

    var $prevSubGnb = this.$openGnbMenu
    var $curSubGnb = $currentTarget.find('.list_sub')
    if ($curSubGnb.length == 0) {
      $curSubGnb = null
    }

    if (!!$prevSubGnb) {
      if (!!$curSubGnb) {
        this.closeSubGnb(false)
        this.openSubGnb(false, $curSubGnb)
      } else {
        this.closeSubGnb(true)
      }
    } else {
      if (!!$curSubGnb) {
        this.openSubGnb(true, $curSubGnb)
      }
    }

    this.$openGnbMenu = $curSubGnb
  },

  openSubGnb: function (animated, $subList) {
    var duration = !!animated ? 200 : 0

    $subList.addClass('open_list')
    $subList.stop().animate({ height: '60px' }, duration, function () {})
  },

  closeSubGnb: function (animated, onClosed, context) {
    var duration = !!animated ? 200 : 0
    if (this.$openGnbMenu === null) {
      return
    }
    var $subList = this.$openGnbMenu
    $subList.stop().animate({ height: '0px' }, duration, function () {
      $subList.removeClass('open_list')
      if (_.isFunction(onClosed)) {
        onClosed.apply(context)
      }
    })
    this.$openGnbMenu = null
  },

  mouseentered_gnb_li: function () {
    if (this.pageScrollTop == 0) {
      this.beTransparentGnb(false)
    }
  },

  mouseleaved_gnb: function ($) {
    if (this.pageScrollTop == 0) {
      this.beTransparentGnb(true)
    }
  },

  mouseleaved_list_sub: function () {
    if (this.pageScrollTop > 0) {
      this.closeSubGnb()
    } else {
      this.$gnbSubList.removeClass('open_list')
    }
  },

  setKakaoHeadClass: function (kakaoHeadClass) {
    console.log('this.kakaoHeadClass:' + this.kakaoHeadClass + ' -> ' + kakaoHeadClass)
    this.$kakaoHead.removeClass(this.kakaoHeadClass)
    this.$kakaoHead.addClass(kakaoHeadClass)
    this.kakaoHeadClass = kakaoHeadClass
  },
})

$(function () {
  var Page = Backbone.Model.extend({})
  jobs.commonPageView = new CommonPageView({
    model: new Page(),
  })
})

var DialogView = Backbone.View.extend({
  initialize: function (options) {
    options = _.defaults(options || {}, { autoHide: true })
    this.autoHide = options.autoHide
  },
  events: {
    'click ._approve': 'approved',
    'click ._cancel': 'canceled',
    'click ._hide': 'hided',
  },
  show: function () {
    this.$dimmedLayer = this.$('.dimmed_layer')
    if (this.$dimmedLayer.length == 0) {
      this.$dimmedLayer = $('<div class="dimmed_layer" style=" display: block; z-index: 0; "></div>')
      this.$dimmedLayer.insertBefore(this.$('.wrap_cont'))
    }
    $('body').css('overflow', 'hidden')
    this.$el.show()
  },
  hide: function () {
    $('body').css('overflow', '')
    this.$el.hide()
    if (this.$dimmedLayer) {
      // this.$dimmedLayer.remove();
      if (
        this.el.id != 'confirmWriteCompleteApplyDialog' &&
        this.el.id != 'jobApplyDialog' &&
        this.el.id != 'poolApplyDialog'
      ) {
        this.$dimmedLayer.remove()
      }
    }
    this.trigger('closed')
  },
  approved: function () {
    if (this.autoHide) {
      this.hide()
    }
    this.trigger('approve')
  },
  canceled: function () {
    this.hide()
    this.trigger('cancel')
  },
  hided: function () {
    this.hide()
  },
})

// (new Dialog()).render().alert({
//     subject: "입력되었던 경력이 삭제됩니다.",
//     contents: "'경력없음'을 선택하면, 기존에 입력된 경력이 모두 삭제됩니다.",
//     approve: "모두삭제",
//     cancel: "취소",
//     callback: function(isAppoved) {
//         console.log(isAppoved ? "YES" : "NO");
//     }
// });
var Dialog = Backbone.View.extend({
  className: 'basic_layer _dialog',
  template: _.template(
    '<div class="inner_basic_layer">' +
      '   <div class="wrap_cont">' +
      '       <div class="cont_layer">' +
      '           <div class="layer_body txt_center">' +
      '               <h4 class="screen_out _subject">SUBJECT</h4>' +
      '               <strong class="txt_layer _subject">SUBJECT</strong>' +
      '               <p class="txt_guide _contents">CONTENTS</p>' +
      '               <div class="area_btn">' +
      '                   <button type="button" class="_cancel btn_set btn_set2">CANCEL</button>' +
      '                   <button type="button" class="_approve btn_set btn_set2">APPROVE</button>' +
      '               </div>' +
      '           </div>' +
      '           <div class="layer_foot">' +
      '               <a href="javascript:void(0)" class="_cancel ico_recruit btn_close">CANCEL</a>' +
      '           </div>' +
      '       </div>' +
      '   </div>' +
      '</div>'
  ),
  initialize: function () {
    this.dialogView = new DialogView({
      el: this.$el,
    })
    this.callback = null
    this.listenTo(this.dialogView, 'approve', this.approved)
    this.listenTo(this.dialogView, 'cancel', this.canceled)
  },
  approved: function () {
    this.callback(true)
    this.callback = null
  },
  canceled: function () {
    this.callback(false)
    this.callback = null
  },
  render: function () {
    this.$el.html(this.template())
    this.dialogView.hide()
    $('body').append(this.$el)
    return this
  },
  alert: function (options) {
    this.$el.find('button._cancel').hide()
    this.$el.find('button').removeClass('btn_set2')

    this._display(options)
  },
  confirm: function (options) {
    this.$el.find('button').addClass('btn_set2')
    this.$el.find('button._cancel').show()

    this._display(options)
  },
  _display: function (options) {
    var opt = _.defaults(options || {}, {
      subject: 'SUBJECT',
      contents: 'CONTENTS',
      approve: 'Ok',
      cancel: 'Cancel',
      align: '',
      callback: _.noop,
    })

    this.callback = opt.callback

    this.$el.find('._subject').html(opt.subject)
    this.$el.find('._contents').html(opt.contents)
    this.$el.find('._cancel').html(opt.cancel)
    this.$el.find('._approve').html(opt.approve)
    this.dialogView.show()
  },
})

Dialog._instance = null
Dialog._getInstance = function () {
  if (Dialog._instance === null) {
    Dialog._instance = new Dialog()
    Dialog._instance.render()
  }
  return Dialog._instance
}

Dialog.confirm = function (options, contents, callback) {
  // Dialog.confirm("제목", "이러이러 합니다.", function(){}); 형태..
  if (_.isString(options) && _.isString(contents) && _.isFunction(callback)) {
    options = {
      subject: options,
      contents: contents,
      approve: '확인',
      cancel: '취소',
      align: options,
      callback: callback,
    }
  }
  Dialog._getInstance().confirm(options)
}

Dialog.alert = function (options, contents, callback) {
  // Dialog.alert("제목", "이러이러 합니다.", function(){}); 형태..
  if (_.isString(options) && _.isString(contents) && _.isFunction(callback)) {
    options = {
      subject: options,
      contents: contents,
      approve: '확인',
      align: options,
      callback: callback,
    }
  }
  Dialog._getInstance().alert(options)
}

/**
 * 특정 엘리먼트(toggleEl) 를 클릭하면, popupEl 을 띄워주고(open),
 * popupEl 외부를 클릭하면, popupEl 내려줌(close).
 *
 * @type {void|*}
 */
var TogglePopupView = Backbone.View.extend({
  initialize: function (options) {
    // 열린 상태인지 아닌지.
    this._opened = false
    // $el 내부 클릭에도 닫히게 만들 것인지.
    this._closeOnInnerClick = options.closeOnClick || false
    this._toggleEl = options.toggleEl
    this._popupEl = options.popupEl || this._toggleEl

    this.setElement(this._toggleEl)

    // 열리는 액선 콜백.
    this.open = options.open || $.noop
    // 닫히는 액션 콜백.
    this.close = options.close || $.noop

    $(document).on(
      'click',
      $.proxy(function (event) {
        var $target = $(event.target)
        if (!this._opened) {
          var isTargetInToggleEl = $target.closest(this._toggleEl).length > 0
          if (isTargetInToggleEl) {
            this.open.call(this)
            this._opened = true
          }
        } else {
          var isTargetInPopupEl = $target.closest(this._popupEl).length > 0
          var needsClose = this._closeOnInnerClick ? true : !isTargetInPopupEl
          if (needsClose) {
            this.close.call(this)
            this._opened = false
          }
        }
      }, this)
    )
  },
})

$(function () {
  /**
   * 내 지원정보 영역.
   */
  ;(function loginBox() {
    var $login_wrap = $('.login_user_info')
    var $box_info = $login_wrap.find('.box_info')

    new TogglePopupView({
      toggleEl: $login_wrap,
      popupEl: $box_info,
      open: function () {
        $login_wrap.addClass('login_on')
      },
      close: function () {
        $login_wrap.removeClass('login_on')
      },
    })
  })()

  /**
   * 모바일 - 내 지원정보 영역
   */
  ;(function mobileLoginBox() {
    var $login_wrap = $('#mobileLoginBtn')
    var $box_info = $login_wrap.find('.box_info')

    new TogglePopupView({
      toggleEl: $login_wrap,
      popupEl: $box_info,
      open: function () {
        $login_wrap.addClass('login_on')
      },
      close: function () {
        $login_wrap.removeClass('login_on')
      },
    })

    //모바일 내 지원정보 영역 X 버튼 클릭
    $('.link_close').on('click', function () {
      $login_wrap.removeClass('login_on')
    })
  })()

  /**
   * 푸터 영역.
   */
  ;(function kakaoFooter() {
    var $footer = $('#kakaoFoot')
    var $family_sites = $footer.find('.family_sites')
    var $supported_langs = $footer.find('.supported_langs')

    new TogglePopupView({
      toggleEl: $family_sites,
      closeOnClick: true,
      open: function () {
        $family_sites.addClass('util_open')
      },
      close: function () {
        $family_sites.removeClass('util_open')
      },
    })

    new TogglePopupView({
      toggleEl: $supported_langs,
      closeOnClick: true,
      open: function () {
        $supported_langs.addClass('util_open')
      },
      close: function () {
        $supported_langs.removeClass('util_open')
      },
    })
  })()
})
