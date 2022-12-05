<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;">{{ $t('message.show_category')}} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.category_name')}} </th>
                    <td>{{ category.name }}</td>
                  </tr>
                  <tr v-if="category.name_ar!='undefined'">
                    <th> {{ $t('message.category_name_ar')}}</th>
                    <td>{{ category.name_ar }}</td>
                  </tr>
                   <tr>
                    <th>{{ $t('message.category_description')}} </th>
                    <td>{{ category.description }}</td>
                  </tr>
                  <tr v-if="category.description_ar!='undefined'">
                    <th> {{ $t('message.category_description_ar')}}</th>
                    <td>{{ category.description_ar }}</td>
                  </tr>

                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack">{{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowCategory',
  data () {
    return {
      category: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/categories/${this.$route.params.id}`)
      .then((response) => {
        this.category = response.data.data.category
      })
  },
  methods: {
    goBack () {
      this.servicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/categories' })
    }
  }
}
</script>
<style scoped>
  th {
    background-color: #643c4f;
    color: #f5f3f3;
  }
</style>
