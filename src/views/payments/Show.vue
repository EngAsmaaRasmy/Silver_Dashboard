<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">   {{$t('message.show_payment')}} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">

                  <tr>
                    <th> {{$t('message.payment_id')}} </th>
                    <td>{{ payments.id }}</td>
                  </tr>
                  <tr>
                    <th> {{$t('message.payment_type')}} </th>
                    <td>{{ payments.payment_type.name}}</td>
                  </tr>
                  <tr>
                    <th> {{$t('message.worker_payment')}} </th>
                    <td  v-if=" payments.worker !==null">{{ payments.worker.name }}</td>
                  </tr>
                  <tr>
                    <th > {{$t('message.customer_payment')}}   </th>
                    <td v-if=" payments.customer !== null">{{ payments.customer.name}}</td>
                  </tr>
                  <tr>
                    <th>  {{$t('message.amount')}} </th>
                    <td>{{ payments.amount |toCurrency}} {{$t('message.sdg')}} </td>
                  </tr>
                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">{{$t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowAreas',
  data () {
    return {
      payment_type: [],
      payments: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}payments/${this.$route.params.id}`)
      .then((response) => {
        this.payments = response.data.data
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/payments' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
</style>
