//element框架
import{Table,TableColumn,Form,FormItem,Input,Dropdown,DropdownMenu,DropdownItem,Alert,Steps,Step} from 'element-ui'
//vant框架
import { PasswordInput, NumberKeyboard,Tab, Tabs,NoticeBar,Toast,Dialog,Tabbar, 
	TabbarItem,Button,Popup,Loading,List,PullRefresh,Search} from 'vant'
const external = {
	install: function(Vue){
		Vue.use(Table)
		Vue.use(TableColumn)
		Vue.use(Form)
		Vue.use(FormItem)
		Vue.use(Input)
		Vue.use(Dropdown)
		Vue.use(DropdownMenu)
		Vue.use(DropdownItem)
		Vue.use(Alert)
		Vue.use(Steps)
		Vue.use(Step)
//		-----------------------------------
		Vue.use(PasswordInput).use(NumberKeyboard)
		Vue.use(Tab).use(Tabs)
		Vue.use(NoticeBar)
		Vue.use(Toast)
		Vue.use(Dialog)
		Vue.use(Tabbar).use(TabbarItem)
    Vue.use(Button)
		Vue.use(Popup)
		Vue.use(Loading)
		Vue.use(List)
		Vue.use(PullRefresh)
		Vue.use(Search)
	}
}
export default external
