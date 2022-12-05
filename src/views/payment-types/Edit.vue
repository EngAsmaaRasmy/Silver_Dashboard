<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdatePaymentTypes" @submit.prevent="UpdatePaymentTypes" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;">تعديل نوع المدفوعات</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CInput label="Name"
                id="name"
                type="text"
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
                type="text"
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
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> رجوع </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
export default {
  name: 'EditpaymentTypes',
  data () {
    return {
      paymentTypes: [],
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}payment-types/${this.$route.params.id}`)
      .then((response) => {
        this.paymentTypes = response.data.data
      })
  },
  methods: {
    async UpdatePaymentTypes () {
      const formData = new FormData()
      formData.append('name', this.paymentTypes.name)
      formData.append('name_ar', this.paymentTypes.name_ar)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}payment-types/${this.$route.params.id}`, '/payment-types')
    },
    goBack () {
      this.paymentTypesOpened ? this.$router.go(-1) : this.$router.push({ path: '/payment-types' })
    }
  }
}
</script>
