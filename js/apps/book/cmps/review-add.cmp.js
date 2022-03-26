export default {
  props: ['book'],
  template: `
        <section class="review-add" v-if="book">
            <fieldset>
                <legend>
            <button class="book-add-btn" @click="toggleAddReview"> {{(this.reviewToggle) ? 'Cancel' : 'Add a review'}} </button></legend>
            <form class="form-review" v-if= "reviewToggle" @submit.prevent="save" >
                <label> Full Name: <input ref="input" id="fullName" v-model="bookReview.fName" type="text" placeholder="Your name..."> </label>
                <div class="stars">
                    <span v-for="num in 5" class="fa fa-star" :class="{checked:num <= bookReview.rate}" @click="changeColor(num)"></span>
                </div>
                <label> Read At: <input type="date" v-model="bookReview.readAt"></label>
                <label> <textarea class="form-review-textarea" v-model.trim="bookReview.text" placeholder="Add Free Text..."> </textarea> </label>
                <button class="book-submit-btn btn">Submit Review</button>
            </form>
</fieldset>
        </section>
    `,

  data() {
    return {
      bookReview: {
        fName: 'Books Reader',
        rate: 3,
        readAt: new Date().toDateString(),
        text: '',
      },
      reviewToggle: false,
    };
  },
  mounted() {},
  created() {
    this.bookReview.readAt = this.currDate;
  },
  methods: {
    resetReview() {
      this.bookReview = {
        text: '',
        fullName: '',
        readAt: new Date().toDateString(),
        rate: 3,
      };
    },

    save() {
      this.$emit('saveReview', this.bookReview);
      this.resetReview();
      this.toggleAddReview();
    },
    changeColor(num) {
      this.bookReview.rate = num;
      console.log('hello', num);
    },

    toggleAddReview() {
      this.reviewToggle = !this.reviewToggle;
    },
  },
  computed: {
    currDate() {
      const date = new Date();
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
  },
};
