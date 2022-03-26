import bookPreview from '../../book/cmps/book-preview.cmp.js';

export default {
  props: ['books'],
  template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book = "book" @click.native = "openBookDetails(book.id)"/>
        </router-link>
            </li>
        </ul>
    `,
  methods: {
    openBookDetails(bookId) {
      this.$router.push('/book/' + bookId);
    },
  },
  components: {
    bookPreview,
  },
};
