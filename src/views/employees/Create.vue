<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createEmployee" @submit="createEmployee" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.create_employee') }}</CCol>
          </CCardHeader>
          <CCardBody>
             <CRow>
              <CCol sm='6'>
                <div class='form-group'>
                    <label for='job'>
                      {{$t('message.job')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedJob'
                        id='job_id'
                        :options='jobs'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <!-- <div v-if(errors.category_id) class="invalid-feedback">
                        {{errors.category_id}}
                      </div> -->
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="employee.name"
                  class="required"
                  pattern="\D.{2,}" 
                  oninvalid="setCustomValidity('The name must consist of letters and is not acceptable to consist of numbers')"
                  :placeholder=" $t('message.name') "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                 <div class='form-group'>
                    <label for='job'>
                      {{$t('message.gender')}}
                      <span class='star'>*</span>
                    </label>
                  <div>
                <multiselect
                        class='required'
                        v-model='employee.gender'
                        id='gender'
                        :searchable='true'
                        :options ="['male', 'female']"
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                 </multiselect>
                 </div>
                 </div>
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.phone')"
                  id="phone"
                  v-model="employee.phone"
                  class="required"
                  :placeholder=" $t('message.phone') "
                  :invalidFeedback="errors.phone"
                  required
                ></CInput>
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.birth_date')"
                  id="birth_date"
                  type = "date"
                  v-model="employee.birth_date"
                 :placeholder=" $t('message.birth_date') "
                  :invalidFeedback="errors.birth_date"
               ></CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <div class='form-group'>
                    <label for='job'>
                      {{$t('message.contract_type')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
               <multiselect
                        class='required'
                        v-model='employee.contract_type'
                        id='contract_type'
                        :searchable='true'
                        :options ="['full time', 'part time' , 'remotely']"
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                 </multiselect>
                 </div>
                 </div>
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.hire_date')"
                
                  id="hire_date"
                  v-model="employee.hire_date"
                  class="required"
                  type = "date"
                 :placeholder=" $t('message.hire_date') "
                  :invalidFeedback="errors.hire_date"
                  required
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.employee_email')"
                  id="email"
                  v-model="employee.email"
                  class="required"
                  :placeholder=" $t('message.email') "
                  :invalidFeedback="errors.email"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.salary')"
                  id="salary"
                  v-model="employee.salary"
                 :placeholder=" $t('message.salary') "
                  :invalidFeedback="errors.salary"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'createEmployee',
  data: function () {
    return {
      employee: {},
      jobs: [],
      selectedJob: '',
      errors: []
    }
  },
   created () {
    const jobs = []
    this.$http
      .get(`${this.$hostUrl}jobs`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          jobs.push({ id: value.id, name: value.name })
        })
        this.jobs = jobs
      })
      
  },
  methods: {
    createEmployee:function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.employee.name)
      formData.append('gender', this.employee.gender)
      formData.append('birth_date', this.employee.birth_date)
      formData.append('phone', this.employee.phone)
      formData.append('contract_type', this.employee.contract_type)
      formData.append('hire_date', this.employee.hire_date)
       formData.append('salary',this.employee.salary)
       formData.append('email',this.employee.email)
      formData.append('job_id', this.selectedJob.id)

       this.postRequest(formData, this.$hostUrl + 'employees', '/employees')
    }
  }
}

</script>