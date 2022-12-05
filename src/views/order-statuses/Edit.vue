
<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateorderStatuses" @submit.prevent="UpdateorderStatuses" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;">تعديل حالة الطلب</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CInput label="order status Name"
                id="name"
                v-model="orderStatuses.name"
                class="required"
                placeholder=" أدخل إسم حالة الطلب بالانجليزية"
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
            <CCol sm="6">
              <CInput label="الاسم"
                id="name"
                v-model="orderStatuses.name_ar"
                class="required"
                placeholder="أدخل إسم حالة الطلب بالعربي"
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
  name: 'EditOrderStatuses',
  data () {
    return {
      orderStatuses: [],
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}order-statuses/${this.$route.params.id}`)
      .then((response) => {
        this.orderStatuses = response.data.data
      })
  },
  methods: {
    async UpdateorderStatuses () {
      const formData = new FormData()
      formData.append('name', this.orderStatuses.name)
      formData.append('name_ar', this.orderStatuses.name_ar)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}order-statuses/${this.$route.params.id}`, '/order-statuses')
    },
    goBack () {
      this.orderStatusesOpened ? this.$router.go(-1) : this.$router.push({ path: '/order-statuses' })
    }
  }
}
</script>
