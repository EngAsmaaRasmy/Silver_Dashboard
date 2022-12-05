<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createProduct" @submit="createProduct" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;"> {{ $t('message.create_product') }}</CCol>
          </CCardHeader>
          <CCardBody>
            <input name="user_id" id="user_id" type="hidden" value="1" v-model="product.user_id"/>
             <CRow>
              <CCol sm='6'>
                <div class='form-group'>
                    <label for='category'>
                      {{$t('message.category')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedCategory'
                        id='category_id'
                        :options='categories'
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
                      <!-- <div v-if(errors.category_id) class="invalid-feedback">
                        {{errors.category_id}}
                      </div> -->
                    </div>
                  </div>
              </CCol>
              <CCol sm='6'>
                <div class='form-group'>
                    <label for='supplier'>
                      {{$t('message.supplier')}}
                      <span class='star'>*</span>
                    </label>
                    <div>
                      <multiselect
                        class='required'
                        v-model='selectedSupplier'
                        id='supplier_id'
                        :options='suppliers'
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
                      <!-- <div v-if(errors.category_id) class="invalid-feedback">
                        {{errors.category_id}}
                      </div> -->
                    </div>
                  </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.name')"
                  id="name"
                  v-model="product.name"
                  class="required"
                  v-on:keypress="isLetter($event)"
                  :placeholder=" $t('message.name') "
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
              <CCol sm="6">
                <CInput :label=" $t('message.name_ar')"
                  id="name"
                  v-model="product.name_ar"
                  v-on:keypress="isLetter($event)"
                  class="required"
                 :placeholder=" $t('message.name_ar') "
                  :invalidFeedback="errors.name_ar"
                  required
                />
              </CCol>
            </CRow>
              <CRow>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description')"
                  id="description"
                  v-model="product.description"
                  :placeholder=" $t('message.description') "
                  :invalidFeedback="errors.description"
                ></CTextarea>
              </CCol>
              <CCol sm="6">
                <CTextarea :label=" $t('message.description_ar')"
                  id="description"
                  v-model="product.description_ar"
                 :placeholder=" $t('message.description_ar') "
                  :invalidFeedback="errors.description"
               ></CTextarea>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6">
                <CInput :label=" $t('message.price')"
                  id="price"
                  v-model="product.price"
                  class="required"
                  v-on:keypress="onlyNumbers($event)"
                  :placeholder=" $t('message.price') "
                  :invalidFeedback="errors.price"
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
  name: 'createProduct',
  data: function () {
    return {
      product: {},
      categories: [],
      selectedCategory: '',
      suppliers:[],
      selectedSupplier:'',
      errors: []
    }
  },
   created () {
    const categories = []
    this.$http
      .get(`${this.$hostUrl}admin-dashboard/categories`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          categories.push({ id: value.id, name: value.name })
        })
        this.categories = categories
      })
      const suppliers = []
    this.$http
      .get(`${this.$hostUrl}suppliers`)
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          suppliers.push({ id: value.id, name: value.name })
        })
        this.suppliers = suppliers
      })
  },
  methods: {
     isLetter (e) {
      const arabic = /[\u0600-\u06FF]/
      const char = String.fromCharCode(e.keyCode) // Get the character
      if (/^[A-Za-z]$/.test(char)) return true
      else if (arabic.test(char)) return true // Match with regex
      // else e.preventDefault() // If not match, don't add to input text
    },
     onlyNumbers (e) {
      const num = String.fromCharCode(e.keyCode) // Get the character
      if (/^[1-9]+[0-9]*\.?[0-9]{0,3}$/.test(char)) return true
      else if (num.test(char)) return true // Match with regex
      else e.preventDefault() // If not match, don't add to input text
    },
    createProduct:function (e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.product.name)
      formData.append('name_ar', this.product.name_ar)
      formData.append('description', this.product.description)
      formData.append('description_ar', this.product.description_ar)
         if (this.product.price > 0) {
        formData.append('price', this.product.price)
      } else {
        swal({title: this.$t('message.price_greate_zero')})
        $('#price').addClass('redborder')
        return 0
      }
      formData.append('category_id', this.selectedCategory.id)
      formData.append('supplier_id', this.selectedSupplier.id)
       formData.append('user_id',this.product.user_id)

       this.postRequest(formData, this.$hostUrl + 'products', '/products')
    }
  }
}

</script>
<style scoped>
.redborder{
  border-color:red !important
}
</style>
