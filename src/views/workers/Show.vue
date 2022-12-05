<template>
<div>

           <CCard class="cards">
            <CCardHeader>
                <CCol col="6" style="font-size: 25px;">{{$t('message.show_worker')}} </CCol>
            </CCardHeader>
            <div class="body">
                <div>
                    <div class="cont">
                        <div class="col-md-6">
         <div style="background-color: white; display:flex;flex-direction:row;">
    <div style="flex:1; ">

                            <table class="table table-bordered">
                                <tbody>
                                  <tr>
                                        <th>{{$t('message.city')}} </th>
                                        <td>{{ worker.area.city.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('message.area')}} </th>
                                        <td>{{ worker.area.name }}</td>
                                    </tr>
                                     <tr v-if="worker.name_ar!='undefined'">
                                        <th>{{$t('message.name_ar')}} </th>
                                        <td>{{ worker.name_ar }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('message.mobile')}} </th>
                                        <td>{{ worker.mobile }}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.address')}} </th>
                                        <td>{{ worker.address }}</td>
                                    </tr>
                                     <tr v-if="worker.address_ar!='undefined'">
                                        <th>  {{$t('message.address_ar')}} </th>
                                        <td>{{ worker.address_ar }}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.note')}}  </th>
                                        <td>{{ worker.note }}</td>
                                    </tr>
                                    <tr>
                                        <th> {{$t('message.note_ar')}}  </th>
                                        <td>{{ worker.note_ar }}</td>
                                    </tr>

                                </tbody>

                            </table>
                              <table class="table table-bordered">
                                <tbody>
                                 <tr>
                                        <th> {{$t('message.total_orders')}} </th>
                                        <td>{{ worker.total_orders }}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('message.customer_total_payments')}} </th>
                                        <td>{{ worker.customer_total_payments|toCurrency }} {{$t('message.sdg')}}</td>
                                    </tr>
                                     <tr>
                                        <th>{{$t('message.to_fanni_total_payments')}} </th>
                                        <td>{{ worker.to_fanni_total_payments|toCurrency }} {{$t('message.sdg')}}</td>
                                    </tr>
                                    <tr>
                                        <th>{{$t('message.from_fanni_total_payments')}} </th>
                                        <td>{{ worker.from_fanni_total_payments |toCurrency}} {{$t('message.sdg')}}</td>
                                    </tr>
                                    <tr>
                                        <th>  {{$t('message.amounts_deserved')}}</th>
                                        <td>{{ worker.amounts_deserved |toCurrency}} {{$t('message.sdg')}}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.amounts_needed_to_be_paid')}} </th>
                                        <td>{{ worker.amounts_needed_to_be_paid |toCurrency}} {{$t('message.sdg')}}</td>
                                    </tr>
                                     <tr>
                                        <th> {{$t('message.amounts_need_to_pay')}} </th>
                                        <td>{{ worker.amounts_need_to_pay |toCurrency}} {{$t('message.sdg')}}s</td>
                                    </tr>
                                </tbody>

                            </table>

    </div>
     <div class="left" style="flex:1;">
         <div class="ordeers" v-if="worker.orders.length > 0">
                                  <span> {{$t('message.order')}} </span>
                                  <table>
                                  <tr>
                                  <th>{{$t('message.order_id')}} </th>
                                  <th> {{$t('message.total_cost')}} </th>
                                  <th> {{$t('message.order_status')}} </th>
                                  </tr>
                                  <tr v-for=" order in worker.orders" :key="order.id">
                                  <td> {{order.id}} </td>
                                  <td> {{order.total_cost |toCurrency}}{{$t('message.sdg')}} </td>
                                  <td> {{order.status_id }} </td>
                                  </tr>
                                  </table>
                                 </div>
                                  <div v-if="worker.payments.length > 0">
                                  <span> {{$t('message.payment')}} </span>
                                  <table>
                                  <tr>
                                  <th>{{$t('message.payment_id')}}  </th>
                                  <th> {{$t('message.amount')}} </th>
                                  </tr>
                                  <tr v-for=" payment in worker.payments" :key="payment.id">
                                  <td> {{payment.id}} </td>
                                  <td> {{payment.amount |toCurrency}} {{$t('message.sdg')}} </td>
                                  </tr>
                                  </table>
                                 </div>
                                 <div v-if="worker.services.length > 0">
                                  <span> {{$t('message.service')}} </span>
                                  <table>
                                  <tr>
                                  <th>{{$t('message.service_name')}}  </th>
                                  </tr>
                                  <tr v-for=" service in worker.services" :key="service.id">
                                  <td> {{service.name}} </td>
                                  </tr>
                                  </table>
                                 </div>
                                 </div>
                          </div>
                        </div>
                    </div>
                </div>
                 <CButton color="warning" @click="goBack">{{$t('message.back')}} </CButton>
            </div>
        </CCard>
</div>
</template>

<script>
export default {
  name: 'ShowWorker',
  data () {
    return {
      worker: [],
      area: []

    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}workers/${this.$route.params.id}`)
      .then((response) => {
        this.worker = response.data.data
      })
  },
  methods: {
    goBack () {
      this.workersOpened ? this.$router.go(-1) : this.$router.push({ path: '/workers' })
    }
  }
}
</script>
<style scoped>
span{
  font-size: 20px;
  margin-top: 10px;
}
table,td ,th{
    border: 1px solid #ddd;
  text-align: right;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 15px;
}
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
  .cont{
    display: inline;
    margin: 20px;
  }
  button{
    margin: 30px;
  }
  .left{
    margin: 30px;
  }
</style>
