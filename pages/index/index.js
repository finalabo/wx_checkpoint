// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// pages/index/index.js
const { scoreData } = require('./sourcedata.js'); // 引入数据

Page({
  data: {
    inputVal: '',
    result: null,
    hasSearched: false,
    error: ''
  },

  // 监听输入框
  onInput(e) {
    this.setData({
      inputVal: e.detail.value.trim(), // 去除前后空格
      hasSearched: false,
      result: null,
      error: ''
    });
  },

  // 点击查询按钮
  searchScore() {
    const id = this.data.inputVal;
    
    if (!id) {
      wx.showToast({ title: '请输入学号', icon: 'none' });
      return;
    }

    // 在数据中查找
    const found = scoreData.find(item => item.id === id);

    if (found) {
      this.setData({
        result: found,
        hasSearched: true,
        error: ''
      });
    } else {
      this.setData({
        result: null,
        hasSearched: true,
        error: '未找到该学号的成绩信息'
      });
    }
  }
});