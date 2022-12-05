<template>
<CRow>
  <CCol col="12" xl="12">
    <CCard>
      <form id="UpdateSupplier" @submit.prevent="UpdateSupplier" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{$t('message.update_supplier')}} </CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <CInput :label=" $t('message.name') "
                id="name"
                v-model="suppliers.name"
                class="required"
                 :placeholder="$t('message.name')"
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
          </CRow>
           <CRow>
            <CCol sm="12">
              <CInput :label="$t('message.email')"
                id="email"
                v-model="suppliers.email"
                class="required"
                :placeholder="$t('message.email')"
                :invalidFeedback="errors.email"
                required
              />
            </CCol>
          </CRow>
           <CRow>
            <CCol sm="12">
              <CInput :label=" $t('message.phone')"
                id="phone"
                v-model="suppliers.phone"
                class="required"
                :placeholder=" $t('message.phone')"
                :invalidFeedback="errors.phone"
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
</template>

<script>
import $ from 'jquery'
export default {
  name: 'EditSupplier',
  data () {
    return {
      suppliers: [],
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}suppliers/${this.$route.params.id}`)
      .then((response) => {
        this.suppliers = response.data.data.info
      })
  },
  methods: {
    async UpdateSupplier () {
      const formData = new FormData()
      formData.append('name', this.suppliers.name)
      formData.append('email', this.suppliers.email)
      formData.append('phone', this.suppliers.phone)
      formData.append('_method', 'PUT')

     this.errors = await this.postRequest(formData, `${this.$hostUrl}suppliers/${this.$route.params.id}`, '/suppliers')
    },
    goBack () {
      this.areasOpened ? this.$router.go(-1) : this.$router.push({ path: '/suppliers' })
    }
  }
}
</script>
