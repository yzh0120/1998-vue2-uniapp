const state = {
	userInfo: {}
}

const mutations = {
	userInfo_fn(state, params) {
		state.userInfo = params
	},

	setUserInfo(state, data) {
		state.userInfo = data
	},
}

const actions = {
	setUserInfo({
		commit
	}, data) {
		return new Promise(resolve => {
			commit('setUserInfo', data)
			resolve(data)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
