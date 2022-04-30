import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Roles } from '../Models/Roles';

// Menu
export interface Menu {
	headTitle1?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})



export class NavService implements OnDestroy {

	private unsubscriber: Subject<any> = new Subject();
	public  screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
	
	// Search Box
	public search: boolean = false;

	// Language
	public language: boolean = false;
	
	// Mega Menu
	public megaMenu: boolean = false;
	public levelMenu: boolean = false;
	public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

	// For Horizontal Layout Mobile
	public horizontal: boolean = window.innerWidth < 991 ? false : true;

	// Collapse Sidebar
	public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

	// Full screen
	public fullScreen: boolean = false;

	 Role :string= localStorage.getItem("RiskRole");

	constructor(private router: Router) {
		// this.Role  = localStorage.getItem("RiskRole");
		this.setScreenWidth(window.innerWidth);
		fromEvent(window, 'resize').pipe(
			debounceTime(1000),
			takeUntil(this.unsubscriber)
		).subscribe((evt: any) => {
			this.setScreenWidth(evt.target.innerWidth);
			if (evt.target.innerWidth < 991) {
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			}
			if(evt.target.innerWidth < 1199) {
				this.megaMenuColapse = true;
			}
		});
		if(window.innerWidth < 991) { // Detect Route change sidebar close
			this.router.events.subscribe(event => { 
				this.collapseSidebar = true;
				this.megaMenu = false;
				this.levelMenu = false;
			});
		}
	}

	ngOnDestroy() {
		this.unsubscriber.next();
		this.unsubscriber.complete();
	}

	private setScreenWidth(width: number): void {
		this.screenWidth.next(width);
	}



	MENUITEMS: Menu[] = [
		{
			headTitle1: 'لوحة التحكم ', headTitle2: 'إدارة المحتويات الموجودة',
		},
		{
			title: 'خدمة العملاء', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'agent/main', title: 'الشركات', type: 'link' },
				{ path: 'agent/stat', title: 'إحصائيات', type: 'link' },
				// { path: 'agent/Customer', title: 'تسجيل بيانات', type: 'link' },
			]
		}
	];

	MENUITEMS_Admin: Menu[] = [
		{
			headTitle1: 'لوحة التحكم ', headTitle2: 'إدارة المحتويات الموجودة', 
		},
		{
			title: 'التقارير', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/client-report', title: 'العملاء', type: 'link' },
				{ path: 'admin/client-agent-report', title: 'العملاء - موظفى الخدمة', type: 'link' },
				{ path: 'admin/client-call-report', title: 'العملاء - المكالمات', type: 'link' },
				{ path: 'admin/call-start-end-report', title: 'ملخص المكالمات', type: 'link' },
			]
		},
		// {
		// 	title: 'الإحصائيات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
		// 		{ path: 'admin/statistics/stats', title: 'المكالمات', type: 'link' },
		// 		{ path: 'admin/statistics/agents', title: 'مكالمات العملاء', type: 'link' },
		// 		{ path: 'admin/statistics/CallReason', title: ' أسباب المكالمات', type: 'link' },
		// 	]
		// },
		{
			title: 'مسئولى النظام', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertEmployee', title: 'إضافة مسئول', type: 'link' },
				{ path: 'admin/GetEmployee', title: 'قائمة المسئولين', type: 'link' },
			]
		},
		{
			title: 'موظفى خدمة العملاء', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertCustomerService', title: 'إضافة موظف', type: 'link' },
				{ path: 'admin/GetCustomerService', title: ' موظفى خدمة العملاء', type: 'link' },
			]
		},
		{
			title: 'إدارة العملاء', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertClient', title: 'إضافة عميل', type: 'link' },
				{ path: 'admin/GetClient', title: 'قائمة العملاء', type: 'link' },
			]
		},
		{
			title: 'إدارة أنواع العملاء', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/client-type', title: 'إضافة نوع عميل', type: 'link' },
				{ path: 'admin/Get-client-type', title: 'قائمة أنواع العملاء', type: 'link' },
			]
		},
		{
			title: 'إدارة المحافظات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/insert-governorate', title: 'إضافة محافظة', type: 'link' },
				{ path: 'admin/Get-governorate', title: 'قائمة المحافظات', type: 'link' },
			]
		},
		{
			title: 'إدارة المدن', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/insert-city', title: 'إضافة مدينة', type: 'link' },
				{ path: 'admin/Get-cities', title: 'قائمة المدن', type: 'link' },
			]
		},
		{
			title: 'إدارة أسباب المكالمات', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/insert-call-reason', title: 'أسباب المكالمات', type: 'link' },
				{ path: 'admin/Get-Call-Reason', title: 'قائمة أسباب المكالمات', type: 'link' },
			]
		},
		{
			title: 'إدارة مصدر التسويق', icon: 'home', type: 'sub', badgeType: 'success', active: true, children: [
				{ path: 'admin/InsertSourceMarket', title: 'مصدر التسويق', type: 'link' },
				{ path: 'admin/GetSourceMarket', title: 'قائمة مصادر التسويق', type: 'link' },
			]
		},
	];

	MEGAMENUITEMS: Menu[] = [
		{
			title: 'Error Pages', type: 'sub', active: true, children: [
				{ path: 'javascript:void(0);', title: 'Error Page 400', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 401', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 403', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 404', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 500', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Error Page 503', type: 'extLink' },
			]
		},
		{
			title: 'Authentication', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'Login Simple', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Login BG Image', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Login BG Video', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Simple Register', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Register BG Image', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Register BG Video', type: 'extLink' }
			]
		},
		{
			title: 'Usefull Pages', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'Search Pages', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Unlock User', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Forgot Password', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Reset Password', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Maintenance', type: 'extLink' }
			]
		},
		{
			title: 'Email templates', type: 'sub', active: false, children: [
				{ path: 'http://admin.pixelstrap.com/cuba/theme/basic-template.html', title: 'Basic Email', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/email-header.html', title: 'Basic With Header', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/template-email.html', title: 'Ecomerce Template', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/template-email-2.html', title: 'Email Template 2', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/ecommerce-templates.html', title: 'Ecommerce Email', type: 'extTabLink' },
				{ path: 'http://admin.pixelstrap.com/cuba/theme/email-order-success.html', title: 'Order Success', type: 'extTabLink' }
			]
		},
		{
			title: 'Coming Soon', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'Coming Simple', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Coming BG Image', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Coming BG Video', type: 'extLink' }
			]
		},
	];

	LEVELMENUITEMS: Menu[] = [
		{
			path: 'javascript:void(0);', title: 'File Manager', icon: 'git-pull-request', type: 'extLink'
		},
		{
			title: 'Users', icon: 'users', type: 'sub', active: false, children: [
				{ path: 'javascript:void(0);', title: 'All Users', icon: 'users', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'User Profile', icon: 'users', type: 'extLink' },
				{ path: 'javascript:void(0);', title: 'Edit Profile', icon: 'users', type: 'extLink' },
			]
		},
		{ path: 'javascript:void(0);', title: 'Bookmarks', icon: 'heart', type: 'extLink' },
		{ path: 'javascript:void(0);', title: 'Calender', icon: 'calendar', type: 'extLink' },
		{ path: 'javascript:void(0);', title: 'Social App', icon: 'zap', type: 'extLink' }
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.Role == Roles.Agent?this.MENUITEMS:this.MENUITEMS_Admin);
	megaItems = new BehaviorSubject<Menu[]>(this.MEGAMENUITEMS);
	levelmenuitems = new BehaviorSubject<Menu[]>(this.LEVELMENUITEMS);

}
