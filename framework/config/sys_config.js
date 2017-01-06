/**********************************************************
 * 系统相关配置
 *********************************************************/

module.exports = {
    // 设置框架的根目录，指向项目所在目录
    cwd: __dirname + "/../..",

    // 路由配置
    router: {
        // 设置路由适配器
        adapter: __dirname + "/../main/RouterAdapter"
    },

    // 后台服务器配置
    dataServer: {
        // 后台服务器地址和端口号
        server: "127.0.0.1:8080",

        // 默认接口上下文
        contextPath: "/pmc",

        // 一律按 POST 方式向后台发送请求
        fetchAsPost: true
    },

    // 系统模块配置
    modules: {
        "mobile": "./modules/mobile",
        "work": "./modules/work"
    }
};