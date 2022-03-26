import { bookService } from '../../book/service/book-service.js';
import bookList from '../../book/cmps/book-list.cmp.js';
import bookFilter from '../../book/cmps/book-filter.cmp.js';
import bookAdd from '../../book/cmps/book-add.cmp.js';

export default {
  template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-add @addBook = "addBookToBooks"/>
           
            <book-list :books="booksToShow" />
        </section>
    `,
  data() {
    return {
      books: null,
      filterBy: null,
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    loadBooks() {
      bookService.query().then((books) => {
        console.log(books);
        this.books = books;
      });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    addBookToBooks(book) {
      this.books.push(book);
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;

      const searchStr = this.filterBy.byName.toLowerCase();
      const fromPrice = this.filterBy.fromPrice ? this.filterBy.fromPrice : 0;
      const toPrice = this.filterBy.toPrice ? this.filterBy.toPrice : Infinity;

      const booksToShow = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchStr) &&
          book.listPrice.amount >= fromPrice &&
          book.listPrice.amount <= toPrice
        );
      });

      return booksToShow;
    },
  },
  components: {
    bookList,
    bookFilter,
    bookAdd,
  },
};
