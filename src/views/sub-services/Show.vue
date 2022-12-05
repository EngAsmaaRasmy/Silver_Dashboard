<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <CCardHeader>
        <CCol col="6" style="font-size: 25px;"> {{ $t('message.show_subService')}} </CCol>
      </CCardHeader>
      <CCardBody>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-bordered">
                  <tr>
                    <th>{{ $t('message.service_name')}}</th>
                    <td>{{ subService.service.name }}</td>
                  </tr>
                  <tr>
                    <th>{{ $t('message.service_name_ar')}}</th>
                    <td>{{ subService.service.name_ar }}</td>
                  </tr>
                  <tr>
                    <th> {{ $t('message.subService_name')}} </th>
                    <td>{{ subService.name }}</td>
                  </tr>
                  <tr v-if="subService.name_ar!='undefined'">
                    <th> {{ $t('message.subService_name_ar')}}  </th>
                    <td>{{ subService.name_ar }}</td>
                  </tr>
                    <tr>
                    <th> {{ $t('message.price')}} </th>
                    <td>{{ subService.price |toCurrency }}  {{ $t('message.sdg')}}</td>
                  </tr>
                    <tr>
                    <th> {{ $t('message.percentage')}} </th>
                    <td>{{ subService.percentage  +"%"}}</td>
                  </tr>

                </table>
            </div>
        </div>
        <CButton color="warning" @click="goBack"> {{ $t('message.back')}}</CButton>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
</template>

<script>
export default {
  name: 'ShowSub-Services',
  data () {
    return {
      subService: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$http
      .get(`${this.$hostUrl}sub-services/${this.$route.params.id}`)
      .then((response) => {
        this.subService = response.data.data
      })
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/sub-services' })
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
