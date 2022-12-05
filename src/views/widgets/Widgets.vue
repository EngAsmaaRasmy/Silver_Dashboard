<template>
<div class="container">
<CRow class="m-auto d-flex justify-content-center">
     <CCol sm='4' lg='4' class="small1 text-center">
       <span>{{$t('message.total_withdrawn_money')}} </span><br><br>
       <span class="h4">{{totalWithdrawn}}</span>
       
    </CCol>
     <CCol sm='4' lg='4' class="small2 text-center">
       <span>{{$t('message.total_received_money')}} </span><br><br>
       <span class="h4">{{totalReceived}}</span>
       
    </CCol>
     <CCol sm='4' lg='4' class="small3 text-center">
       <span>{{$t('message.profist')}}</span><br><br>
       <span class="h4">{{profits}}</span>
       
       
    </CCol>
  </CRow>
   <CRow class="mt-5"> 
    <CCol sm='6' lg='4'>
      <CWidgetProgressIcon
         class="widget"
        :header='categoriesCount'
        :text="$t('message.number_of_categories')"
        inverse
      >
     <CIcon name='cil-speedometer' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='4'>
      <CWidgetProgressIcon
       class="widget"
        :header='productsCount'
        :text="$t('message.number_of_products')"
        inverse
      >
      <CIcon name='cil-basket' height='45'/>
      </CWidgetProgressIcon>
       </CCol>
    <CCol sm='6' lg='4'>
      <CWidgetProgressIcon
       class="widget"
        :header='customersCount'
        :text="$t('message.total_customer')"
        inverse
      >
        <CIcon name='cil-chartPie' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='4'>
      <CWidgetProgressIcon
       class="widget"
        :header='ordersCount'
        :text="$t('message.number_of_orders')"
        inverse
      >
        <CIcon name='cil-speedometer' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='4'>
      <CWidgetProgressIcon
       class="widget"
        :header='suppliersCount'
        :text="$t('message.number_of_suppliers')"
        inverse
      >
        <CIcon name='cil-chartPie' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
    <CCol sm='6' lg='4'>
      <CWidgetProgressIcon
       class="widget"
        :header='employeesCount'
        :text="$t('message.number_of_employees')"
        inverse
      >
        <CIcon name='cil-people' height='45'/>
      </CWidgetProgressIcon>
    </CCol>
  </CROW>
</div>

 
</template>

<script>

export default {
  name: 'Widgets',
  data () {
    return {
      categoriesCount: '0',
      productsCount: '0',
      customersCount: '0',
      ordersCount: '0',
      suppliersCount: '0',
      employeesCount: '0',
      jobsCount: '0',
      totalWithdrawn: '0',
      totalReceived: '0',
      profits: '0'


    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/statistics`)
      .then((response) => {
        this.categoriesCount = response.data.data.statistics_categories.toString()
        this.productsCount = response.data.data.statistics_products.toString()
         this.customersCount = response.data.data.statistics_customers.toString()
        this.ordersCount = response.data.data.statistics_orders.toString()
        this.suppliersCount = response.data.data.statistics_suppliers.toString()
        this.employeesCount = response.data.data.statistics_employees.toString()
        this.jobsCount = response.data.data.statistics_jobs.toString()
      })
       this.$http
      .get(`${this.$hostUrl}admin-dashboard/report/accounting`)
      .then((response) => {
        this.totalWithdrawn = response.data.data.total_withdrawn_money.toString()
        this.totalReceived = response.data.data.total_received_money.toString()
         this.profits = response.data.data.profist.toString()
      })
  }
}
</script>
<style>
.widget
{
  background-color: #eef1f5;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  border-radius: 20px;
  } 
  .small1, .small2, .small3{
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  color:#fff;
  padding: 30px 60px;
  

  }
  .small1 .h4 , .small2 .h4, .small3 .h4{
    color:#fff !important;
  }
  .small1{
    background-color: #5d789f;
  }
  .small2{
    background-color: #9f5d78;
  }
  .small3{
    background-color: #789f5d;
  }


</style>

