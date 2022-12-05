<template>
  <div class="create">
    <CRow>
      <CCol col="12">
        <CCard>
          <form id="CreateSupplier" @submit="createSupplier" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">  {{ $t('message.create_supplier')}}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput :label=" $t('message.supplier_name')"
                  id="name"
                  v-model="supplier.name"
                  class="required"
                  pattern="\D.{2,}" 
                  oninvalid="setCustomValidity('The name must consist of letters and is not acceptable to consist of numbers')"
                  :placeholder="   $t('message.supplier_name') "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput :label="$t('message.supplier_email')"
                  id="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  v-model="supplier.email"
                  oninvalid="setCustomValidity('The email must valid with (name@gmail.com)')"
                  class="required"
                  :placeholder="$t('message.supplier_email')"
                  :invalidFeedback="errors.email"
                  required
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="12">
                <CInput :label="$t('message.supplier_phone')"
                  id="phone"
                  v-model="supplier.phone"
                  class="required"
                  pattern="^0[0-9]{9}"
                  oninvalid="setCustomValidity('The Phone must start with 0 and consist of 10 digits)')"
                  :placeholder="$t('message.supplier_phone')"
                  :invalidFeedback="errors.phone"
                  required
                />
              </CCol>
            </CRow>

          </CCardBody>
          <CCardFooter>
            <CButton type="submit" size="sm" color="primary" >
            <CIcon name="cil-check-circle"/> {{ $t('message.save')}} </CButton>
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
  name: 'CreateSupplier',
  data: function () {
    return {
      supplier: {},
      errors: []
    }
  },
  methods: {
    createSupplier: function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.supplier.name)
      formData.append('email', this.supplier.email)
      formData.append('phone', this.supplier.phone)
      this.postRequest(formData, this.$hostUrl + 'suppliers', '/suppliers')
       
    }
  }
}

</script>

