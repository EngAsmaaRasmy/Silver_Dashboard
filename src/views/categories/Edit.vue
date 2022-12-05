
<template>
<CRow>
  <CCol col="12" xl="12">
       <CCard class="cards">
      <form id="UpdateCategory" @submit.prevent="UpdateCategory" >
        <CCardHeader>
            <CCol col="6" style="font-size: 25px">{{ $t('message.update_category') }}</CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <CInput :label=" $t('message.name')"
                id="name"
                v-model="category.name"
                class="required"
                :placeholder="  $t('message.name') "
                :invalidFeedback="errors.name"
                required
              />
            </CCol>
            <CCol sm="6">
              <CInput :label=" $t('message.name_ar')"
                id="name_ar"
                v-model="category.name_ar"
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
                  class="required"
                  :placeholder=" $t('message.description') "
                  :invalidFeedback="errors.description"
                  required
                ></CTextarea>
              </CCol>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description_ar')"
                  id="description_ar"
                  v-model="category.description_ar"
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
            <CButton type="button" size="sm" color="warning" @click="goBack">
            <CIcon name="cil-ban"/> {{ $t('message.back') }} </CButton>
          </CCardFooter>
          </form>
        </CCard>
    </CCol>
</CRow>
</template>

<script>
export default {
  name: 'EditCategory',
  data () {
    return {
      category: [],
      errors: []
    }
  },
  created () {
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/categories/${this.$route.params.id}`)
      .then((response) => {
        this.category = response.data.data.category
      })
  },
  methods: {
    async UpdateCategory () {
      const formData = new FormData()
      formData.append('name', this.category.name)
      formData.append('name_ar', this.category.name_ar)
      formData.append('description', this.category.description)
      formData.append('description_ar', this.category.description_ar)
      formData.append('_method', 'PUT')

      this.errors = await this.postRequest(formData, `${this.$hostUrl}admin-dashboard/categories/${this.$route.params.id}`, '/categories')
    },
    goBack () {
      this.productsOpened ? this.$router.go(-1) : this.$router.push({ path: '/categories' })
    }
  }
}
</script>
