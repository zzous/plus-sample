<template>
  <div id="app">
    <HeaderLayout />

    <main id="adminContainer">
      <section class="contents">
        
        <div class="head-content">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#" target="_self" class="">홈</a>
                </li>
                <li class="breadcrumb-item">
                    <a href="#" target="_self" class="">변경신청의뢰</a>
                </li>
                <li class="breadcrumb-item active">
                    <span aria-current="location">변경신청서 작성</span>
                </li>
            </ol>
            <div class="ui-title-2">
                <h2>Title</h2>
            </div>
        </div>
        <div class="ui-step mt-20" >
          <ol class="ui-step-list">
            <li class="ui-step-item" v-for="(item, index) in stepBar" :key="index" :class="{current:index==currendidx}" @click="stepbar(index)"><strong>step {{ item.step }}</strong> {{ item.label }}</li>
          </ol>
        </div>

        <div class="mt-40">
          <formSample />

        </div>
        <div class="mt-40">
          <div class="tbl-wrap">
            <div class="table-util flex space-between" >
              <div class="btn-set-m flex" >
                <button type="button" class="btn btn-ss" @click="onRegister">저장</button>
                <button type="button" class="btn btn-ss" @click="onDelete">삭제</button>
              </div>
              <div class="btn-set-m flex align-end">
                <span class="table-total" >조회결과 총 <strong> {{rowData.length}} </strong>건</span>
                <button type="button" class="btn btn-opt" @click="onDownload">
                  <span class="ico-download"></span>파일다운로드
                </button>
                <select class="custom-select sm" >
                  <option value="20개">20개</option>
                    <option value="10개">10개</option>
                    <option value="20개">20개</option>
                    <option value="30개">30개</option>
                    <option value="40개">40개</option>
                </select>
              </div>
          </div>
          <div class="ag-theme-alpine">
            <AgGridVue
              :rowData="rowData"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              
              domLayout="autoHeight"
            />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import formSample from '@/sample/Form.vue'
ModuleRegistry.registerModules([AllCommunityModule])
const currendidx = ref(0)
const stepBar = ref([
  { step: 1, label: '개발/변경 실시' },
  { step: 2, label: '코드리뷰' },
  { step: 3, label: '개발확정 요청' },
  { step: 4, label: '개발확정 승인' },
  { step: 5, label: '사전점검' },
  { step: 6, label: '요구사항 맵핑 및 스테이징 배포' }
])
const columnDefs = ref([
  { field: '시작일', },
  { field: 'model',  },
  { field: 'price',  }
])

const rowData = ref([
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 }
])

const defaultColDef = {
  resizable: true,
}
const stepbar = (idx: number) => {
  currendidx.value = (currendidx.value + 1) % stepBar.value.length
}
</script>

