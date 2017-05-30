const App = getApp()

Page({
  data: {
    indicatorDots: !1,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !1,
  },
  onLoad() { },
  onShow() { },
  bindload(e) {
    //setTimeout(App.WxService.getStorageSync('token') ? this.goIndex : this.goLogin, 3000)
    try {
      var token = App.WxService.getStorageSync('token')
      if (token) {
        this.goIndex
      }
      else {
        App.HttpService.getAccessToken({
          clientId: App.Config.clientId,
          clientSecret: App.Config.clientSecret,
          serverUrl: App.Config.fileBasePath,
          redirectUrl: App.Config.redirectUrl,
          apiToken: App.Config.apiToken
        }).then(data => {
          console.log(data)
          if (data.accessToken) {
            App.WxService.setStorageSync('token', data.accessToken)
            this.goLogin
          }
        })
      }
    } catch (e) {
      console.error(e);
    }
  },
  goIndex() {
    App.WxService.switchTab({
      url: '/pages/index/index'
    })
  },
  goLogin() {
    App.WxService.redirectTo('/pages/login/index')
  },
})
