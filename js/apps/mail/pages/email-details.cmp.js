import { emailService } from '../service/email-service.js';
import { eventBus } from '../../../services/event-bus-service.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';


export default {
    template: `
        <section v-if="email" class="email-details email-app app-main main-content"> 

        <email-folder-list/>
            <div class="email-content ">
            <email-filter/>

            <!-- <button @click="sayAndClose" >X</button> -->
            <!-- <button @click="sayAndClose"><router-link :to="/email/"><i class="fas fa-long-arrow-alt-left"></i></router-link></button>  -->
                 <div class="email-details">
                    <button class="details-back-btn" @click="sayAndClose"><i class="fas fa-long-arrow-alt-left"></i></button> 
                    <button class="details-delete-btn"><i class="fas fa-trash" @click="deleteEmail(email.id)"></i></button>
                    <h2 class="details-subject">{{email.subject}}</h2>
                    <div class="details-email-name">
                        <h4>{{email.from}} </h4>
                        <p> <{{email.fromEmail}}> </p>
                    </div>
                    <p class="details-body">{{email.body}}</p>
                </div>
            </div>

        </section>
    `,
    data() {
        return {
            email: null
        }
    },

    created() {
        this.loadEmail()
    },

    methods: {
        loadEmail() {
            const emailId = this.$route.params.emailId;
            console.log(this.$route.params.emailId);
            emailService.getById(emailId)
                .then(email => {
                    this.email = email;
                    console.log('email', this.email);

                })
        },

        sayAndClose() {
            console.log('Just saying');
            this.$router.push('/email');
            this.email = null;
        },
        deleteEmail(emailId) {
            emailService
                .removeEmail(emailId)
                .then(() => {
                    // this.emails = this.emails.filter((email) => email.id !== emailId);
                    // this.composeEmail = false;
                    const msg = {
                        txt: `Email was removed`,
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

            this.$router.push('/email');
        }

    },
    components: {
        emailFolderList,
        emailFilter,
    }
}

