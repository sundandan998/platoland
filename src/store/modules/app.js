	const app = {
  state: {
    showFooter:'265',
    remarks:''
  },
    mutations: {
    	SHOW_FOOTER:(state,data) => {
    	state.showFooter = data
    },
     remarks:(state,remarks) => {
    	state.remarks = remarks
    },
  },
    actions: {
    	showFooter: ({ commit },showFooter) => {
    		commit('SHOW_FOOTER',showFooter)
    },
     	remarks: ({ commit },remarks) => {
    		commit('remarks',remarks)
    }
    
  }
}
export default app