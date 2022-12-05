<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <CCHeader>
            <CCol sm="12" style="font-size: 25px;"> {{ $t('message.create_customer') }}</CCol>
            </CCHeader>
          <form id="createCustomer" @submit="createCustomer" >
          <CCardBody>
             <input name="type_customer_id" id="type_customer_id" type="hidden" value="1" v-model="customer.type_customer_id"/>
            <CRow>
              <CCol sm="12">
                 <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="customer.name"
                  v-on:keypress="isLetter($event)"
                  class="required"
                  :placeholder="$t('message.name')"
                  required
                  :invalidFeedback="errors.name"
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="12">
                 <CInput :label=" $t('message.email')"
                  id="email"
                  v-model="customer.email"
                  class="required"
                  :placeholder="$t('message.email')"
                  required
                  :invalidFeedback="errors.email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                :label=" $t('message.mobile')"
                  id="phone"
                  class="required"
                   @keypress="onlyNumbers"
                  v-model="customer.phone"
                  type="tel"
                  maxlength="10"
                  minlength="10"
                  oninvalid="this.setCustomValidity('الرجاء ادخال رقم هاتف يحتوي على 10 أرقام')"
                  :invalidFeedback="errors.mobile"
                  :placeholder="$t('message.enter_mobile')"

                />
              </CCol>
            </CRow>
            <CRow>
            <CCol sm="12">
                <CInput :label=" $t('message.address')"
                  id="adress"
                  v-model="customer.adress"
                  class="required"
                  :placeholder="$t('message.address')"
                   :invalidFeedback="errors.adress "
                  required
                />
              </CCol>

            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/>  {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/>  {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'CreateCustomer',
  data: function () {
    return {
      customer: {},
      errors: []
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
      $('#mob_frm').submit(function (e) {
        e.preventDefault()
        if (!$('#mobile').val().match('[0-9]{10}')) {
          alert('please put 10 digit mobile number')
        }
      })
      const keyCode = event.keyCode ? event.keyCode : event.which
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        event.preventDefault()
      }
    },
    async createCustomer (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.customer.name)
      formData.append('phone', this.customer.phone)
       formData.append('email', this.customer.email)
      formData.append('adress', this.customer.adress)
       formData.append('type_customer_id',1)

      this.errors = await this.postRequest(formData, this.$hostUrl + 'admin-dashboard/customers', '/orders/create')
    }
  }
}
</script>
