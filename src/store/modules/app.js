const app = {
  state: {
    showFooter:'265',
    remarks:'',
    detail:{}
  },
    mutations: {
    	SHOW_FOOTER:(state,data) => {
    	state.showFooter = data
    },
     remarks:(state,remarks) => {
    	state.remarks = remarks
    },
    detail:(state,data) => {
    	state.detail = data
    },
  },
    actions: {
    	showFooter: ({ commit },showFooter) => {
    		commit('SHOW_FOOTER',showFooter)
    },
     	remarks: ({ commit },remarks) => {
    		commit('remarks',remarks)
    },
     	detail: ({ commit },detail) => {
    		commit('detail',detail)
    }

    
  }
}
export default app