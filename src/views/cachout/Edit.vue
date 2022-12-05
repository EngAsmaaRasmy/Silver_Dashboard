<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateArea" @submit.prevent="UpdateArea" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.update_area') }}</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
              <CCol sm='12'>
                <div class='form-group'>
                   <label for='cities'>
                      {{ $t('message.city') }}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedCity'
                        id='cities'
                        :options='cities'
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
                      <div v-if(errors.city_id) class="invalid-feedback">
                        {{errors.city_id}}
                      </div>
                    </div>
                  </div>
              </CCol>
            </CRow>
          <CRow>
            <CCol sm="6">
              <CInput :label=" $t('message.name')"
                id="name"
                v-model="area.name"
                class="required"
                :placeholder=" $t('message.name')"
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
            <CCol sm="6">
              <CInput :label=" $t('message.name_ar')"
                id="name"
                v-model="area.name_ar"
                :placeholder=" $t('message.name_ar')"
                :invalidFeedback="errors.name_ar"
              />
            </CCol>
          </CRow>

            </CCardBody>
            <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save') }}</CButton>
              &emsp;
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'EditArea',
  data () {
    return {
      area: [],
      cities: [],
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
    this.$http
      .get(`${this.$hostUrl}areas/${this.$route.params.id}`)
      .then((response) => {
        this.area = response.data.data
        this.selectedCity = {
          id: this.area.city.id,
          name: this.area.city.name
        }
      })
  },
  methods: {
    async UpdateArea () {
      const formData = new FormData()
      if (this.selectedCity) {
        formData.append('city_id', this.selectedCity.id)
      } else {
        this.errors.push('city_id')
        this.errors.city_id = 'city field is required'
        return 0
      }
      formData.append('name', this.area.name)
      formData.append('name_ar', this.area.name_ar)
      formData.append('city', this.selectedCity)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}areas/${this.$route.params.id}`, '/areas')
    },
    goBack () {
      this.areasOpened ? this.$router.go(-1) : this.$router.push({ path: '/areas' })
    }
  }
}
</script>
