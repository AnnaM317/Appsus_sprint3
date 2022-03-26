import { emailService } from '../service/email-service.js';

export default {
  name: 'email-preview',
  props: ['email'],
  template: `
    <section>
    <li @click="openSmallPreview" class="email-preview-container" :class="classIsRead">
            <button @click.stop="toggleStar">
                    <span class="stars" :class="classStar"></span>
            </button>
            <div class="from"> {{ email.from }} </div>
            <div class="subject"> {{ formattedSubjectText }} </div>
            <div class="body"> - {{ formattedBodyText }} ... </div>
            <div class="sent-at"> {{ formattedDate }} </div>
            <div class="email-buttons">
                <button @click.stop= "toggleRead"> <i :class="classStyleRead"></i> </button>
                <button @click= "deleteEmail(email.id)"> <i class="fas fa-trash"></i> </button>
            </div>
    </li>
    <li v-if="showEmail" class="email-small-preview-container" >
        <div class="small-preview">
             <h3 class="small-preview-subject"> {{ email.subject }} </h3>
             <div class=small-preview-buttons>
                <router-link :to="'email/' + email.id"> <i class="fas fa-expand"></i> </router-link>
                <button @click.stop="replyToEmail(email)" > <i class="fas fa-reply"></i> </button>
                <button @click.stop="saveAsNote(email)"> <i class="fas fa-paper-plane"></i> </button >
            </div >
         </div >
         <p class="small-preview-from"> {{ email.from }} <span> <{{ email.fromEmail }}> </span> </p>
         <p class="small-preview-body"> {{ email.body }} </p>
     </li>
</section>
    `,

  data() {
    return {
      showEmail: false,
      emailReply: null,
    };
  },

  computed: {
    formattedDate() {
      var dateObj = new Date();
      var date = this.email.sentAt;
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var newdate = day + '/' + month + '/' + year;
      // return new Date().toString().slice(4, 7) + ' ' + day; //month
      // return new Date().toString().slice(4, 7) + ' ' + day; //month
      return new Date(this.email.sentAt).toDateString().slice(4, 10)
    },
    formattedBodyText() {
      return this.email.body.slice(0, 100);
    },
    formattedSubjectText() {
      return this.email.subject;
    },
    classStyleRead() {
      if (this.email.isRead) return 'fas fa-envelope-open';
      else return 'fas fa-envelope';
    },
    classStar() {
      if (this.email.isStarred) return 'fas fa-star checked';
      else return 'far fa-star';
    },
    classIsRead() {
      if (this.email.isRead) return 'read';
      else return 'unread';
    },
  },

  methods: {
    toggleRead() {
      console.log('test');
      this.email.isRead = !this.email.isRead;
      emailService.updateEmail(this.email).then((email) => (this.email = email));
    },
    toggleStar() {
      console.log('test');
      this.email.isStarred = !this.email.isStarred;
      emailService.updateEmail(this.email).then((email) => (this.email = email));
    },
    deleteEmail(emailId) {
      this.$emit('remove', emailId);
    },
    openSmallPreview() {
      this.showEmail = !this.showEmail;
      if (!this.email.isRead) this.email.isRead = true;
      console.log(this.showEmail);
    },
    saveAsNote(email) {
      this.$emit('saveAsNote', email);
    },
    replyToEmail(email) {
      //            this.$router.push('/keep');
      // console.log('this.$route.path', this.$route.path)
      // console.log('this.$route.params', this.$route.params);
      // console.log('this.$router.history.current.query', this.$router.history.current.query);
      // // if (this.$route.path !== '/compose')
      // //     this.$router.push(`compose?from=${email.fromEmail}&subject=Re:${email.subject}&body=${email.body}`);

      // const { emailId } = this.$route.params;
      // emailService.getById(emailId)
      //     .then(email => {
      //         this.emailReply = email;
      //     })

      // const email = this.emailReply;
      this.emailReply = email;
      console.log('this.emailReply', this.emailReply);
      // this.$router.push(
      //   `compose?to=${this.emailReply.to}&subject=Re:${this.emailReply.subject}&body=${this.emailReply.body}`
      // );
      this.$router.push({ path: '/compose', query: { to: this.emailReply.to, subject: this.emailReply.subject, body: this.emailReply.body } })

    },
  },

  components: {},
};
