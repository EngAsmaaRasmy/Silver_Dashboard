<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <form id="UpdateJob" @submit.prevent="UpdateJob" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.update_job') }}</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
           <CCol sm="6">
                <CInput :label=" $t('message.job_name')"
                  id="name"
                  v-model="job.name"
                  class="required"
                  pattern="\D.{2,}" 
                  oninvalid="setCustomValidity('The name must consist of letters and is not acceptable to consist of numbers')"
                  :placeholder=" $t('message.job_name')"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
          </CRow>
           <CRow>
            <CCol sm="6">
              <CInput 
               :label=" $t('message.job_name_ar')"
                id="name_ar"
                type="text"
                v-model="job.name_ar"
                class="required"
                :placeholder=" $t('message.job_name_ar')"
                :invalidFeedback="errors.name_ar"
                required
              />
            </CCol>
          </CRow>

            </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }} </CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }}  </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
export default {
  name: 'EditJob',
  data () {
    return {
      job: [],
      errors: [],
    }
  },
  created () {
    this.$http
      .get(`http://178.79.181.70:8003/api/jobs/${this.$route.params.id}`)
      .then((response) => {
        this.job = response.data.data.job
      })
  },
  methods: {
    async UpdateJob () {
      const formData = new FormData()
      formData.append('name', this.job.name)
       formData.append('name_ar', this.job.name_ar)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `http://178.79.181.70:8003/api/jobs/${this.$route.params.id}`, '/jobs')
    },
    goBack () {
      this.citiesOpened ? this.$router.go(-1) : this.$router.push({ path: '/jobs' })
    }
  }
}
</script>
