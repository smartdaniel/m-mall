const App = getApp()

Page({
    data: {
        hidden: !0,
        address: {},
        prompt: {
            hidden: !0,
            icon: '../../assets/images/iconfont-addr-empty.png',
            title: '还没有收货地址呢',
            text: '暂时没有相关数据',
        },
    },
    onLoad() {
    },
    onShow() {
        this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            address: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                },
                paginate: {}
            }
        })
    },
    toAddressEdit(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/address-edit/index', {
            id: e.currentTarget.dataset.id
        })
    },
    toAddressAdd(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/address-add/index')
    },
    setDefalutAddress(e) {
        const id = e.currentTarget.dataset.id
        App.HttpService.setDefalutAddress(id)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.onPullDownRefresh()
            }
        })
    },
    getAddressList() {
        const address = this.data.address
        const params = address.params

        this.setData({ 
            hidden: !1
        })

        App.HttpService.getAddressList(params)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                address.items = address.items.concat(data.data.items)
                address.paginate = data.data.paginate
                address.params.page = data.data.paginate.next
                address.params.limit = data.data.paginate.perPage
                this.setData({
                    address: address,
                    'prompt.hidden': address.items.length,
                })
            }

            this.setData({ 
                hidden: !0
            })
        })
    },
    onPullDownRefresh() {
        this.initData()
        this.getAddressList()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.address.paginate.hasNext) return
        this.getAddressList()
    },
})