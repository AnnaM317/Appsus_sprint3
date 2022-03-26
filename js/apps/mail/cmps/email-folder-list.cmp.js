export default {
  name: 'email-folder-list',
  props: ['emails', 'show'],
  template: `
        <section class="side email-folders-container">
            <button class="compose-btn" @click="composeEmail"><img src="imgs/compose.png"/><p>Compose</p></button>
            <div v-show="show" class="email-folders">    
                <div class="inbox-folder" @click= "openFolder('inbox')" :class="{styleFolder: this.currFolder==='inbox'}">
                    <span> <i class="fas fa-inbox"></i> </span> 
                    Inbox
                </div>
                <div class="starred-folder" @click= "openFolder('starred')" :class="{styleFolder: this.currFolder==='starred'}">
                    <span> <i class="fas fa-star"></i> </span>
                    Starred
                </div>
                <div class="sent-folder" @click= "openFolder('sent')" :class="{styleFolder: this.currFolder==='sent'}">
                    <span> <i class="fas fa-share-square"></i> </span>
                    Sent
                </div>
                <div class="drafts-folder" @click= "openFolder('drafts')" :class="{styleFolder: this.currFolder==='drafts'}">
                    <span> <i class="fab fa-firstdraft"></i> </span>
                    Drafts
                </div>
                <div class="trash-folder" @click= "openFolder('trash')" :class="{styleFolder: this.currFolder==='trash'}">
                    <span> <i class="fas fa-trash"></i> </span>
                    Trash
                </div>
            </div>
           
      
        </section>
    `,
  data() {
    return {
      currFolder: 'inbox',
      unreadEmails: 0,
    };
  },
  methods: {
    openFolder(folder) {
      this.currFolder = folder;
      this.$emit('folderUpdate', folder);
    },
    composeEmail() {
      this.$emit('compose');
      // this.$router.push('compose');
    },
  },
  computed: {
    // emailsUnread() {
    //     let emailsUnread = this.emails.filter(email => !email.isRead)
    //     this.unreadEmails = emailsUnread.length;
    //     return this.unreadEmails;
    // },
  },
};
