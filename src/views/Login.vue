<template>
  <div class='c-app flex-row align-items-center'>
    <CContainer>
      <CRow class='justify-content-center'>
        <CCol md='8'>
          <CCardGroup>
            <CCard class='p-4'>
              <CCardBody>
                <CForm @submit.prevent='UserLogin' class="col-md-12">
                  <h1> {{ $t('message.login')}}</h1>
                  <p class='text-muted'>  {{ $t('message.login_to_account')}} </p>
                  <CInput 
                  :placeholder="$t('message.email')"
                  v-model='user.email' >
                    <template #prepend-content
                      ><CIcon name='cil-user'
                    /></template>
                  </CInput>
                  <CInput
                    :placeholder="$t('message.password')"
                    type='password'
                    v-model='user.password'
                  >
                    <template #prepend-content
                      ><CIcon name='cil-lock-locked'
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col='6' class='text-left'>
                      <CButton color='primary' type='submit' class='px-4'> {{ $t('message.login')}}
                        </CButton>
                    </CCol>
                  </CRow>
                </CForm> 
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'Login',
  data () {
    return {
      user: [],
      permissions: []
    }
  },
  methods: {
    UserLogin: function () {
      const formData = new FormData()
      formData.append('email', this.user.email)
      formData.append('password', this.user.password)
      this.$http.post(`${this.$hostUrl}admin-dashboard/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then((response) => {
          if (!response.data.error) {
            localStorage.token = response.data.data.token
            this.$router.push({ path: 'dashboard' })
          } else {
            swal({ title: response.data.message, buttons: this.$t('message.done') })
          }
        })
        .catch(function (error) {
            if (Object.prototype.hasOwnProperty.call(error, 'response')) {
              const data = (error.response || {}).data
              if (data.error) {
                swal({ title: data.message, buttons: this.$t('message.done') })
              } else {
                swal({
                  title: this.$t('message.wrong'),
                  buttons: this.$t('message.done')
                })
              }
            } else {
              swal({
                  title: this.$t('message.wrong'),
                  buttons: this.$t('message.done')
              })
            }
        })
    }
  }
}
</script>
<style scoped>
.login {
  background-color: #2a3647 !important;
  color: #fff;

}
.login:hover {
  background-color: #354728  !important;
}
</style>
