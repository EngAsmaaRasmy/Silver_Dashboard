<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">عرض المدينة </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>إسم المدينة  بالانجليزية</th>
                    <td>{{ city.name }}</td>
                  </tr>
                  <tr>
                    <th> إسم المدينة بالعربية</th>
                    <td>{{ city.name_ar }}</td>
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
  name: 'ShowCities',
  data () {
    return {
      city: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}cities/${this.$route.params.id}`)
      .then((response) => {
        this.city = response.data.data
      })
  },
  methods: {
    goBack () {
      this.citiesOpened ? this.$router.go(-1) : this.$router.push({ path: '/cities' })
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
