export default {
  name: 'app-header',
  template: `
    <header class="app-header">
      <div @click="$router.push('/')" class="header-logo flex item-center">
    <img src="imgs/icon.png">
    <h2>AppSus</h2>
</div >
    <nav class="dashboard" @click="toggleList">
      <img  src="imgs/dashboard.png">
      <div v-show="showList" class="naviagtion">
        <router-link  to="/"><i class="fas fa-home"></i></router-link>
        <router-link @click="showList = false" to="/book"><i class="fas fa-book"></i></router-link>
        <router-link @click="showList = false" to="/email"><i class="fas fa-envelope-square"></i></router-link>
        <router-link @click="showList = false" to="/keep"><i class="fas fa-sticky-note"></i></router-link>
      </div>
    </nav>
    </header>
    `,
  data() {
    return {
      showList: false,
    };
  },
  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
  },
};
