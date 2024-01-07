const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId, // 用戶標示
  avatar: state => state.user.userInfo.staffPhoto, // 用戶頭像
  userName: state => state.user.userInfo.username, // 用戶名
  company: state => state.user.userInfo.company, // 公司名稱
  departmentName: state => state.user.userInfo.departmentName, // 所在部門名稱
  name: state => state.user.name,
  routes: state => state.user.routes // 權限路由名稱
}
export default getters
