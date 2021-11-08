;(function () {
  jobs.PoolApplyAgreementView = Backbone.View.extend({
    events: {
      'click .btn_desc': '_btnDescClicked',
    },

    initialize: function (opts) {
      var resumeId = (this.resumeId = opts.resumeId)

      this.$layerDesc = this.$('.layer_desc')
      this.isDescShow = false

      var agreementAOE = this.model

      var confirmAgreeDialog = new DialogView({
        el: '#confirmAgreeeAOEDialog',
      })

      var confirmDisagreeDialog = new DialogView({
        el: '#confirmDisagreeAOEDialog',
      })

      var agreementAOECheckbox = new jobs.WrapCheck({
        el: this.$('#agreeOpenCheckbox'),
      })

      agreementAOE.on(
        {
          // "all": function() {
          //     console.log("AGREEMENT_AOE",arguments);
          // },
          'change:agree': function (model, agree, opts) {
            agreementAOECheckbox.val(agree)
          },
          sync: function () {
            jobs.trigger('save')
          },
        },
        this
      )

      confirmAgreeDialog.on(
        {
          approve: function () {
            agreementAOE.save({ agree: true }, { wait: true })
          },
          cancel: function () {
            agreementAOECheckbox.val(false)
          },
        },
        this
      )

      confirmDisagreeDialog.on(
        {
          approve: function () {
            $.ajax('/resume/' + this.resumeId + '/pool/cancel', {
              method: 'POST',
              context: this,
              dataType: 'json',
              success: function (data, textStatus, $xhr) {
                agreementAOE.save({ agree: false }, { wait: true })
              },
              error: function (model) {
                var err = getJSONResponse(model)
                var msg = err.message
                showAlarmDialog(
                  msg,
                  _.bind(function () {
                    location.reload()
                  }, this)
                )
              },
            })
          },
          cancel: function () {
            agreementAOECheckbox.val(true)
          },
        },
        this
      )

      agreementAOECheckbox.on(
        {
          change: function (checked) {
            var agree = checked
            agreementAOE.set('agree', agree)
            var dialog = agree ? confirmAgreeDialog : confirmDisagreeDialog

            var isOnPool = this.$('#agreeOpenCheckbox').data('is-on-pool')
            if (isOnPool == true && checked == false) {
              Dialog.alert({
                subject: '인재풀 지원취소 알림',
                contents: '<h3>상시 영입 활용 동의를 철회하실 경우에는 <br> 인재풀 지원이 취소됩니다.</h3>',
                approve: msg('common.confirm'),
                align: 'center',
                callback: _.bind(function (isApproved) {
                  if (isApproved) {
                    dialog.show()
                  } else {
                    agreementAOECheckbox.val(true)
                  }
                }, this),
              })
            } else {
              dialog.show()
            }
          },
        },
        this
      )

      agreementAOE.set({ agree: agreementAOECheckbox.checked() }, { silent: true })
    },

    // EXTERNAL METHODS.

    // EVENTS HANDLERS.

    _btnDescClicked: function ($event) {
      if (this.isDescShow) {
        this._descShow(false)
        return
      }

      $event.stopPropagation()
      this._descShow(true)
      $(document).one(
        'click',
        _.bind(function ($event) {
          this._descShow(false)
        }, this)
      )
    },

    // ACTIONS.

    _descShow: function (show) {
      if (show) {
        this.$layerDesc.show()
      } else {
        this.$layerDesc.hide()
      }
      this.isDescShow = show
    },

    lucky: true,
  })
})()
