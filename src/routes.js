import NotFound from "./pages/NotFound"
import FullLayout from "./Layout/full"
import LoginLayout from "./Layout/LoginLayout"

import Login from "./pages/Login"
import Index from "./pages/index"
import About from "./pages/About"
import Menu from "./pages/Menu"
import SubMenu from "./pages/SubMenu"

import { HomeOutlined, QuestionOutlined, ArrowRightOutlined } from '@ant-design/icons';
const routes = [
    {
        id: "auth",
        router: {
            path: "/login",
            exact: true,
            strict: true
        },
        requiresAuth: false,
        breadcrumb: [],
        component: Login,
        layout: LoginLayout,
        menu: {
            text: "",
            icon: "",
            opens: []
        },
        children: []
    },
    {
        id: "index",
        router: {
            path: "/",
            exact: true,
            strict: true
        },
        requiresAuth: false,
        breadcrumb: [],
        component: Index,
        menu: {
            text: "首页",
            icon: HomeOutlined,
            opens: []
        },
        children: []
    },
    {
        id: "menu",
        router: {
            path: "/menu",
            exact: true,
            strict: true
        },
        requiresAuth: false,
        breadcrumb: [],
        component: Menu,
        menu: {
            text: "主菜单",
            icon: ArrowRightOutlined,
            opens: []
        },
        children: [{
            id: "submenu-1",
            router: {
                path: "/menu/submenu1",
                exact: true,
                strict: true
            },
            requiresAuth: false,
            breadcrumb: [],
            component: SubMenu,
            menu: {
                text: "子菜单",
                icon: ArrowRightOutlined,
                opens: ["menu"]
            }
        }, {
            id: "submenu-2",
            router: {
                path: "/menu/submenu2",
                exact: true,
                strict: true
            },
            requiresAuth: false,
            breadcrumb: [],
            component: SubMenu,
            menu: {
                text: "认证页面",
                icon: ArrowRightOutlined,
                opens: ["menu"]
            }
        }]
    },
    {
        id: "about",
        router: {
            path: "/about",
            exact: true,
            strict: true
        },
        requiresAuth: false,
        breadcrumb: [],
        component: About,
        menu: {
            text: "关于",
            icon: QuestionOutlined,
            opens: []
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
