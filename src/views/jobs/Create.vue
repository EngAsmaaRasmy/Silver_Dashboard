<template>
  <div>
    <CRow>
      <CCol col="12">
        <CCard>
          <form id="createJob" @submit="createJob" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">{{ $t('message.create_job') }}   </CCol>
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
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }} </CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear') }}  </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'createJob',
  data: function () {
    return {
      job: {},
      errors: []
    }
  },
  methods: {
    createJob: function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.job.name)

       this.postRequest(formData, 'http://178.79.181.70:8003/api/jobs', '/jobs')
    }
  }
}

</script>
