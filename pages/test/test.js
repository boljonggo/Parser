// pages/test/test.js
var htmlString;
Page({
  data: {
    parseing: false,
    modes: ['前端解析', '后端-HTML模式', '后端-网址模式', '后端-MarkDown模式'],
    modeIndex: 0,
    styles: ['a11y-dark', 'a11y-light', 'agate', 'an-old-hope', 'androidstudio', 'arduino-light', 'arta', 'ascetic', 'atelier-cave-dark', 'atelier-cave-light', 'atelier-dune-dark', 'atelier-dune-light', 'atelier-estuary-dark', 'atelier-estuary-light', 'atelier-forest-dark', 'atelier-forest-light', 'atelier-heath-dark', 'atelier-heath-light', 'atelier-lakeside-dark', 'atelier-lakeside-light', 'atelier-plateau-dark', 'atelier-plateau-light', 'atelier-savanna-dark', 'atelier-savanna-light', 'atelier-seaside-dark', 'atelier-seaside-light', 'atelier-sulphurpool-dark', 'atelier-sulphurpool-light', 'atom-one-dark-reasonable', 'atom-one-dark', 'atom-one-light', 'codepen-embed', 'color-brewer', 'darcula', 'dark', 'darkula', 'default', 'docco', 'dracula', 'far', 'foundation', 'github-gist', 'github', 'gml', 'googlecode', 'grayscale', 'gruvbox-dark', 'gruvbox-light', 'hopscotch', 'hybrid', 'idea', 'ir-black', 'isbl-editor-dark', 'isbl-editor-light', 'kimbie.dark', 'kimbie.light', 'lightfair', 'magula', 'mono-blue', 'monokai-sublime', 'monokai', 'nord', 'obsidian', 'ocean', 'paraiso-dark', 'paraiso-light', 'purebasic', 'qtcreator_dark', 'qtcreator_light', 'railscasts', 'rainbow', 'routeros', 'shades-of-purple', 'solarized-dark', 'solarized-light', 'sunburst', 'tomorrow-night-blue', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'tomorrow-night', 'tomorrow', 'vs', 'vs2015', 'xcode', 'xt256', 'zenburn'],
    styleIndex:36
  },
  onLoad() {
    htmlString = "";
  },
  inputHtml(e) {
    htmlString = e.detail.value;
  },
  addTemplate(e) {
    switch (e.target.dataset.type) {
      case 'table':
        htmlString += '<style>\ntable{\n  border-left:1px solid #dfe2e5;\n  border-top:1px solid #dfe2e5\n}\ntd{\n  text-align:ceter;\n  border-right:1px solid #dfe2e5;\n  border-bottom:1px solid #dfe2e5;\n  font-size:14px;\n  padding:5px;\n}\n</style>\n<table>\n  <tr>\n    <td>标题1</td>\n    <td>标题2</td>\n    <td>标题3</td>\n  </tr>\n  <tr>\n    <td rowspan=2>内容1</td>\n    <td>内容2</td>\n    <td>内容3</td>\n  </tr>\n  <tr>\n    <td>内容4</td>\n    <td>内容5</td>\n  </tr>\n</table>';
        break;
      case 'list':
        htmlString += '<ol>\n  <li>有序列表1</li>\n  <li>有序列表2</li>\n</ol>\n<ul>\n  <li>无序列表1</li>\n  <li>无序列表2</li>\n</ul>';
        break;
      case 'img':
        htmlString += '<div style="text-align:center;">\n  <img src="http://bmob-cdn-17111.b0.upaiyun.com/2019/04/13/b5f2a4b340b855488029635bb8649309.jpg" />\n<p style="color:gray;font-size:12px;text-align:center">点击图片预览</p>\n</br>\n  <img ignore src="http://bmob-cdn-17111.b0.upaiyun.com/2019/04/14/190f5994407ecad1805d8a3478e64821.gif" width="50%"/>\n  <p style="color:gray;font-size:12px">装饰图片不能预览</p>\n</div>';
        break;
      case 'video':
        htmlString += '<div style="text-align:center;">\n  <video src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" controls="true"></video>\n</div>';
        break;
      case 'a':
        htmlString += '<div style="text-align:center">\n  <a href="/pages/introduction/introduction">\n    <img src="http://bmob-cdn-17111.b0.upaiyun.com/2019/04/13/b5f2a4b340b855488029635bb8649309.jpg" />\n  </a>\n  <p style="font-size:12px;color:gray">图片链接，点击可以跳转</p>\n  <br />\n  <a href="https://github.com/jin-yufeng/Parser">https://github.com/jin-yufeng/Parser</a>\n  <p style="color:gray;font-size:12px">外部链接，长按可以复制</p>\n</div>'
    }
    this.setData({
      htmlString
    })
  },
  changeMode(e) {
    this.setData({
      modeIndex: parseInt(e.detail.value)
    })
  },
  changeStyle(e) {
    this.setData({
      styleIndex: parseInt(e.detail.value)
    })
  },
  clearHtml() {
    htmlString = "";
    this.setData({
      html: "",
      htmlString: "",
      modeIndex: 0,
      styleIndex: 36,
      parseing: false
    })
  },
  focus(){
    this.setData({
      parseing:false,
      focus:true,
    })
  },
  parseHtml(e) {
    if (e.detail.value.mode == 0) {
      var that=this;
      this.setData({
        parseing:true,
        htmlString: e.detail.value.html,
        html: e.detail.value.html
      })
    } else {
      if (e.detail.value.mode == 2 && !/https*:\/\//.test(e.detail.value.html)){
        wx.showModal({
          title: '失败',
          content: '无效的网址！网址必须以http://或https://开头',
          showCancel: false
        })
        return;
      }
      wx.showLoading({
        title: '解析中',
      })
      var that = this;
      var mode;
      if (e.detail.value.mode == 3) mode = 'markdown';
      else if (e.detail.value.mode == 2) mode = 'website';
      else mode = 'html';
      wx.cloud.init();
      wx.cloud.callFunction({
        name: 'parser',
        data: {
          data: e.detail.value.html,
          mode: mode,
          options:{styles:that.data.styles[e.detail.value.styles]}
        },
        success: res => {
          wx.hideLoading()
          that.setData({
            parseing: true,
            htmlString: e.detail.value.html,
            html: res.result,
          })
        },
        fail: err => {
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: '解析失败，' + err.errMsg,
            showCancel:false
          })
        }
      })
    }
  },
})