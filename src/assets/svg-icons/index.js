// 将icons里的svg图标自动导入
// https://juejin.im/post/59bb864b5188257e7a427c09
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icons', false, /\.svg$/)
requireAll(req)
