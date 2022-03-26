import emailPreview from '../cmps/email-preview.cmp.js';

export default {
  name: 'email-list',
  props: ['emails'],
  template: `
        <ul class="emails-list">
                <email-preview @remove="deleteEmail" @saveAsNote="saveEmailAsNote" v-for="email in emails" :key="email.id" :email = "email"/>
           
        </ul>
    `,
  methods: {
    deleteEmail(emailId) {
      this.$emit('removeEmail', emailId);
    },
    saveEmailAsNote(email) {
      this.$emit('sendEmailAsNote', email);
    },
  },
  components: {
    emailPreview,
  },
};
