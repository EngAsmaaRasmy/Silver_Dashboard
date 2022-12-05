<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createCitiy" @submit="createpaymentTypes" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">إضافة نوع مدفوعات جديد</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput label="  paymentTypes Name"
                  id="name"
                  v-model="paymentTypes.name"
                  class="required"
                  placeholder=" أدخل إسم نوع المدفوعات بالانجليزية"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput label="الاسم"
                  id="name"
                  v-model="paymentTypes.name_ar"
                  class="required"
                  placeholder="أدخل إسم نوع المدفوعات بالعربية"
                  :invalidFeedback="errors.name_ar"
                  required
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> حفظ</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> مسح </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'createPaymentTypes',
  data: function () {
    return {
      paymentTypes: {},
      errors: []
    }
  },
  methods: {
    async createPaymentTypes (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.paymentTypes.name)
      formData.append('name_ar', this.paymentTypes.name_ar)

      this.errors = await this.postRequest(formData, this.$hostUrl + 'payment-types', '/payment-types')
    }
  }
}

</script>
