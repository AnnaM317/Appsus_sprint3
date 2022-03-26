import longText from '../../book/cmps/long-text.cmp.js';
import reviewAdd from '../../book/cmps/review-add.cmp.js';
import { bookService } from '../../book/service/book-service.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
        <section v-if="book" class="book-details app-main">
            <div class="book-details-content">
            <h2 class="book-title">{{book.title}}</h2>
            <p :class="priceClassStyle" >Price: {{ formatCurrency}}</p>
            <p class = "sale">{{bookOnSale}}</p>
            <div class="book-categories-container">
                <span v-for="category in book.categories" :key="category.id"> {{ category }} </span>
            </div>
            <img  v-bind:src="book.thumbnail"/>
            <p v-for="author in book.authors" :key="author.id"> by {{author}} </p>
            <p> Published  at: {{book.publishedDate}} {{publishedDateString}}</p>
            <long-text v-bind:txt="book.description"></long-text>
            <p>Page Count: {{book.pageCount}} {{pageCountString}}</p>
            
            <p>Language: {{book.language}}</p>
            <review-add :book="book"  @saveReview="addReview" > </review-add>
            <hr/>
           
            <div class="reviews">
            <fieldset>
                 <legend>Reviews</legend>
                <ul class="clean-list">
                    <li v-for="(review, idx) in book.reviews">
                        <button @click="removeReview(idx)" title="Delete_Review">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <p>Review by: {{review.fName}}, {{review.rate}} stars</p>
                        <p>Read at: {{review.readAt}} </p>
                        <p>Review - {{review.text}} </p>
                    </li>
                </ul>
            </fieldset>
            </div>
            <button class="close-details-btn btn" @click="close" >X</button>
            <div class="page-btns-container">
                <button class="prev-btn"><router-link :to ="'/book/'+prevBookId">Prev Book</router-link></button>
                <button class="next-btn"><router-link :to ="'/book/'+nextBookId">Next Book</router-link></button>
            </div>
            </div>
        </section>

        <section v-else class="loader app-main">
            <h2>Loading...</h2>
        </section>
    `,
  data() {
    return {
      book: null,
      nextBookId: null,
      prevBookId: null,
    };
  },
  created() {
    const { bookId } = this.$route.params;
    bookService.getById(bookId).then((book) => (this.book = book));
  },
  methods: {
    addReview(review) {
      bookService
        .addReview(this.book.id, review)
        .then((book) => (this.book = book))
        .then(() => {
          const msg = {
            txt: `The review on book: ${this.book.title}  was Added!`,
            type: 'success',
          };
          eventBus.$emit('showMsg', msg);
        })
        .catch((err) => {
          console.log('err', err);
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          };
          eventBus.$emit('showMsg', msg);
        });
    },
    removeReview(idx) {
      this.book.reviews.splice(idx, 1);
      bookService
        .removeReview(this.book.id, idx)
        .then(() => {
          const msg = {
            txt: `Review was removed`,
            type: 'success',
          };
          eventBus.$emit('showMsg', msg);
        })
        .catch((err) => {
          console.log('err', err);
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          };
          eventBus.$emit('showMsg', msg);
        });
    },
    close() {
      this.$router.push('/book');
    },
  },

  computed: {
    bookOnSale() {
      var isOnSale = this.book.listPrice.isOnSale;
      if (isOnSale) {
        return 'sale!';
      } else {
        return '';
      }
    },

    pageCountString() {
      var pageCount = this.book.pageCount;
      if (pageCount > 500) return 'long reading';
      else if (pageCount > 200) return 'Decent Reading';
      else if (pageCount < 100) return 'Light Reading';
    },

    publishedDateString() {
      if (new Date().getFullYear() - this.book.publishedDate >= 10) return '(Veteran Book)';
      else if (new Date().getFullYear() - this.book.publishedDate <= 1) return '(New)';
    },

    priceClassStyle() {
      if (this.book.listPrice.amount > 150) {
        return 'red';
      } else if (this.book.listPrice.amount < 20) {
        return 'green';
      }
    },
    formatCurrency() {
      return new Intl.NumberFormat(this.book.language, {
        style: 'currency',
        currency: this.book.listPrice.currencyCode,
      }).format(this.book.listPrice.amount);
    },
  },
  watch: {
    '$route.params.bookId': {
      handler() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then((book) => {
          this.book = book;
          bookService.getPrevBookId(book.id).then((prevBookId) => (this.prevBookId = prevBookId));
          bookService.getNextBookId(book.id).then((nextBookId) => (this.nextBookId = nextBookId));
        });
      },
      immediate: true,
    },
  },
  components: {
    longText,
    reviewAdd,
  },
};
