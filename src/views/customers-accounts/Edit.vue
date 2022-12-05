<template>
  <div>
      <CRow >
        <CCol md="12">
          <CCard class="cards">
         <form id="UpdateCustomerAccount" @submit="UpdateCustomerAccount" >
           <CCardHeader>
              <CCol col="6" style="font-size: 25px">{{ $t('message.update_customer_account') }}</CCol>
           </CCardHeader>
           <CCardBody class="p-4">
               <CRow>
              <CCol sm="6">
                    <label for='customers' >
                      {{$t('message.customer')}}
                      <span class='star'>*</span>
                       </label>
                         <multiselect
                        class='required mt-2'
                        id='customer_id'
                        v-model="selectedCustomer"
                        :options='customers'
                        :searchable='true'
                        v-on:keypress="changeLable($event)"
                       :close-on-select='true'
                       :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
              </CCol>
            </CRow>
            <CRow>
             <CCol sm="6">
                      <label for='Customer'>
                       {{ $t('message.customer_type') }}
                      <span class='star'>*</span>
                    </label>
                    <multiselect
                        class='required mt-2'
                        v-model='selectedTypeOfCustomer'
                        id='type_customer_id'
                        :options='[
                        {id: 1 ,name: "salling point"},
                        {id: 2 , name: "distriputer point"}
                        ]'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='id'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
              </CCol>
            </CRow>
              <CRow>
                <CCol sm="6">
               <CInput :label=" $t('message.transfer_number')"
                  :placeholder=" $t('message.transfer_number')"
                  id="transfer_number"
                  type="text"
                  v-model="customerAccount.transfer_number"
                  required
                >
                </CInput>
                </CCol>
              </CRow>
            </CCardBody>
              <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }} </CButton>
          </CCardFooter>
         </form>
         </CCard>
        </CCol>
      </CRow>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'UpdateCustomerAccount',
  data: function () {
    return {
      customerAccount: [],
      customers:[],
      selectedTypeOfCustomer : " ",
      selectedCustomer: " ",
      errors: [],
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customers-acounts/${this.$route.params.id}`)
      .then((response) => {
        this.customerAccount = response.data.data.customerAccount
        this.selectedCustomer = {
          id: this.customerAccount.customer.id,
          name: this.customerAccount.customer.name
        } 
      })
    const customers = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          customers.push({ id: value.id, name: value.name})
        })
        this.customers = customers
      })
  },
  methods: {
    async UpdateCustomerAccount() {
      const formData = new FormData()
      let id = this.customer.id
      formData.append('name', this.customer.name)
      formData.append('email', this.customer.email)
      formData.append('phone', this.customer.phone)
      formData.append('adress', this.customer.adress)
       formData.append('type_customer_id', id)
      formData.append('_method', 'PUT')

       this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/customers-acounts/${this.$route.params.id}`, '/customers')
    },
    goBack () {
      this.workersceOpened ? this.$router.go(-1) : this.$router.push({ path: '/customers-accounts' })
    }
  }
}
</script>
