const app = {
  state: {
    showFooter:'265',
    remarks:'',
    detail:{},
    refpath:''
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
    refpath:(state,data) => {
    	state.refpath = data
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
    },
    refpath: ({ commit },detail) => {
    		commit('refpath',detail)
    }

    
  }
}
export default app