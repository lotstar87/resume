;(function () {
  jobs.Agreement = Backbone.Model.extend({
    initialize: function (opts) {
      this.resumeId = opts.resumeId
    },

    url: function () {
      return '/resume/' + this.resumeId + '/agreement'
    },
  })
})()
