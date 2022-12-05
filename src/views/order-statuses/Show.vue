<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">عرض خالة الطلب </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>إسم حالة  بالانجليزية</th>
                    <td>{{ orderStatuses.name }}</td>
                  </tr>
                  <tr>
                    <th> إسم حالة الطلب بالعربية</th>
                    <td>{{ orderStatuses.name_ar }}</td>
                  </tr>

                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">رجوع</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowOrderStatuses',
  data () {
    return {
      orderStatuses: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}order-statuses/${this.$route.params.id}`)
      .then((response) => {
        this.orderStatuses = response.data.data
      })
  },
  methods: {
    goBack () {
      this.orderStatusesOpened ? this.$router.go(-1) : this.$router.push({ path: '/order-statuses' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #3c4b64;
    color: #f5f3f3;
  }
</style>
