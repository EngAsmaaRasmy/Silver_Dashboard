<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createOrderStatuses" @submit="createOrderStatuses" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">إضافة خدمة جديدة</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput label="order status Name "
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
                  placeholder="أدخل إسم حالة الطلب بالعربية"
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
  name: 'createOrderStatuses',
  data: function () {
    return {
      orderStatuses: {},
      errors: []
    }
  },
  methods: {
    async createOrderStatuses (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.orderStatuses.name)
      formData.append('name_ar', this.orderStatuses.name_ar)

      this.errors = await this.postRequest(formData, this.$hostUrl + 'order-statuses', '/order-statuses')
    }
  }
}

</script>
