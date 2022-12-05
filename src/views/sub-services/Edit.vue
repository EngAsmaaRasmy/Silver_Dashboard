<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateSubServices" @submit.prevent="UpdateSubServices" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;">{{$t('message.update_subService')}}</CCol>
        </CCardHeader>
        <CCardBody>
           <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='services'>
                      {{ $t('message.service')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedService'
                        id='services'
                        :options='services'
                        :searchable='true'
                             :close-on-select='true'
                        :placeholder=" $t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.emity_list')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <div v-if(errors.service_id) class="invalid-feedback">
                        {{errors.service_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow>
         <CCol sm="6">
                <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="subServices.name"
                  class="required"
                  :placeholder=" $t('message.name')"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.name_ar')"
                  id="name"
                  v-model="subServices.name_ar"
                  :placeholder=" $t('message.name_ar')"
                  :invalidFeedback="errors.name_ar"
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.price')"
                  id="price"
                  type="number"
                  v-model="subServices.price"
                  class="required"
                  :placeholder=" $t('message.price')"
                  :invalidFeedback="errors.price"
                  required
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.percentage')"
                  id="percentage"
                  type="number"
                  v-model="subServices.percentage"
                  class="required"
                  :placeholder="$t('message.percentage')"
                  :invalidFeedback="errors.percentage"
                  required
                />
              </CCol>
            </CRow>
            </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save')}}</CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{$t('message.back')}} </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'EditSubServices',
  data () {
    return {
      subServices: [],
      services: [],
      selectedService: '',
      errors: []
    }
  },
  created () {
    const services = []
    this.$http
      .get(`${this.$hostUrl}services`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          services.push({ id: value.id, name: value.name })
        })
        this.services = services
      })
    this.$http
      .get(`${this.$hostUrl}sub-services/${this.$route.params.id}`)
      .then((response) => {
        this.subServices = response.data.data
        this.selectedService = {
          id: this.subServices.service_id,
          name: this.subServices.service.name
        }
      })
  },
  methods: {
    async UpdateSubServices () {
      const formData = new FormData()
      if (this.selectedService) {
        formData.append('service_id', this.selectedService.id)
      } else {
        this.errors.push('service_id')
        this.errors.service_id = 'service field is required'
        return 0
      }
      formData.append('name_ar', this.subServices.name_ar)
      formData.append('percentage', this.subServices.percentage)
      formData.append('service', this.selectedService)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}sub-services/${this.$route.params.id}`, '/sub-services')
    },
    goBack () {
      this.subServicesOpened ? this.$router.go(-1) : this.$router.push({ path: '/sub-services' })
    }
  }
}
</script>
