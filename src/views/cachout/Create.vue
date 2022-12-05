<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createCashout" @submit="createCashout" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">{{ $t('message.create_new_cachout') }}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='employee'>
                      {{ $t('message.employee') }}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedEmployee'
                        id='employee_id'
                        :options='employees'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder=" $t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'> {{ $t('message.emity_list') }} </span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <!-- <div v-if(errors.city_id) class="invalid-feedback">
                        {{errors.city_id}}
                      </div> -->
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.description')"
                  id="description"
                  v-model="cachout.description"
                  class="required"
                  :placeholder=" $t('message.description')"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.description_ar')"
                  id="description_ar"
                  v-model="cachout.description"
                  :placeholder=" $t('message.description_ar')"
                  :invalidFeedback="errors.name_ar"

                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.value')"
                  id="value"
                  v-model="cachout.value"
                  class="required"
                  :placeholder=" $t('message.value')"
                  :invalidFeedback="errors.name"
                  required
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
  name: 'createCashout',
  data: function () {
    return {
      cachout: {},
      employees: [],
      selectedEmployee: '',
      errors: []
    }
  },
  created () {
    const employees = []
    this.$http
      .get(`${this.$hostUrl}employees`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          employees.push({ id: value.id, name: value.name })
        })
        this.employees = employees
      })
  },
  methods: {
    createCashout:function (e)  {
      e.preventDefault()
      const formData = new FormData()
      if (this.selectedCity) {
        formData.append('employee_id', this.selectedEmployee.id)
      } else {
        this.errors.push('employee_id')
        this.errors.employee_id = 'employee field is required'
        return 0
      }
      formData.append('description', this.cachout.description)
      formData.append('description_ar', this.cachout.description_ar)
      formData.append('value', this.cachout.value)

     this.postRequest(formData, this.$hostUrl + 'cashouts', '/create-cashouts')
    }
  }
}

</script>
