<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                <!--{{collapsed ? '' : sysName}}-->
                {{$t("lang.title") || "印尼外汇管理系统"}}
            </el-col>
            <el-col :span="8">
                <!--   <div class="tools" @click.prevent="collapse">
                       <i class="fa fa-align-justify"></i>
                   </div>--><!--   <div class="tools" @click.prevent="collapse">
                    <i class="fa fa-align-justify"></i>
                </div>-->
            </el-col>
            <el-col :span="2"  style="float:right">
                <button type="button" class="el-button el-button--info" @click="changeLocale">中文/EN</button>
            </el-col>


            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover" @command="handleCommand">
					<span class="el-dropdown-link userinfo-inner">

						<span v-if="this.sysUserAvatar">
						<i class="iconfont icon-icon-test"></i>
								<img :src="this.sysUserAvatar"/>
						</span>
						<span v-else>

							<i class="iconfont icon-icon-test"
                               style="font-size:36px;float: right ;margin: 0px 0px 0px 6px;"></i>
						</span>


						{{sysUserName}}
					</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="massage">我的消息</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>

        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.meta" class="el-menu-vertical-demo" @open="handleopen"
                         @close="handleclose" @select="handleselect"
                         unique-opened router v-if="!collapsed" exact>
                    <template v-for="(item,index) in userMenu" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                                          v-if="!child.hidden" @click="navClick(item.request_type)">{{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                                :class="item.iconCls"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>
                <!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-if="collapsed" ref="menuCollapsed">

                    <li v-for="(item,index) in userMenu" v-if="!item.hidden" class="el-submenu item">
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" style="" @mouseover="showMenu(index,true)"
                                 @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"
                                @mouseout="showMenu(index,false)">
                                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path"
                                    class="el-menu-item" style="padding-left: 40px;"
                                    :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
                                    {{child.name}}
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                    <li class="el-submenu">
                        <div class="el-submenu__title el-menu-item"
                             style="height: 56px;line-height: 56px;padding: 0 20px;"
                             :class="$route.path==item.children[0].path?'is-active':''"
                             @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
                    </li>
</template>
</li>
</ul>
</aside>
<section class="content-container">
    <div class="grid-content bg-purple-light">
        <el-col :span="24" class="breadcrumb-container">

            <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
                <router-view :request_type="request_type"></router-view>
            </transition>
        </el-col>
    </div>
</section>
</el-col>
</el-row>
</template>

<script>
    import util from '../common/js/util'
    import _ from 'lodash'
    import {logout} from '../api/api';

    export default {
        data() {
            return {
                sysName: '印尼外汇管理系统',
                userInfo: {},
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
                userMenu: [],
                request_type: [],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            changeLocale () {
                this.$confirm(this.$t('lang.toggle_tips'), this.$t('lang.tips'), {
                    confirmButtonText: this.$t('lang.ok'),
                    cancelButtonText: this.$t('lang.cancel'),
                    type: 'warning'
                }).then(() => {
                    let locale = this.$i18n.locale
                    locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
                }).catch(() => {
                  /*  this.$message({
                        type: 'info',
                    })*/
                })
            },

            navClick(request_type) {
                this.request_type = request_type
            },
            onSubmit() {
                //console.log('submit!');
            },
            handleopen() {
                ////console.log('handleopen');
            },
            handleclose() {
                ////console.log('handleclose');
            },
            handleselect: function (a, b, c) {
                //c.$attrs.params 获取当前菜单参数


            },
            handleCommand: function (command) {
                switch (command) {
                    case "setting":
                        this.$router.push("/setuser")
                }
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    /*   if (this.$store.getters.getENV == "dev") {
                           sessionStorage.removeItem('user');
                           util.cookieMethod.delCookie('token')
                           util.cookieMethod.delCookie('user')
                           _this.$router.push('/login');
                       }*/
                    logout().then(data => {
                        if (data.status == 200) {
                            sessionStorage.removeItem('user');
                            util.cookieMethod.delCookie('token')
                            util.cookieMethod.delCookie('user')
                            _this.$router.push('/login');
                        } else {
                            _this.$router.push('/login');
                        }
                    }).cache(() => {
                        _this.$router.push('/login');
                    })

                }).catch(() => {

                });

            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },

            initUserMenu() {
                //本地路由配置
                let routers = this.$router.options.routes;
                //用户拥有的权限
                let urlList = this.$store.getters.getResources;
                // console.log("router menu:", routers);
                // console.log("remote menu:", urlList);

                if (urlList.length == 0) {
                    this.$router.push("/login")
                }

                //准备数据
                let loc_router_map = new Object();      //code: router
                let loc_urlList = [];                   //[router, router, router, ...]
                for (let index in routers) {
                    let router = routers[index];
                    if (!router.hidden && router.code) {
                        loc_urlList.push(router);
                        loc_router_map[router.code] = router;
                    }
                }
                let remote_router_map = new Object();   //code: router
                for (let index in urlList) {
                    let router = urlList[index];

                    let child = new Object();
                    for (let l in router.children) {

                        child[router.children[l].code] = router.children[l];
                        loc_urlList.push(router.children[l]);
                    }
                    router.childrenCode = child;

                    remote_router_map[router.code] = router;
                }

                //整理数据
                for (let index in loc_urlList) {
                    //获取本地配置好的 router
                    let loc_router = loc_urlList[index];

                    //获取远程 router
                    let rem_router = remote_router_map[loc_router.code];
                    if (!rem_router) {
                        continue;
                    }
                    if (loc_router.leaf) {
                        rem_router.leaf = true
                    }
                    rem_router.iconCls = loc_router.iconCls;
                    //存放新的 children
                    let new_children = [];
                    //判断本地router有没有子类
                    if (loc_router.children && rem_router.children) {
                        //通过本地router顺序设置顺序
                        for (let loc_index in loc_router.children) {
                            let locChild = loc_router.children[loc_index];
                            //通过本地code 获取远程rooter
                            let rmo_children_router = rem_router.childrenCode[locChild.code];
                            if (rmo_children_router) {
                                //将远程的request_type赋值给本地router
                                locChild.request_type = [];
                                if (rmo_children_router.children) {
                                    for (let rmo_child_index in rmo_children_router.children) {
                                        let rem_3_child = rmo_children_router.children[rmo_child_index];
                                        locChild.request_type.push(rem_3_child.request_type);
                                    }
                                }
                                new_children.push(locChild);
                            }
                        }
                    }
                    rem_router.children = new_children;
                    this.userMenu.push(rem_router);
                }
                // console.log("the last menu:", this.userMenu);
            },
            setUser() {
                this.userInfo = this.$store.getters.getUserInfo

                //var user = tessionStorage.getItem('user');
                if (this.userInfo.nickname) {

                    //user = JSON.parse(user);
                    this.sysUserName = this.userInfo.nickname || '';
                    this.sysUserAvatar = this.userInfo.avatar || '';
                } else {

                    let token = util.cookieMethod.getCookie('token')

                    this.$store.dispatch("set_token", {token}).then(() => {

                        return this.$store.dispatch("setting_Sync", {token})
                    }).then((res) => {
                        if (res.data.status == 200) {

                            this.userInfo = this.$store.getters.getUserInfo;
                            this.sysUserName = this.userInfo.nickname || '';
                            this.sysUserAvatar = this.userInfo.avatar || '';
                        }
                    })

                }
            },
            initUrlList() {
                let token = util.cookieMethod.getCookie('token')

                return new Promise((resolve, reject) => {
                    this.$store.dispatch("setting_Sync", {token}).then((res) => {
                        resolve()

                        this.setUser()
                    })

                })
            }
        },
        watch: {
            userInfo: {
                //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
                handler(curVal, oldVal) {
                    //  console.log(curVal, oldVal)
                },
                deep: true
            }
        },
        mounted() {
            this.$nextTick(function () {


                if (this.$store.getters.getENV == "dev") {

                    this.userMenu = this.$router.options.routes

                    this.setUser()
                } else {

                    let urlList = this.$store.getters.getResources
                    if (urlList.length == 0 || !urlList) {
                        this.initUrlList().then(() => {
                            this.initUserMenu()
                            this.setUser()
                        })
                    } else {
                        this.initUserMenu()
                        this.setUser()
                    }
                }


            });


        }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    .iconfont {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    }

    .container {

        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #333;
            color: #fff;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                //width:230px;
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 230px;
            }
            .logo-collapse-width {
                width: 60px
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }
        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;

                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu {
                    height: 100%;
                }
                .collapsed {
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }
            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }
            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
                height: 100%;
                overflow-y: auto;
            }
            .content-container {
                background: #fff;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 230px;
                overflow-y: scroll;
                padding: 20px;
                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        //  float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>