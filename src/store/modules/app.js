const app = {
  state: {
    //	详情
    detail: {},
    //  地址薄添加
    refpath: '',
    //  版本
    version: '',
    // loading加載
    loading:false,
  },
  mutations: {
    detail: (state, detail) => {
      state.detail = detail
    },
    refpath: (state, refpath) => {
      state.refpath = refpath
    },
    version: (state, version) => {
      state.version = version
    },
    set_loading: (state, loading) => {
      state.loading = loading
    },
  },
  actions: {
    detail: ({ commit }, detail) => {
      commit('detail', detail)
    },
    refpath: ({ commit }, refpath) => {
      commit('refpath', refpath)
    },
    version: ({ commit }, version) => {
      commit('version', version)
    },
    setLoading: ({ commit }, loading) => {
      commit('set_loading', loading)
    }
  }
}
export default app