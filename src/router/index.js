import Vue from 'vue'
import Router from 'vue-router'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import i18n from '../i18n'
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const DailySales = () => import('@/components/DailySales.vue')
const MonthlySales = () => import('@/components/MonthlySales.vue')
const YearlySales = () => import('@/components/YearlySales.vue')
const Loading = () => import('@/views/Loading')

// Views - Pages
const Login = () => import('@/views/Login')

// payment
const Payments = () => import('@/views/payments/Index')
const CreatePayments = () => import('@/views/payments/Create')
const EditPayments = () => import('@/views/payments/Edit')
const ShowPayments = () => import('@/views/payments/Show')
// Jobs
const Jobs = () => import('@/views/jobs/Index')
const CreateJob = () => import('@/views/jobs/Create')
const EditJob = () => import('@/views/jobs/Edit')
const ShowJob = () => import('@/views/jobs/Show')

// Products
const Products = () => import('@/views/products/Index')
const CreateProduct = () => import('@/views/products/Create')
const EditProduct = () => import('@/views/products/Edit')
const ShowProduct = () => import('@/views/products/Show')

// Expenses
const Expenses = () => import('@/views/expenses/Index')
const CreateExpense = () => import('@/views/expenses/Create')
const EditExpense = () => import('@/views/expenses/Edit')
const ShowExpense = () => import('@/views/expenses/Show')

// Customers
const Customers  = () => import('@/views/customers/Index')
const CreateCustomer = () => import('@/views/customers/Create')
const UpdateCustomer = () => import('@/views/customers/Edit')
const ShowCustomer = () => import('@/views/customers/Show')

// Customers Accounts
const CustomersAccounts  = () => import('@/views/customers-accounts/Index')
const CreateCustomerAccount = () => import('@/views/customers-accounts/Create')
const UpdateCustomerAccount = () => import('@/views/customers-accounts/Edit')
const ShowCustomerAccount = () => import('@/views/customers-accounts/Show')

// categories
const Categories  = () => import('@/views/categories/Index')
const CreateCategory = () => import('@/views/categories/Create')
const UpdateCategory = () => import('@/views/categories/Edit')
const ShowCategory = () => import('@/views/categories/Show')

// reports
const InventoryReports = () => import('@/views/reports/InventoryReports') 
const DistributorsReports = () => import('@/views/reports/DistributorsReports')
const CommissionReports = () => import('@/views/reports/CommissionReports')
const AccountingReports = () => import('@/views/reports/AccountingReports')
const Stocks = () => import('@/views/reports/stocks')
const Payroll = () => import('@/views/reports/payroll')
const OrderReports = () => import('@/views/reports/OrdersReport')
const ExpensesReports = () => import('@/views/reports/ExpensesReports')

//suppliers 
const Suppliers = () => import('@/views/suppliers/Index')
const CreateSupplier = () => import('@/views/suppliers/Create')
const EditSupplier = () => import('@/views/suppliers/Edit')
const ShowSupplier = () => import('@/views/suppliers/Show')
// sub-services
const SubServices = () => import('@/views/sub-services/Index')
const CreateSubServices = () => import('@/views/sub-services/Create')
const EditSubServices = () => import('@/views/sub-services/Edit')
const ShowSubServices = () => import('@/views/sub-services/Show')

// Employees
const Employees = () => import('@/views/employees/Index')
const CreateEmployee = () => import('@/views/employees/Create')
const EditEmployee = () => import('@/views/employees/Edit')
const ShowEmployee = () => import('@/views/employees/Show')

// PurchaseInvoices
const PurchaseInvoices = () => import('@/views/purchase-invoices/Index')
const CreatePurchaseInvoices = () => import('@/views/purchase-invoices/Create')
const EditPurchaseInvoices = () => import('@/views/purchase-invoices/Edit')
const ShowPurchaseInvoices = () => import('@/views/purchase-invoices/Show')

// SalesInvoices
const SalesInvoices = () => import('@/views/sales/Index')
const CreateSalesInvoices = () => import('@/views/sales/Create')
const EditSalesInvoices = () => import('@/views/sales/Edit')
const ShowSalesInvoices = () => import('@/views/sales/Show')

// Orders
const Orders = () => import('@/views/orders/Index')
const CreateOrders = () => import('@/views/orders/Create')
const EditOrders = () => import('@/views/orders/Edit')
const ShowOrders = () => import('@/views/orders/Show')

Vue.use(Router)
Vue.use(VueTabs)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {

      path: '/',
      redirect: '/loading',
      name: i18n.t('message.main'),
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: i18n.t('message.dashboard'),
          component: Dashboard
        },
        //  Stocks
        {
          path: 'stocks',
          meta: {
            label: i18n.t('message.stocks')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.stocks'),
              component: Stocks
            },
          ]
        },
        // Customers
        {
          path: 'customers',
          meta: {
            label: i18n.t('message.customers')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.customers'),
              component: Customers
            },
            {
              name: i18n.t('message.update_customer'),
              path: ':id/edit',
              component: UpdateCustomer
            },
            {
              path: 'create',
              name: i18n.t('message.create_customer'),
              component: CreateCustomer
            },
            {
              path: ':id/show',
              name: i18n.t('message.show_customer'),
              component: ShowCustomer
            }

          ]
        },
         // Customers Accounts
         {
          path: 'customers-accounts',
          meta: {
            label: i18n.t('message.customers_accounts')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.customers_accounts'),
              component: CustomersAccounts
            },
            {
              name: i18n.t('message.update_customer_account'),
              path: ':id/edit',
              component: UpdateCustomerAccount
            },
            {
              path: 'create',
              name: i18n.t('message.create_customer_account'),
              component: CreateCustomerAccount
            },
            {
              path: ':id/show',
              name: i18n.t('message.show_customer_account'),
              component: ShowCustomerAccount
            }

          ]
        },
         // categories
         {
             path: 'categories',
                  meta: {
                    label: i18n.t('message.categories')
                  },
                  component: {
                    render (c) {
                      return c('router-view')
                    }
                  },
                  children: [
                    {
                      path: '',
                      name: i18n.t('message.categories'),
                      component: Categories
                    },
                    {
                      name: i18n.t('message.update_category'),
                      path: ':id/edit',
                      component: UpdateCategory
                    },
                    {
                      path: 'create',
                      name: i18n.t('message.create_category'),
                      component: CreateCategory
                    },
                    {
                      path: ':id/show',
                      name: i18n.t('message.show_category'),
                      component: ShowCategory
                    }
        
                  ]
         },
        // reports
        {
          path: 'reports',
          // meta: {
          //   label: i18n.t('message.reports')
          // },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'daily-sales',
              name: i18n.t('message.daily_sales'),
              component: DailySales
            },
            {
              path: 'monthly-sales',
              name: i18n.t('message.monthly_sales'),
              component: MonthlySales
            },
            {
              path: 'yearly-sales',
              name: i18n.t('message.yearly_sales'),
              component: YearlySales
            },
            {
              path: 'stocks',
              name: i18n.t('message.stocks'),
              component: Stocks
            },
            {
              path: 'payroll',
              name: i18n.t('message.payroll'),
              component: Payroll
            },
            {
              name: i18n.t('message.inventory_reports'),
              path: 'inventory-reports',
              component: InventoryReports
            },
            {
              name: i18n.t('message.distributors_reports'),
              path: 'distributors-reports',
              component: DistributorsReports
            },
            {
              name: i18n.t('message.commission_reports'),
              path: 'commission-reports',
              component: CommissionReports
            },
            {
              name: i18n.t('message.accounting_reports'),
              path: 'accounting-reports',
              component: AccountingReports
            },
            {
              name: i18n.t('message.orders_reports'),
              path: 'orders-reports',
              component: OrderReports
            },
            {
              name: i18n.t('message.expenses_reports'),
              path: 'expenses-reports',
              component: ExpensesReports
            },
          ]
        },
        // jobs
        {
          path: 'jobs',
          meta: {
            label: 'الوظائف'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'الوظائف',
              component: Jobs
            },
            {
              name: 'تعديل وظيفة',
              path: ':id/edit',
              component: EditJob
            },
            {
              path: 'create',
              name: 'إضافة وظيفة  جديدة',
              component: CreateJob
            },
            {
              path: ':id/show',
              name: 'عرض الوظيفة ',
              component: ShowJob
            }

          ]
        },
        // suppliers
        {
          path: 'suppliers',
          meta: {
            label: 'الموردين'
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'المُوردين',
              component: Suppliers
            },
            {
              name: 'تعديل المُورد',
              path: ':id/edit',
              component: EditSupplier
            },
            {
              path: 'create',
              name: 'إضافة  مُورد  جديد',
              component: CreateSupplier
            },
            {
              path: ':id/show',
              name: 'عرض  المُورد',
              component: ShowSupplier
            }
          ]
        },
        //payments
        {
          path: 'payments',
          meta: {
            label: i18n.t('message.payment')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.payment'),
              component: Payments
            },
            {
              name: i18n.t('message.update_payment'),
              path: ':id/edit',
              component: EditPayments
            },
            {
              path: 'create',
              name: i18n.t('message.create_payment'),
              component: CreatePayments
            },
            {
              path: ':id/show',
              name: i18n.t('message.show_payment'),
              component: ShowPayments
            }
          ]
        },
        // products
        {
          path: 'products',
          meta: {
            label: i18n.t('message.products')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.products'),
              component: Products
            },
            {
              name: i18n.t('message.update_product'),
              path: ':id/edit',
              component: EditProduct
            },
            {
              path: 'create',
              name: i18n.t('message.create_product'),
              component: CreateProduct
            },
            {
              path: ':id/show',
              name: i18n.t('message.show_product'),
              component: ShowProduct
            }
          ]
        },
         // expenses
         {
          path: 'expenses',
          meta: {
            label: i18n.t('message.expenses')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.expenses'),
              component: Expenses
            },
            {
              name: i18n.t('message.update_expense'),
              path: ':id/edit',
              component: EditExpense
            },
            {
              path: 'create',
              name: i18n.t('message.create_expense'),
              component: CreateExpense
            },
            {
              path: ':id/show',
              name: i18n.t('message.show_expense'),
              component: ShowExpense
            }
          ]
        },
        // Employees
        {
          path: 'employees',
          meta: {
            label: i18n.t('message.employees')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.employees'),
              component: Employees
            },
            {
              path: 'create',
              name: i18n.t('message.create_employee'),
              component: CreateEmployee
            },
            {
              name: i18n.t('message.update_employee'),
              path: ':id/edit',
              component: EditEmployee
            },
            {
              name: i18n.t('message.show_employee'),
              path: ':id/show',
              component: ShowEmployee
            }
          ]
        },
        {
          path: 'orders',
          meta: {
            label: i18n.t('message.order')
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.order'),
              component: Orders
            },
            {
              path: 'create',
              name: i18n.t('message.create_order'),
              component: CreateOrders
            },
            {
              name: i18n.t('message.update_order'),
              path: ':id/edit',
              component: EditOrders
            },
            {
              name: i18n.t('message.show_order'),
              path: ':id/show',
              component: ShowOrders
            }
          ]
        },
          //sales invoices
        {
          path: 'sales-invoices',
          meta: {
            label: i18n.t('message.sales_invoices'),
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.sales_invoices'),
              component: SalesInvoices
            },
            {
              path: 'create',
              name: i18n.t('message.create_sales_invoices'),
              component: CreateSalesInvoices
            },
            {
              name: i18n.t('message.update_sales_invoices'),
              path: ':id/edit',
              component: EditSalesInvoices
            },
            {
              name: i18n.t('message.show_sales_invoices'),
              path: ':id/show',
              component: ShowSalesInvoices
            }
          ]
        },
        //purchase invoices
        {
          path: 'purchase-invoices',
          meta: {
            label: i18n.t('message.purchase_invoices'),
          },
          component: {
            render (c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.t('message.purchase_invoices'),
              component: PurchaseInvoices
            },
            {
              path: 'create',
              name: i18n.t('message.create_purchase_invoices'),
              component: CreatePurchaseInvoices
            },
            {
              name: i18n.t('message.update_purchase_invoices'),
              path: ':id/edit',
              component: EditPurchaseInvoices
            },
            {
              name: i18n.t('message.show_purchase_invoices'),
              path: ':id/show',
              component: ShowPurchaseInvoices
            }
          ]
        },
      ]
    },
    //orders
    {
      path: 'orders',
      meta: {
        label: i18n.t('message.orders')
      },
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: i18n.t('message.orders'),
          component: Orders
        },
        {
          path: 'create/purchase',
          name: i18n.t('message.create_order'),
          component: CreateOrders
        },
        {
          name: i18n.t('message.edit_order'),
          path: ':id/edit',
          component: EditOrders
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/loading',
      component: Loading,
      name: 'Loading'
    }
  ]
}
