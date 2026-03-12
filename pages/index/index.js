// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// ！！！关键：从 sourcedata.js 中引入数据（假设这两个文件在同一个文件夹下） ！！！
const { headers, scoreData } = require('./sourcedata.js');

Page({
  data: {
    inputVal: '',
    result: null,
    hasSearched: false,
    error: ''
  },

  onInput(e) {
    this.setData({
      inputVal: e.detail.value.trim(),
      hasSearched: false,
      result: null,
      error: ''
    });
  },

  searchScore() {
    const id = this.data.inputVal;
    
    if (!id) {
      wx.showToast({ title: '请输入学号', icon: 'none' });
      return;
    }

    const found = scoreData.find(item => item.id === id);

    if (found) {
      // 在查询成功时，动态组装出完整的题型得分列表传给前端界面
      const details = headers.map((name, index) => {
        return { name: name, score: found.s[index] };
      });

      this.setData({
        result: {
          id: found.id,
          zc: found.zc,
          kg: found.kg,
          zg: found.zg,
          details: details
        },
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