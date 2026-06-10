<template>
     <div>
            <SearchBox @onSearchResult="onSearchResult" @onReload="onReload">
                <template #formItem>
                    <div class="item">
                        <label>기간조회</label>
                        <div class="input">
                            <div class="dv"><DatePicker ref="datepicker" :dayOpionType=state.dayOpionType  @selectDay ="selectDay" :optionsType="true"/></div>
                        </div>
                    </div>
                    
                    <div class="ui-data-filter-more">
                        <div class="item">
                            <label>전문ID</label>
                            <div class="input">
                                <div class="dv"><input type="text" class="form-control" placeholder="전문 ID를 검색 하세요" style="width:200px;background:#fff"/></div>
                            </div>
                        </div>
                        <div class="item">
                            <label>결과코드</label>
                            <div class="input">
                                <div class="dv"><input type="text" class="form-control" placeholder="결과코드를 검색 하세요" style="width:200px;background:#fff"/></div>
                            </div>
                        </div>
                        <div class="item" >
                            <label>등록자</label>
                            <div class="input">
                                <div class="dv">
                                    <select class="custom-select" style="width:360px;" placeholder="등록자를 선택 하세요" v-model="state.groupname">
                                        <option value="" disabled>등록자를 선택 하세요</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </SearchBox>
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
              theme="legacy"
              :rowData="rowData"
              :columnDefs="columnDefs"
              :defaultColDef="defaultColDef"
              domLayout="autoHeight"
            />
          </div>
          <!-- 페이징 컴포넌트 -->
          <PageNavigation :cntPerPage='pager.size' :itemCount='pager.totalCnt' :currentPage="pager.current"  @changedPage="onChangedPage" />
          </div>
        </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

import { RouterView } from 'vue-router';
import {useCommFunc} from '@/_setting/helper';
const { goToPage } = useCommFunc();

const currendidx = ref(0)

const columnDefs = ref([
    { field: 'num', valueGetter: 'node.rowIndex + 1'},
  { field: '시작일', },
  { field: 'model',  },
  { field: 'price',  },
    {  field: 'button', flex: 1,
    cellRenderer: (params:any) => {
        const tagString = `<div id="prname-${params.node.rowIndex}"><a href="javascript:void(0)" class="link">링크</a></div>`;
        const tagTarget = document.createElement('div');
        tagTarget.innerHTML = tagString;
        const buttonEventTarget = tagTarget.querySelector(`#prname-${params.node.rowIndex}`);
        if (buttonEventTarget) {
            buttonEventTarget.addEventListener('click', () => {
                goToPage(`/builddetail?viewId=${params.node.rowIndex}`);
            });
        }
        return tagTarget;
    }
        },
])

const rowData = ref([
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 }
])

const defaultColDef = {
  resizable: true,
}

const state = reactive({
  pagesize: 20,
})
const pager:any = reactive({
    current: 1,
    currentPageSize: 0,
    size: state.pagesize,
    offset: computed(() => (pager.current - 1) * pager.size),
    totalCnt: 0
});
const onChangedPage = (num: number) => {
    pager.current = num;
    //테이블 인덱스 번호 처리
    columnDefs.value[1].valueGetter = 'node.rowIndex + ' + (pager.size * (pager.current - 1) + 1);
    //api호출
};
</script>