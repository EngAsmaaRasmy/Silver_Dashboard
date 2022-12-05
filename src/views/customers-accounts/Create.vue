<template>
  <div class="create">
      <CRow>
        <CCol md="12">
          <CCard>
           <form id="createCustomer" @submit="createCustomer" >
           <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.create_customer') }}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                    <input name="user_id" id="user_id" type="hidden" value="1"  v-model="customer.user_id"/>
             <CCol class="mb-3">
                      <label for='Customer'>
                       {{ $t('message.customer_type') }}
                      <span class='star'>*</span>
                    </label>
                    <multiselect
                        class='required'
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
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
               <CInput :label="$t('message.name')"
                  id="name"
                  v-model="customer.name"
                  class="required"
                  :placeholder="$t('message.name')"
                  :invalidFeedback="errors.email"
                  required
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                 <CInput :label="$t('message.email')"
                  id="email"
                  v-model="customer.email"
                  class="required"
                  :placeholder="$t('message.email')"
                  :invalidFeedback="errors.email"
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
              <CInput :label="$t('message.phone')"
                  id="phone"
                  v-model="customer.phone"
                  class="required"
                  :placeholder="$t('message.phone')"
                  :invalidFeedback="errors.phone"
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label="$t('message.address')"
                  id="adress"
                  v-model="customer.adress"
                  :placeholder="$t('message.address')"
                  :invalidFeedback="errors.adress"
                />
              </CCol>
            </CRow>

          </CCardBody>
             <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save')}}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear')}} </CButton>
          </CCardFooter>
             </Form>
           </CCard>
        </CCol>
      </CRow>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'customers',
  data: function () {
    return {
      customer: {},
      selectedTypeOfCustomer : " ",
      errors: [],
    }
  },
  methods: {
       isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
    },
    onlyNumbers (event) {
      const keyCode = event.keyCode ? event.keyCode : event.which
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        event.preventDefault()
      }
    },
     createCustomer:function (e) {
      e.preventDefault()
      const formData = new FormData()
      let id = this.selectedTypeOfCustomer.id
      console.log(id)
      formData.append('name', this.customer.name)
      formData.append('email', this.customer.email)
      formData.append('phone', this.customer.phone)
      formData.append('adress', this.customer.adress)
      formData.append('user_id',this.customer.user_id)
      formData.append('type_customer_id', this.selectedTypeOfCustomer.id)
      console.log(formData)
       this.postRequest(formData, this.$hostUrl + 'admin-dashboard/customers', '/customers')
    }
  }
}
</script>
