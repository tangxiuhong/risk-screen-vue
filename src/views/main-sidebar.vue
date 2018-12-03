<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin" @mouseleave="sidebarFold = true">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' });sidebarFold = !sidebarFold">
          <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="riskCtrlInfo" @click="$router.push({ name: 'riskCtrlInfo' });sidebarFold = !sidebarFold">
          <icon-svg name="riskCtrlInfo" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">风险管控</span>
        </el-menu-item>
        <el-menu-item index="hiddRiskMana" @click="$router.push({ name: 'hiddRiskMana' });sidebarFold = !sidebarFold">
          <icon-svg name="hiddRiskMana" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">隐患治理</span>
        </el-menu-item>
        <el-menu-item index="moniWarn" @click="$router.push({ name: 'moniWarn' });sidebarFold = !sidebarFold">
          <icon-svg name="moniWarn" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">监测预警</span>
        </el-menu-item>
        <el-menu-item index="commDisp" @click="$router.push({ name: 'commDisp' });sidebarFold = !sidebarFold">
          <icon-svg name="commDisp" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">指挥调度</span>
        </el-menu-item>
        <el-menu-item index="perfEval" @click="$router.push({ name: 'perfEval' });sidebarFold = !sidebarFold">
          <icon-svg name="perfEval" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">绩效评估</span>
        </el-menu-item>
        <el-menu-item index="emerManage" @click="$router.push({ name: 'emerManage' });sidebarFold = !sidebarFold">
          <icon-svg name="emerManage" class="site-sidebar__menu-icon"></icon-svg>
          <span slot="title">应急管理</span>
        </el-menu-item>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  export default {
    data () {
      return {
        dynamicMenuRoutes: []
      }
    },
    components: {
      SubMenu
    },
    computed: {
      sidebarLayoutSkin: {
        get () {
          return this.$store.state.common.sidebarLayoutSkin
        }
      },
      sidebarFold: {
        get () {
          return this.$store.state.common.sidebarFold
        },
        set (val) {
          this.$store.commit('common/updateSidebarFold', val)
        }
      },
      menuActiveName: {
        get () {
          return this.$store.state.common.menuActiveName
        },
        set (val) {
          this.$store.commit('common/updateMenuActiveName', val)
        }
      },
      mainTabs: {
        get () {
          return this.$store.state.common.mainTabs
        },
        set (val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      mainTabsActiveName: {
        get () {
          return this.$store.state.common.mainTabsActiveName
        },
        set (val) {
          this.$store.commit('common/updateMainTabsActiveName', val)
        }
      }
    },
    watch: {
      // '$route' (to, from) {
      //   this.$router.go(0)
      // }
    },
    created () {
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
    }
  }
</script>
