import { defineComponent } from 'vue';
import Header from './header';
import Footer from './footer';

export default defineComponent({
  components: {
    Header,
    Footer
  },
  props: ['fetchData'],
  setup () {

  }
});
