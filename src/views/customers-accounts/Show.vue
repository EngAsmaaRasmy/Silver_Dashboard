<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{ $t('message.show_customer_account') }}  </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.customer_name') }}</th>
                    <td>{{ customerAccount.customer.name }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.customer_phone') }}</th>
                    <td>{{ customerAccount.customer.phone }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.customer_address') }}</th>
                    <td>{{ customerAccount.customer.adress }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.type_of_customer') }}</th>
                   <td  v-if="customerAccount.customer.type_of_customer = 1">{{ $t('message.selling_point') }}</td>
                    <td  v-else-if="customerAccount.customer.type_of_customer = 2">{{ $t('message.distributor') }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.transfer_number') }}</th>
                    <td>{{ customerAccount.transfer_number }}</td>
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
      customerAccount: [],
      moment: moment
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customers-acounts/${this.$route.params.id}`)
      .then((response) => {
        this.customerAccount = response.data.data.customerAccount
      })
  },
  methods: {
    goBack () {
      this.citiesOpened ? this.$router.go(-1) : this.$router.push({ path: '/customers-accounts' })
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
