import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.config.productionTip = false;
Vue.use(Vuetify);

// <v-app> 루트 컴포넌트 그리고 테스트 컴포넌트로 대체될 요소(<div>) 생성
const app = '<div id="app" data-app="true"><div></div></div>';
document.body.innerHTML += app;