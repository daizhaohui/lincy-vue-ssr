import { Store } from 'vuex';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export interface Params {
  store: Store<any>
  router: RouteLocationNormalizedLoaded
}
