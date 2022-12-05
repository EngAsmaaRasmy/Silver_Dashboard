<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{ $t('message.show_order')}} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.order_no')}} </th>
                    <td>{{ order.order_no }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.order_type')}}</th>
                    <td v-if=" order.order_type.name == 'Sales'">{{ $t('message.sales')}}</td>
                    <td v-else>{{ $t('message.purchase')}}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.order_total')}}</th>
                    <td>{{ order.total }}</td>
                  </tr>
                  <tr v-if="order.customer">
                    <th> {{ $t('message.order_customer')}}</th>
                    <td>{{ order.customer.name }}</td>
                  </tr>
                  <tr v-if="order.supplier">
                    <th> {{ $t('message.order_customer')}}</th>
                    <td>{{ order.supplier.name }}</td>
                  </tr>
                   <tr>
                    <th> {{ $t('message.order_status')}}</th>
                    <td v-if="order.status.name == 'panding'">{{ $t('message.pending')}}</td>
                    <td v-else>{{ $t('message.approve')}}</td>
                  </tr>

                </table>
            </div>
        </div>
        <hr>
        <h3 class="mb-3">{{$t('message.products')}}</h3>
                <div class="line"></div>
        <div v-if="order.products[0]" class="row">
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th> {{$t('message.category')}}  </th>
                    <th> {{$t('message.product')}}  </th>
                    <th> {{$t('message.transfer_number')}}  </th>
                      <th> {{$t('message.quantity')}}  </th>
                       <th> {{$t('message.product_price')}} </th>
                  </tr>
                   <tr v-for=" product in order.products" :key="product.id">
                     <td>{{ product.product.category.name }}</td>
                    <td v-if="$i18n.locale == 'English'">{{ product.product.name }}</td>
                    <td v-if="$i18n.locale == 'العربية'">{{ product.product.name_ar }}</td>
                    <td v-if="product.transfer_number">{{ product.transfer_number}}</td>
                    <td v-else>{{$t('message.no_transfer_num')}}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.price}}</td>
                  </tr>
                </table>
            </div>
        </div>
        <br>
        <hr>
        <h3 class="mb-3">{{$t('message.invoices')}}</h3>
        <div class="line"></div>
        <div v-if="order.sales_invoices[0]" class="row">
            <div class="col-md-9 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th> {{$t('message.invoices_id')}}  </th>
                    <th> {{$t('message.price_paid')}}  </th>
                  </tr>
                   <tr v-for=" sales_invoice in order.sales_invoices" :key="sales_invoice.id">
                    <td>{{ sales_invoice.id }}</td>
                    <td>{{ sales_invoice.price_paid}}</td>
                  </tr>
                </table>
            </div>
        </div>
        <div v-else-if="order.buying_invoices[0]" class="row">  
            <div class="col-md-9 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th> {{$t('message.id')}}  </th>
                    <th> {{$t('message.price_paid')}}  </th>
                  </tr>
                   <tr v-for=" buying_invoice in order.buying_invoices" :key="buying_invoice.id">
                    <td>{{ buying_invoice.id }}</td>
                    <td>{{ buying_invoice.price_paid}}</td>
                  </tr>
                </table>
            </div>
        </div>
        <div v-elseclass="row">  
                <h3 class="mb-3 text-center">{{$t('message.no_invoices')}}</h3>
        </div>
        <CButton color="warning" @click="goBack">{{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowProduct',
  data () {
    return {
      order: [],
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/orders/${this.$route.params.id}`)
      .then((response) => {
        this.order = response.data.data.order
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/orders' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
  .title
  {
    background-color: #a8738c;
    color: #f5f3f3;
    border-radius: 20%;
    padding: 7px;
  }
</style>
