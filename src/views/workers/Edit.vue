<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateWorkers" @submit.prevent="UpdateWorkers" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{$t('message.update_worker')}}</CCol>
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
                        v-model='worker.area.city'
                        id='city'
                        :options='cities'
                        :searchable='true'
                        @select="onCityChange"
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
                    <label for='areas'>
                      {{$t('message.area')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='worker.area'
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
                        class='required'
                        v-model='worker.services'
                        id='service'
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
              <CInput :label=" $t('message.name')"
                id="name"
                v-model="worker.name"
                class="required"
                v-on:keypress="isLetter($event)"
                :placeholder="$t('message.name')"
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
             <CCol sm="6">
              <CInput  :label=" $t('message.name_ar')"
                id="name"
                v-model="worker.name_ar"
                v-on:keypress="isLetter($event)"
                :placeholder="$t('message.name_ar')"
                :invalidFeedback="errors.name_ar"

              />
            </CCol>
          </CRow>
           <CRow>
            <CCol sm="6">
              <ICnput  :label=" $t('message.mobile')"
                id="mobile"
                minlength="10"
                maxlength="10"
                  oninvalid="this.setCustomValidity('الرجاء ادخال رقم هاتف يحتوي على 10 أرقام')"
                 @keypress="onlyNumbers"
                v-model="worker.mobile"
                type="tel"
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
                id="name"
                v-model="worker.address"
                class="required"
                 :placeholder="$t('message.address')"
                :invalidFeedback="errors.address"
                required
              />
            </CCol>
             <CCol sm="6">
              <CInput  :label=" $t('message.address_ar')"
                id="name"
                v-model="worker.address_ar"
                class="required"
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
  name: 'EditWorker',
  data () {
    return {
      worker: [],
      cities: [],
      area: [],
      services: [],
      selectedService: '',
      selectedArea: '',
      selectedCity: '',
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}workers/${this.$route.params.id}`)
      .then((response) => {
        this.worker = response.data.data
      })
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
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
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
    async UpdateWorkers () {
      const formData = new FormData()
      if (this.selectedArea) {
        formData.append('area_id', this.selectedArea.id)
      } else {
        this.errors.push('area_id')
        this.errors.area_id = 'areas field is required'
        return 0
      }

      formData.append('name', this.worker.name)
      formData.append('name_ar', this.worker.name_ar)
      formData.append('mobile', this.worker.mobile)
      formData.append('address', this.worker.address)
      formData.append('address_ar', this.worker.address_ar)
      formData.append('area_id', this.selectedArea.id)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}workers/${this.$route.params.id}`, '/workers')
    },
    goBack () {
      this.workersceOpened ? this.$router.go(-1) : this.$router.push({ path: '/workers' })
    }
  }
}
</script>
