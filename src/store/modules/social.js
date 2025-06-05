const state = {
  yearMonth: 202301
}
const mutations = {
  addYearMonth(state) {
    state.yearMonth += 1
  }
}
export default {
  namespaced: true, state, mutations
}
