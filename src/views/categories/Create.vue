<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createCategory" @submit="createCategory" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.create_category') }}</CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="category.name"
                  v-on:keypress="isLetter($event)"
                  class="required"
                  :placeholder=" $t('message.name') "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.name_ar')"
                  id="name_ar"
                  v-model="category.name_ar"
                  v-on:keypress="isLetter($event)"
                  class="required"
                 :placeholder=" $t('message.name_ar') "
                  :invalidFeedback="errors.name_ar"
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description')"
                  id="description"
                  v-model="category.description"
                  v-on:keypress="isLetter($event)"
                  :placeholder=" $t('message.description') "
                  :invalidFeedback="errors.description"
                ></CTextarea>
              </CCol>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description_ar')"
                  id="description_ar"
                  v-model="category.description_ar"
                  v-on:keypress="isLetter($event)"
                 :placeholder=" $t('message.description_ar') "
                  :invalidFeedback="errors.description"
               ></CTextarea>
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
  name: 'createCategory',
  data: function () {
    return {
      category: {},
      errors: []
    }
  },
  methods: {
    isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      // else e.preventDefault() // If not match, don't add to input text
    },
    createCategory:function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.category.name)
      formData.append('name_ar', this.category.name_ar)
      formData.append('description', this.category.description)
      formData.append('description_ar', this.category.description_ar)

       this.postRequest(formData, this.$hostUrl + 'admin-dashboard/categories', '/categories')
    }
  }
}

</script>
