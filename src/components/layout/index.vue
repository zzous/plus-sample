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


       <ListPage />
      </section>
    </main>
    <ConfirmModal />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

import { RouterView } from 'vue-router';
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'
// import formSample from '@/sample/formSample.vue'
import ListPage from '@/sample/ListPage.vue'

const currendidx = ref(0)
const stepBar = ref([
  { step: 1, label: '개발/변경 실시' },
  { step: 2, label: '코드리뷰' },
  { step: 3, label: '개발확정 요청' },
  { step: 4, label: '개발확정 승인' },
  { step: 5, label: '사전점검' },
  { step: 6, label: '요구사항 맵핑 및 스테이징 배포' }
])
const stepbar = (idx: number) => {
  currendidx.value = (currendidx.value + 1) % stepBar.value.length
}
</script>
