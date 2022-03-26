export default {
  template: `
        <div class="book-filter">
            <input class="book-filter-search" @input="filter" v-model="filterBy.byName" type="text" placeholder="Search...">
            <input class="book-filter-from" @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="From Price..."/>
            <input class="book-filter-to" @input="filter" v-model.number="filterBy.toPrice" type="number" 
            placeholder="To Price..."/>
        </div>
    `,
  data() {
    return {
      filterBy: {
        byName: '',
        fromPrice: '',
        toPrice: Infinity,
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filtered', { ...this.filterBy });
    },
  },
};
