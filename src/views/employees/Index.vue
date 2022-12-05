
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
                {{$t('message.employees')}}
                 <CButton type="button" @click="showModal=true"  class="p-2 mx-2"  square color="primary">
                              + {{ $t('message.create_cachout')}}
                 </CButton>
                      <Modal v-model="showModal">
                       <NewCashout />
                          </Modal>
            </CCol>
             <CCol col="6"  class="cardButton">
                <CButton  to="/employees/create" class="p-2 px-4"  square color="primary">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;  {{$t('message.create_employee')}}  
                </CButton>
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
            @edit="doAlertEdit"
            @show="doAlertShow"
            @delete="doAlertDelete"
            @reloaded="doAfterReload"
            @table-creating="doCreating"
            @table-created="doCreated"
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import swal from 'sweetalert'
import VdtnetTable from '../VdtnetTable.vue'
import NewCashout from '@/components/NewCashout.vue'
import jquery from 'jquery'
export default {
  name: 'employees',
  components: { VdtnetTable,
  NewCashout
   },
  data () {
    return {
      showModal: false,
      options: {
        ajax: {
          // beforeSend: function (xhr) {
          //   xhr.setRequestHeader(
          //     'Authorization',
          //     'Bearer ' + localStorage.token
          //   )
          // },
          url: 'http://178.79.181.70:8003/api/employees',
          dataSrc: (json) => {
            return json.data
          }
        },
        buttons: [
          {
            extend: 'print',
            text: this.$t('message.print'),
            titleAttr: '',
            className: 'print',
            exportOptions: {
              columns: 'th:not(:last-child)'
            }
          },
          {
            extend: 'copy',
            text: this.$t('message.copy'),
            className: 'copy',
            titleAttr: ''
          },
          {
            extend: 'excel',
            text: '',
            titleAttr: 'إكسل',
            className: 'fa fa-table btn-success',
            exportOptions: {
              columns: ':visible(:not(.not-export-col))'
            }
          }
        ],
        dom:
          "<'row'<'col-sm-6 col-md-6'f><'col-sm-6 col-md-6 added'l>>" +
          "<'row'<'col-sm-12'Btr>>" +
          "<'row'<'col-sm-12 col-md-5'p><'col-sm-12 col-md-7'i>>",
        paging: true,
        language: {
          url: this.$t('message.url')
        },
        responsive: false,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: false,
        fixedHeader: true,
        saveState: true,
        select: {
          style: 'multi'
        }
      },
      fields: {
        name: {
          label: this.$t('message.data_name'),
          sortable: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        email: {
          label: this.$t('message.employee_email'),
          sortable: false,
          searchable: true,
          defaultContent: 'null',
             defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label: this.$t('message.date'),
          sortable: false,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        actions: {
          isLocal: true,
          label: this.$t('message.operation'),
          defaultContent: '<button href="javascript:void(0);" data-action="show" class="btn btn-info btn-sm" title="عرض الطلب"><i class="mdi mdi-square-show-outline"></i>' + this.$t('message.show') + ' </button>' +
            '&ensp;<button href="javascript:void(0);" data-action="edit" class="btn btn-dark btn-sm"><i class="mdi mdi-square-edit-outline"></i>' + this.$t('message.update') + ' </button>' +
          '&ensp;<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete" @click="swal"></i>' + this.$t('message.delete') + ' </span>'
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON( 'http://178.79.181.70:8003/api/employees',
        function (data) {
          cb(data.data)
        }
      )
    },
    doAlertShow (data) {
      this.$router.push({ path: `employees/${data.id}/show`, params: { id: data.id } })
    },
    doAlertEdit (data) {
      this.$router.push({
        path: `/employees/${data.id}/edit`,
        params: { id: data.id }
      })
    },
    doAlertDelete (data, row, tr, target) {
      console.log(`deleting item ID: ${data.id}`)

      swal({
        title: 'هل انت متأكد ؟',
        text: 'بمجرد الحذف ، لن تتمكن من استرداد هذا العنصر !',
        icon: 'warning',
        buttons: ['لا', 'نعم'],
        dangerMode: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((willDelete) => {
        if (willDelete) {
          this.$http
            .delete(
              `${this.$hostUrl}employees/${data.id}`,
              { _method: 'delete' }
            )
            .then((response) => {
              console.log(response)
              localStorage.customers = Number(localStorage.employees) - 1
              jquery('#customers_badge').text(localStorage.employees)
              swal({ title: response.data.message, buttons: 'تم' })
            })
          tr.remove()
          const table = this.$refs.table
          setTimeout(() => {
            table.reload()
          }, 1500)
        } else {
          swal({ title: ' تم الغاء الحذف !', buttons: 'تم' })
        }
      })
    },
    doAfterReload (data, table) {
      console.log('data reloaded')
    },
    doCreating (comp, el) {
      console.log('creating')
    },
    doCreated (comp) {
      console.log('created')
    },
    doSearch () {
      this.$refs.table.search(this.quickSearch)
    },
    doExport (type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
    },
    formatCode (zipcode) {
      return zipcode.split('-')[0]
    }
  }
}
</script>
