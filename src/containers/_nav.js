import i18n from '../i18n'
const allItems = [
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.dashboard'),
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.products'),
    to: '/products',
    icon: 'cil-calculator',
    badge: {
    }

  },
   {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.orders'),
    to: '/orders',
    icon: 'cil-chart-pie',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavDropdown',
    name: i18n.t('message.invoices'),
    icon: 'cil-list',
    items: [
      {
        _name: 'CSidebarNavItem',
        name:  i18n.t('message.purchase_invoices'),
        to: '/purchase-invoices'
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.sales_invoices'),
        to: '/sales-invoices',
      },  
    ]
  },
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.expenses'),
    to: '/expenses',
    icon: 'cil-chart-pie',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.customers'),
    to: '/customers',
    icon: 'cil-people',
    badge: {
    }
  },
  // {
  //   _name: 'CSidebarNavItem',
  //   name: i18n.t('message.customers_accounts'),
  //   to: '/customers-accounts',
  //   icon: 'cil-calculator',
  //   badge: {
  //   }
  // },
  {
    _name: 'CSidebarNavDropdown',
    name: i18n.t('message.reports'),
    icon: 'cil-list',
    items: [
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.stocks'),
        to: '/reports/stocks',
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.payroll'),
        to: '/reports/payroll',
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.inventory_reports'),
        to: '/reports/inventory-reports'
      },
       {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.orders_reports'),
        to: '/reports/orders-reports'
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.distributors_reports'),
        to: '/reports/distributors-reports'
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.commission_reports'),
        to: '/reports/commission-reports'
      },
      {
        _name: 'CSidebarNavItem',
        name: i18n.t('message.expenses_reports'),
        to: '/reports/expenses-reports'
      },
     
    ]
  },
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.jobs'),
    to: '/jobs',
    icon: 'cil-calculator',
    badge: {
    }

  },
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.employees'),
    to: '/employees',
    icon: 'cil-people',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name:  i18n.t('message.suppliers'),
    to: '/suppliers',
    icon: 'cil-people',
    badge: {
    }
  },
  {
    _name: 'CSidebarNavItem',
    name: i18n.t('message.categories'),
    to: '/categories',
    icon: 'cil-calculator',
    badge: {
    }

  },
 
  

]

let userSidebar = []

if (localStorage.token) {
  userSidebar = allItems
} else {
  userSidebar = allItems
}

export default [
  {
    _name: 'CSidebarNav',
    _children: userSidebar
  }
]

