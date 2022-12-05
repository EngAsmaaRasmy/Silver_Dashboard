<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{ $t('message.customer_show') }}  </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.customer_name') }}</th>
                    <td>{{ customer.name }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.customer_phone') }}</th>
                    <td>{{ customer.phone }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.customer_address') }}</th>
                    <td>{{ customer.adress }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.type_of_customer') }}</th>
                   <td  v-if="customer.type_of_customer = 1">{{ $t('message.selling_point') }}</td>
                    <td  v-else-if="customer.type_of_customer = 2">{{ $t('message.distributor') }}</td>
                    <td  v-else-if="customer.type_of_customer = 3">{{ $t('message.distributor') }}</td>
                  </tr>

                </table>
            </div>
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.zain') }}</th>
                    <td>{{ customer.zain_transfer_no }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.mtn') }}</th>
                    <td>{{ customer.mtn_transfer_no }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.sudani') }}</th>
                    <td>{{ customer.sudani_transfer_no }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.digital') }}</th>
                    <td>{{ customer.digitel_transfer_no }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.mgurush') }}</th>
                    <td>{{ customer.mgurush_transfer_no }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.momo') }}</th>
                    <td>{{ customer.momo_transfer_no }}</td>
                  </tr>

                </table>
            </div>
        </div>
         <div class="row" v-if="customer.orders[0]">
             <CCol col="6" style="font-size: 25px;">{{ $t('message.customer_orders') }}  </CCol>
            <div class="col-md-10 m-auto">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.order_number') }}   </th>
                    <th> {{ $t('message.order_total') }}  </th>
                     <th>  {{ $t('message.payment_status') }}  </th>
                      <th>  {{ $t('message.order_status') }}  </th>
                      <th>  {{ $t('message.order_created_at') }}  </th>
                  </tr>
                   <tr v-for=" order in customer.orders" :key="order.id">
                    <td>1233{{ order.id }}</td>
                    <td>{{ order.total }}</td>
                    <td  v-if="order.payment_status_id = 1">{{ $t('message.not_paid') }}</td>
                    <td  v-else-if="order.payment_status_id = 2">{{ $t('message.paid') }}</td>
                    <td v-if="order.order_status_id = 1">{{ $t('message.pending') }}</td>
                    <td v-else-if="order.order_status_id = 2">{{ $t('message.approve') }}</td>
                    <td v-else-if="order.order_status_id = 3">{{ $t('message.completed') }}</td>
                    <td>{{ moment(order.created_at).format("DD-MM-YYYY")   }}</td>
                  </tr>
                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">{{ $t('message.back') }}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
import moment from "moment";

export default {
  name: 'ShowCustomer',
  data () {
    return {
      customer: [],
      moment: moment
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customers/${this.$route.params.id}`)
      .then((response) => {
        this.customer = response.data.data.customer
      })
  },
  methods: {
    goBack () {
      this.citiesOpened ? this.$router.go(-1) : this.$router.push({ path: '/customers' })
    },
  }
}
</script>
<style scoped>
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
</style>
