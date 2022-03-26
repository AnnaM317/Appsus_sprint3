export default {
  name: 'email-filter',
  template: `
        <div class="email-filter">

            <input class="input-search" @input="filter" v-model="filterBy.text" type="text" placeholder="Search..." />
            <select class="filter-select" v-model="filterBy.emailStatus" @change="filter" >
                   <option value="" selected>All</option>
                   <option value="read">Read</option>
                   <option value="unread">Unread</option>
             </select>
        </div>
    `,
  data() {
    return {
      filterBy: {
        text: '',
        emailStatus: '',
      },
      openNav: false,
    };
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy });
    },
    // sort(){
    //     this.$emit('sorted', this.sortBy);
    // }
  },
  components: {},
};
