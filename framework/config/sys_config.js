
module.exports = {
    cwd: __dirname + "/../..",

    router: {
        adapter: __dirname + "/../main/RouterAdapter",

        map: {
            // "/admin/customer":   "./modules/customer/CustomerView",
            // "/admin/depart": ""
        }
    },

    uplifyExpires: 1000,

    modules: {
        "aaa": "./modules/customer",
        "bbb": "./modules/member"
    }
};