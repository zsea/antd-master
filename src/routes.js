import NotFound from "./NotFound"
import FullLayout from "./Layout/full"
import Login from "./components/Login"


const routes = [
    {
        id: "auth",
        router: {
            path: "/login",
            exact: false,
            strict: false
        },
        requiresAuth: false,
        breadcrumb: [],
        component: Login,
        layout: FullLayout,
        menu: {
            text:"",
            icon:"",
            opens:[]
        },
        children: []
    },
    {
        id: "notfound",
        router: {
            path: "",
            exact: false,
            strict: false
        },
        requiresAuth: false,
        breadcrumb: ["总台服务", "页面不存在"],
        component: NotFound,
        layout: FullLayout,
        selected: [],
        children: []
    }
];

export default routes;
