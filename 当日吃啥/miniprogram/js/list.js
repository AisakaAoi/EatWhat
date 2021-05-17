// recList为菜谱使用数据
const recList = [
  {
    id: "c",
    head: "C",
    children: [
      {
        text: "葱油汤面",
      }, 
      {
        text: "脆皮炸牛奶",
      }, 
      {
        text: "超好吃的雪媚娘",
      }, 
      {
        text: "炒三丝",
      }
    ]
  }, 
  {
    id: "d",
    head: "D",
    children: [
      {
        text: "豆腐鲜虾菇菌汤",
      }, 
      {
        text: "大闸蟹",
      }
    ]
  }, 
  {
    id: "f",
    head: "F",
    children: [
      {
        text: "粉嫩嫩小白熊饭团便当",
      }
    ]
  }, 
  {
    id: "h",
    head: "H",
    children: [
      {
        text: "红豆糯米饼",
      }, 
      {
        text: "红烧鲫鱼",
      }
    ]
  }, 
  {
    id: "j",
    head: "J",
    children: [
      {
        text: "鸡爪煲",
      }
    ]
  }, 
  {
    id: "k",
    head: "K",
    children: [
      {
        text: "考伯沙拉",
      }
    ]
  }, 
  {
    id: "m",
    head: "M",
    children: [
      {
        text: "蜜桃气泡水",
      }, 
      {
        text: "麻婆豆腐",
      }
    ]
  }, 
  {
    id: "n",
    head: "N",
    children: [
      {
        text: "柠檬红茶冻撞奶",
      }
    ]
  }, 
  {
    id: "q",
    head: "Q",
    children: [
      {
        text: "清晨醒胃暖胃粥",
      }
    ]
  }, 
  {
    id: "s",
    head: "S",
    children: [
      {
        text: "酸汤肥牛",
      }
    ]
  }, 
  {
    id: "x",
    head: "X",
    children: [
      {
        text: "香菇鸡肉粥",
      }, 
      {
        text: "夏日健身减脂沙拉",
      }
    ]
  }, 
  {
    id: "y",
    head: "Y",
    children: [
      {
        text: "尹正同款焖菜",
      }
    ]
  }, 
  {
    id: "z",
    head: "Z",
    children: [
      {
        text: "孜然椒盐小土豆",
      }, 
      {
        text: "炸酱面",
      }, 
      {
        text: "猪骨玉米红萝卜汤",
      }, 
      {
        text: "自制卤菜",
      }
    ]
  }, 
]

const indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

module.exports = {
  recList,
  indexArr,
}
