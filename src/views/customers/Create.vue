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
             <CCol class="mb-3">
                      <label for='Customer'>
                       {{ $t('message.customer_type') }}
                      <span class='star'>*</span>
                    </label>
                    <multiselect
                        class='required'
                        v-model='selectedTypeOfCustomer'
                        id='type_customer_id'
                        :options='typeOfCustomers'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='name'
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
              <CCol sm="6">
                 <CInput :label="$t('message.email')"
                  id="email"
                  v-model="customer.email"
                  class=""
                  :placeholder="$t('message.email')"
                  :invalidFeedback="errors.email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
              <CInput :label="$t('message.phone')"
                  id="phone"
                  v-model="customer.phone"
                   pattern="^0[0-9]{9}"
                   oninvalid="setCustomValidity('رقم الهاتف لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  class="required"
                  :placeholder="$t('message.phone')"
                  :invalidFeedback="errors.phone"
                  required
                />
              </CCol>
               <CCol sm="6">
                <CInput :label="$t('message.address')"
                  id="adress"
                  v-model="customer.adress"
                  :placeholder="$t('message.address')"
                  :invalidFeedback="errors.adress"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label="$t('message.zain')"
                  id="zain_transfer_no"
                  v-model="customer.zain_transfer_no"
                   pattern="^0[0-9]{9}"
                  oninvalid="setCustomValidity('رقم التحويل لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  :placeholder="$t('message.zain')"
                  :invalidFeedback="errors.zain_transfer_no"
                />
              </CCol>
              <CCol sm="6">
                <CInput :label="$t('message.mtn')"
                  id="mtn_transfer_no"
                  v-model="customer.mtn_transfer_no"
                   pattern="^0[0-9]{9}"
                oninvalid="setCustomValidity('رقم التحويل لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  :placeholder="$t('message.mtn')"
                  :invalidFeedback="errors.mtn_transfer_no"
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                <CInput :label="$t('message.sudani')"
                  id="sudani_transfer_no"
                  v-model="customer.sudani_transfer_no"
                   pattern="^0[0-9]{9}"
                oninvalid="setCustomValidity('رقم التحويل لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  :placeholder="$t('message.sudani')"
                  :invalidFeedback="errors.sudani_transfer_no"
                />
              </CCol>
              <CCol sm="6">
                <CInput :label="$t('message.digital')"
                  id="digitel_transfer_no"
                  v-model="customer.digitel_transfer_no"
                   pattern="^0[0-9]{9}"
                oninvalid="setCustomValidity('رقم التحويل لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  :placeholder="$t('message.digital')"
                  :invalidFeedback="errors.digitel_transfer_no"
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                <CInput :label="$t('message.mgurush')"
                  id="mgurush_transfer_no"
                  v-model="customer.mgurush_transfer_no"
                   pattern="^0[0-9]{9}"
                oninvalid="setCustomValidity('رقم التحويل لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  :placeholder="$t('message.mgurush')"
                  :invalidFeedback="errors.mgurush_transfer_no"
                />
              </CCol>
              <CCol sm="6">
                <CInput :label="$t('message.momo')"
                  id="momo_transfer_no"
                  v-model="customer.momo_transfer_no"
                   pattern="^0[0-9]{9}"
                oninvalid="setCustomValidity('رقم التحويل لابد أن يتكون من عشرة أرقام ويبدأ بصفر ')"
                  :placeholder="$t('message.momo')"
                  :invalidFeedback="errors.momo_transfer_no"
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
      typeOfCustomers: [],
      errors: [],
    }
  },
  created () {
    const typeOfCustomers = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/customer-type`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          typeOfCustomers.push({ id: value.id, name: value.name})
        })
        this.typeOfCustomers = typeOfCustomers
      })
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
      formData.append('name', this.customer.name)
      if (this.customer.email !=undefined) {
        formData.append('email', this.customer.email)
      }
      formData.append('phone', this.customer.phone)
      if (this.customer.adress !=undefined) {
       formData.append('adress', this.customer.adress)
       }
       if (this.customer.zain_transfer_no !=undefined) {
        formData.append('zain_transfer_no', this.customer.zain_transfer_no)
       } 
       if (this.customer.mtn_transfer_no !=undefined) {
        formData.append('mtn_transfer_no', this.customer.mtn_transfer_no)
       }
       if (this.customer.sudani_transfer_no !=undefined) {
        formData.append('sudani_transfer_no', this.customer.sudani_transfer_no)
       }
        if ( this.customer.digitel_transfer_no !=undefined) {
         formData.append('digitel_transfer_no', this.customer.digitel_transfer_no)
       }
        if (this.customer.mgurush_transfer_no !=undefined) {
        formData.append('mgurush_transfer_no', this.customer.mgurush_transfer_no)  
       }
        if (this.customer.momo_transfer_no !=undefined) {
       formData.append('momo_transfer_no', this.customer.momo_transfer_no) 
       }
        
      formData.append('user_id',1)
      formData.append('type_customer_id', this.selectedTypeOfCustomer.id)
      this.postRequest(formData, this.$hostUrl + 'admin-dashboard/customers', '/customers')
    }
  }
}
</script>
