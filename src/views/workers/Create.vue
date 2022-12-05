/* eslint-disable no-undef */
<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createworkers" @submit="createWorkers" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">{{$t('message.create_worker')}}</CCol>
          </CCardHeader>
          <CCardBody>
           <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='city'>
                      {{$t('message.city')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedCity'
                        id='city'
                        :options='cities'
                        @select="onCityChange"
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
                      <div v-if(errors.area_id) class="invalid-feedback">
                        {{errors.area_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='area'>
                      {{$t('message.area')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedArea'
                        id='area'
                        :options='area'
                        :searchable='true'
                        :close-on-select='true'
                        :placeholder="$t('message.select')"
                        label='name'
                        track-by='name'
                        required='required'
                      >
                        <span slot='noOptions'>{{$t('message.no_area')}}</span>
                        <span slot='noResult'>{{$t('message.no_result')}} </span>
                      </multiselect>
                      <div v-if(errors.area_id) class="invalid-feedback">
                        {{errors.area_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
            </CRow>
             <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                    <label for='service'>
                      {{$t('message.service')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                      multtiple
                        class='required'
                        v-model='selectedService'
                        id='city'
                        :options='services'
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
                      <div v-if(errors.area_id) class="invalid-feedback">
                        {{errors.service_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput  :label=" $t('message.name')"
                  id="name"
                  v-model="workers.name"
                  v-on:keypress="isLetter($event)"
                  class="required"
                  :placeholder="$t('message.name')"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput  :label=" $t('message.name_ar')"
                  id="name"
                  v-model="workers.name_ar"
                  v-on:keypress="isLetter($event)"
                  :placeholder="$t('message.name_ar')"
                  :invalidFeedback="errors.name_ar"

                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CInput  :label=" $t('message.mobile')"
                  id="mobile"
                  type="tel"
                    oninvalid="this.setCustomValidity('الرجاء ادخال رقم هاتف يحتوي على 10 أرقام')"
                  minlength="10"
                  maxlength="10"
                 @keypress="onlyNumbers"
                  v-model="workers.mobile"
                  class="required"
                  :placeholder="$t('message.enter_mobile')"
                  :invalidFeedback="errors.mobile"
                  required
                />
              </CCol>
            </CRow>
              <CRow>
               <CCol sm="6">
                <CInput  :label=" $t('message.address')"
                  id="percentage"
                  type="text"
                  v-model="workers.address"
                  class="required"
                  :placeholder="$t('message.address')"
                  :invalidFeedback="errors.address"
                  required
                />
              </CCol>
               <CCol sm="6">
                <CInput  :label=" $t('message.address_ar')"
                  id="Adress"
                  type="text"
                  v-model="workers.address_ar"
                  :placeholder="$t('message.address_ar')"
                  :invalidFeedback="errors.address_ar"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{$t('message.save')}}</CButton>
              &emsp;
            <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban"/> {{$t('message.clear')}} </CButton>
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
  name: 'Createworkers',
  data: function () {
    return {
      workers: {},
      area: [],
      cities: [],
      services: [],
      selectedService: [],
      selectedArea: '',
      selectedCity: '',
      errors: []
    }
  },
  created () {
    const cities = []
    this.$http
      .get(`${this.$hostUrl}cities`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          cities.push({ id: value.id, name: value.name })
        })
        this.cities = cities
      })
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
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
    },
    onlyNumbers (event) {
      $('#mob_frm').submit(function (e) {
        e.preventDefault()
        if (!$('#mobile').val().match('[0-9]{10}')) {
          alert('please put 10 digit mobile number')
        }
      })
      const keyCode = event.keyCode ? event.keyCode : event.which
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        event.preventDefault()
      }
    },
    onCityChange ($event) {
      const areas = []
      this.$http
        .get(`${this.$hostUrl}cities/${$event.id}`)
        .then((response) => {
          $.each(response.data.data.areas, function (key, value) {
            areas.push({ id: value.id, name: value.name })
          })
          this.area = areas
        })
    },
    async createWorkers (e) {
      e.preventDefault()
      const formData = new FormData()
      if (this.selectedArea) {
        formData.append('area_id', this.selectedArea.id)
      } else {
        this.errors.push('area_id')
        this.errors.area_id = 'areas field is required'
        return 0
      }
      for (let i = 0; i < this.selectedService.length; i++) {
        if (this.selectedService[i]) {
          console.log('services')
        } else {
          this.errors.push('selectedService')
          this.errors.area_id = 'services field is required'
          return 0
        }
      }
      formData.append('name', this.workers.name)
      formData.append('name_ar', this.workers.name_ar)
      formData.append('mobile', this.workers.mobile)
      formData.append('address', this.workers.address)
      formData.append('area_id', this.selectedArea.id)
      formData.append('services', JSON.stringify(this.selectedService))
      formData.append('address_ar', this.workers.address_ar)
      this.errors = await this.postRequest(formData, this.$hostUrl + 'workers', '/workers')
    }
  }
}

</script>
