
<template>
  <CRow>
    <CCol col="12" xl="12">
         <CCard class="cards">
        <CCardHeader>
          <CRow>
            <CCol style="font-size: 25px;" col="6">
             {{$t('message.distributors_reports')}}
             <br/>
              <small>{{$t('message.fromDate') + ': ' + fromDate + ' - ' + $t('message.toDate') + ': ' + toDate}}</small>
            </CCol>
        </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="row">
            <div class="col-md-4">
              <CFormText>
                  {{$t('message.fromDate')}}
                </CFormText>
                 <input
                  id="name"
                  v-model="fromDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  type="date"
                  class="filter"
                  :placeholder="$t('message.fromDate')"
                />
            </div>
            <div class="col-md-4">
              <CFormText>
                  {{$t('message.toDate')}}
                </CFormText>
                 <input
                  id="name"
                  v-model="toDate"
                  pattern="\d{4}-\d{2}-\d{2}"
                  type="date"
                  class="filter"
                  :placeholder=" $t('message.toDate')"
                />
            </div>
            <div class="col-md-2">
              <CButton square color="warning" v-on:click="filter" class="sub">
                    <CIcon class="c-icon" name="cil-chevron-top" /> &emsp;  {{$t('message.filter')}}
                </CButton>
            </div>
          </div>
          <hr/> 
          <!-- Using the VdtnetTable component -->
          <vdtnet-table
            ref="table"
            :fields="fields"
            :opts="options"
           
          >
          </vdtnet-table>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import VdtnetTable from '../VdtnetTable.vue'

const date = new Date()
let fromDate = (date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear());
let toDate = (date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear());
export default {
  name: 'DistriputorReports',
  components: { VdtnetTable},
  data () {
    return {
      fromDate: fromDate,
      toDate: toDate,
      options: {
        ajax: {
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              'Authorization',
              'Bearer ' + localStorage.token
            )
          },
          url: this.$hostUrl + 'admin-dashboard/report/distributors',
           data: function (d) {
            d.start_date = fromDate;
            d.end_date = toDate;
          },
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
            titleAttr: '????????',
            className: 'fa fa-table btn-success',
            exportOptions: {
              columns: 'th:not(:last-child)'
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
        id: {
          label: this.$t('message.id'),
          sortable: true,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        customerName: {
          label: this.$t('message.customer'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
         productName : {
          label: this.$t('message.product'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        price : {
          label: this.$t('message.price'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        quantity : {
          label: this.$t('message.quantity'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
         commission : {
          label: this.$t('message.commission'),
          sortable: false,
          searchable: true,
          defaultOrder: 'SORT_ASC '
        },
        // created_at: {
        //   label: this.$t('message.date'),
        //   sortable: false,
        //   searchable: true,
        //   defaultOrder: 'SORT_ASC '
        // }
      },
      quickSearch: '',
      details: {},
      startDate : null,
      endDate : null,
    }
  },
  methods: {
    doLoadTable (cb) {
      this.$http.getJSON(
        this.$hostUrl + 'admin-dashboard/report/distributors',
        function (data) {
          cb(data.data[0].original)
        }
      )
    },
    filter ($event) {
      console.log($event)
      fromDate = this.fromDate
      toDate = this.toDate
      const table = this.$refs.table;
      table.reload();
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
<style scoped>
.sub {
  border-color: #347A1E !important ;
  border-radius: 30px;
  color: #fff !important;
  font-size: 20px !important;
  padding: 5px 30px !important;
}
</style>
