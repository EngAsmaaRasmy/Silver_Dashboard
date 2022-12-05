
<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createSubService" @submit="createSubService" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.subService') }}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='Service'>
                       {{ $t('message.service') }}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedService'
                        id='service'
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
                  v-model="subService.name"
                  class="required"
                  :placeholder=" $t('message.name')"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.name_ar')"
                  id="name"
                  v-model="subService.name_ar"
                  :placeholder="  $t('message.name_ar') "
                  :invalidFeedback="errors.name_ar"
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.price')"
                  id="price"
                  min="1"
                  type="number"
                  @input="ckeck"
                  v-model.number="subService.price"
                  class="required"
                    oninvalid="this.setCustomValidity('أدخل قيمة أكبر من 0')"
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
                  min=0
                   oninvalid="this.setCustomValidity('أدخل قيمة أكبر من 0')"
                  v-model="subService.percentage"
                  class="required"
                  :placeholder=" $t('message.percentage')"
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
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{ $t('message.clear')}} </CButton>
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
  name: 'Createsub-services',
  data: function () {
    return {
      subService: {},
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
  },
  methods: {
    check () {
      const price = document.querySelector('#price')
      if (price <= 0) {
        price.setCustomValidity('أدخل سعر اكبر من الصفر')
      } else {
      // input is fine -- reset the error message
        price.setCustomValidity('')
      }
    },

    async createSubService (e) {
      e.preventDefault()
      const formData = new FormData()
      if (this.selectedService) {
        formData.append('service_id', this.selectedService.id)
      } else {
        this.errors.push('service_id')
        this.errors.service_id = 'service field is required'
        return 0
      }

      formData.append('name', this.subService.name)
      formData.append('name_ar', this.subService.name_ar)
      formData.append('price', this.subService.price)
      formData.append('percentage', this.subService.percentage)
      formData.append('srevice', this.selectedService)

      this.errors = await this.postRequest(formData, this.$hostUrl + 'sub-services', '/sub-services')
    }
  }
}

</script>
