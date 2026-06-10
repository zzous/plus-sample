import { AgGridVue } from 'ag-grid-vue3'
import DefaultModal from '@/components/modal/DefaultModal.vue'

import FormLine from '@/components/ui/FormLine.vue'

export const registerComponents = (app) => {
    app.component('DefaultModal', DefaultModal)
    app.component('AgGridVue', AgGridVue)
    app.component('FormLine', FormLine)
} 