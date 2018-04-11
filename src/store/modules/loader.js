import * as types from '../mutation-types'

// 初始状态
const initalState = {
  loaded: false,
  name: '',
  type: '', // 文件类型
  url: '',
  undoList: []
}

const mutations = {
  [types.LOADER_ASSIGN] (state, data) {
    const undoList = state.undoList.push(data.url)
    Object.assign(state, data, undoList)
  }
}

const actions = {
  update (context, data) {
    context.commit(types.LOADER_ASSIGN, data)
  }
}

const getters = {

}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: Object.assign({}, initalState)
}
