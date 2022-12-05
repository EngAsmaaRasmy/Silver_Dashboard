
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
                أنواع المدفوعات
            </CCol>
             <CCol col="6" style="text-align: left;" class="cardButton">
                <CButton  to="/cities/create"  square color="primary">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;  إضافة مدينة جديدة
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
import jquery from 'jquery'
export default {
  name: 'cities',
  components: { VdtnetTable },
  data () {
    return {
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'cities',
          dataSrc: (json) => {
            return json.data
          }
        },
        buttons: [
          {
            extend: 'print',
            text: '',
            titleAttr:  $t('print'),
            className: 'fa fa-print btn-primary'
          },
          {
            extend: 'copy',
            text: '',
            className: 'fa fa-copy btn-warning',
            titleAttr:  $t('copy')
          },
          {
            extend: 'excel',
            text: '',
            titleAttr: 'إكسل',
            className: 'fa fa-table btn-success',
            exportOptions: {
              columns: 'th:not(:last-child)'
            }
          }
        ],
        dom:
          "<'row'><'col-sm-6 col-md-6'f><'col-sm-6 col-md-6 added'l>" +
          "<'row'><'col-sm-12'Btr>" +
          "<'row'><'col-sm-12 col-md-5'p><'col-sm-12 col-md-7'i>",
        paging: true,
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.24/i18n/Arabic.json'
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
          label: 'إسم المدينة',
          sortable: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        created_at: {
          label:  $t('date'),
          sortable: true,
          searchable: true,
             defaultOrder: 'SORT_ASC '
        },
        actions: {
          isLocal: true,
          label:  $t('operation'),
          defaultContent: '<a href="javascript:void(0);" data-action="show" class="btn btn-info btn-sm" title="عرض المدينة"><i class="mdi mdi-square-show-outline"></i> عرض</button>' +
            '&ensp;<a href="javascript:void(0);" data-action="edit" class="btn btn-dark btn-sm"><i class="mdi mdi-square-edit-outline"></i> تعديل</a>' +
            '&ensp;<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete" @click="swal"></i> حذف</span>'
        }
      },
      quickSearch: '',
      details: {}
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'cities',
        function (data) {
          cb(data.data)
        }
      )
    },
    doAlertShow (data) {
      this.$router.push({ path: `cities/${data.id}/show`, params: { id: data.id } })
    },
    doAlertEdit (data) {
      this.$router.push({
        path: `cities/${data.id}/edit`,
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
              `${this.$hostUrl}cities/${data.id}`,
              { _method: 'delete' }
            )
            .then((response) => {
              console.log(response)
              localStorage.cities = Number(localStorage.cities) - 1
              jquery('#cities_badge').text(localStorage.cities)
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
