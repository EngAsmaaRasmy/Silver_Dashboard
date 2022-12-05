<template>
  <div>
    <CRow>
      <CCol col="12">
           <CCard class="cards">
          <form id="createRole" @submit="createRole" >
          <CCardHeader>
            <CCol col="6" style="font-size: 25px;">{{ $t('message.create_role')}}  </CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6">
                <CInput label="  Name"
                  id="name"
                  v-model="role.name"
                  type="text"
                  class="required"
                  :placeholder="$t('message.name')"
                  :invalidFeedback="errors.name"
                  required
                />
              </CCol>
            </CRow>
             <CRow>
              <CCol sm="6">
               <ul>
                 <li v-for="per in permissions"  :key="per.id">
                  <input type="checkbox" :value="per.id" id="per.id" v-model="SelectedPermissions"
                    @change="check($event)"> {{per.name}}
                    </li>
                </ul>
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
          </form>/
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'createCity',
  data: function () {
    return {
      role: {},
      permissions: [],
      SelectedPermissions: [],
      errors: []
    }
  },
  created () {
    const permissions = []
    this.$http
      .get(`${process.env.VUE_APP_BACKEND_SERVER_2}permissions`,
        {
          headers: {
            'x-api-key': process.env.VUE_APP_MS_TOKEN
          }
        })
      .then((response) => {
        $.each(response.data.data, function (key, value) {
          permissions.push({ id: value.id, name: value.name })
        })
        this.permissions = permissions
      })
  },
  methods: {
    check: function (e) {
      console.log(this.SelectedPermissions)
    },
    async createRole (e) {
      e.preventDefault()
      const formData = new FormData()
      for (let i = 0; i < this.SelectedPermissions.length; i++) {
        if (this.SelectedPermissions) {
          formData.append('permissions.id', this.SelectedPermissions.id)
        } else {
          this.errors.push('permissions.id')
          this.errors.permissions.id = 'permissions field is required'
          return 0
        }
      }
      formData.append('name', this.role.name)
      const permissions = []
      $.each(this.SelectedPermissions, function (key, value) {
        permissions.push({ id: value })
      })
      formData.append('permissions', JSON.stringify(permissions))
      this.errors = await this.postRequest(formData, process.env.VUE_APP_BACKEND_SERVER_2 + 'roles', '/roles')
    }
  }
}

</script>
