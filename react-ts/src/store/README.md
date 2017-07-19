# Redux

state 状态管理

JavaScript 需要管理比任何时候都要多的state(状态)---->管理state变得非常困难
---->需要一种新的解决方案来做这件事情--->复杂的根源：混淆同步和异步--->解决方案，将二者分开------------> Redux

### 三大原则
1. 单一数据源
store.getState() 

2. State 是readonly 只读的
不能直接去修改state，唯一改变state的方法是触发action，action是一个用于描述已发生事件的普通对象

这样确保试图和网络请求都不能直接修改state，相反的，它们只能表现想要修改的意图，所有的修改都将会被集中化处理，且严格按照顺序执行

store.dispatch({
  type: 'xx',
  index: 1
})

store.dispatch({
  type: 'ss',
  filter: 'dd'
})

3. 使用纯函数来执行修改操作
为了描述action如何改变state，你需要编写`reducers`

Reducer只是一些纯函数，他接受先前的state和action，返回新的state

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch(action.type) {
    case "SET_VISIBLITY_FILTER":
      return action.filter
    case "xxx":
      return action.xxx
    default:
      return state
  }
}