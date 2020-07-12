import NotFound from "./NotFound"
import FullLayout from "./Layout/full"

import Login from "./components/Login"
import Index from "./components/index"
import About from "./components/About"
import Menu from "./components/Menu"
import SubMenu from "./components/SubMenu"

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
        layout: FullLayout,
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
                text: "子菜单",
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
