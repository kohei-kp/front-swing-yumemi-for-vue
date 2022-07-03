import _Vue, { createApp } from 'vue';
import App from './App.vue';
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

const app = createApp(App);
// TODO: as anyではない解決方法。
// 今の知識では理解できていないので、as anyで逃げる。
app.use(HighchartsVue as any, { highcharts: Highcharts, tagName: 'highcharts' });
app.mount('#app');
