//element框架
import{Table,TableColumn,Form,FormItem,Input,Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
//vant框架
import { PasswordInput, NumberKeyboard,Tab, Tabs,NoticeBar,Toast,Dialog,Tabbar, TabbarItem,Button,Popup } from 'vant'
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
//		-----------------------------------
		Vue.use(PasswordInput).use(NumberKeyboard)
		Vue.use(Tab).use(Tabs)
		Vue.use(NoticeBar)
		Vue.use(Toast)
		Vue.use(Dialog)
		Vue.use(Tabbar).use(TabbarItem)
    Vue.use(Button)
    Vue.use(Popup)
	}
}
export default external
