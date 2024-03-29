import VTooltip from 'v-tooltip'

// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents'
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './components/SidebarPlugin'
import NotificationPlugin from './components/NotificationPlugin'

// asset imports
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/light-bootstrap-dashboard.scss'
import './assets/css/demo.css'

/**
 * This is the main Light Bootstrap Dashboard Vue plugin where dashboard related plugins are registerd.
 */
export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(NotificationPlugin)
    Vue.use(VTooltip)
  }
}
