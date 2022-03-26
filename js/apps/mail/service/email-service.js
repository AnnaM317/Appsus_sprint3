import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const EMAILS_KEY = 'emails';
const loggedUser = {
  email: 'user@appsus.com',
  fullName: 'Anna',
};
_createEmails();

export const emailService = {
  query,
  getById,
  removeEmail,
  updateEmail,
  sendEmail,
  getEmptyEmail,
};

function updateEmail(email) {
  return storageService.put(EMAILS_KEY, email);
}

function removeEmail(emailId) {
  return getById(emailId).then((email) => {
    if (email.isDeleted) {
      email.folder = 'trash';
      console.log('deleted', email);
      return storageService.remove(EMAILS_KEY, emailId);
    } else {
      email.isDeleted = true;
      console.log('trashed', email);
      return storageService.put(EMAILS_KEY, email);
    }
  });
}

function query() {
  return storageService.query(EMAILS_KEY).then((emails) => emails.reverse());
}

function getById(emailId) {
  return storageService.get(EMAILS_KEY, emailId);
}

function sendEmail(email) {
  email.from = loggedUser.fullName;
  email.fromEmail = loggedUser.email;
  email.isRead = false;
  email.isStarred = false;
  email.isDeleted = false;
  email.sentAt = Date.now();
  return storageService.post(EMAILS_KEY, email);
}

function getEmptyEmail() {
  return {
    subject: '',
    body: '',
    sentAt: Date.now(),
    from: '',
    fromEmail: '',
    to: '',
    isRead: false,
    isStarred: false,
    isDeleted: false,
    isSent: false,
    folder: 'inbox',
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: utilService.makeId(4),
        subject: 'New messages from Matan Crispel - Coding Academy and Guy Zohar',
        body: 'You have a new mention in Coding Academy - Sep 21 (codingacademy-sep21.slack.com)',
        // isRead: false,
        sentAt: new Date(2021, 11, 31),
        from: 'Slack',
        fromEmail: 'slack@gmail.com',
        to: loggedUser.fullName,
        isRead: true,
        isStarred: false,
        isDeleted: false,
        isSent: false,
        folder: 'inbox',
      },
      {
        id: utilService.makeId(4),
        subject: 'Update your subscription',
        body: `
        We've added more to GrabMart since your last order
        It's been awhile since we last had a chance to serve you. So in case you didn't know, GrabMart now has even more goods and categories to choose from. From household detergent to diapers to shampoo, you can rely on us for any everyday need.`,
        // isRead: false,
        sentAt: new Date(2021, 11, 22),
        from: 'Grab',
        fromEmail: 'grab@gmail.com',
        to: loggedUser.fullName,
        isRead: false,
        isStarred: true,
        isDeleted: false,
        isSent: false,
        folder: 'inbox',
      },
      {
        id: utilService.makeId(4),
        subject: 'Hello',
        body: "Hello, it's me, I was wondering if after all these years you'd like to meet, to go over everything, they say that time's supposed to heal ya, but I ain't done much healing",
        // isRead: false,
        sentAt: new Date(2021, 6, 12),
        from: loggedUser.fullName,
        fromEmail: loggedUser.email,
        to: 'Bolly',
        isRead: false,
        isStarred: false,
        isDeleted: false,
        isSent: true,
        folder: 'sent',
      },
      {
        id: utilService.makeId(4),
        subject: 'Welcome to Git-Guardian!',
        body: `Thank you for trusting GitGuardian! We are now able to secure the repositories you grant us access to.
                As shown below, you are currently under our free tier for developers and Open Source. Additionally, you can start a 30-day trial of our Business plan, at any time, to secure your private collaborative repositories.`,
        // isRead: false,
        sentAt: new Date(2021, 7, 31),
        from: 'GitGuardian',
        fromEmail: 'gitGuard@gmail.com',
        to: loggedUser.fullName,
        isRead: true,
        isStarred: true,
        isDeleted: false,
        isSent: false,
        folder: 'inbox',
      },
      {
        id: utilService.makeId(4),
        subject: 'Your Dropbox is lonely. Add some files!',
        body: `Add files to your Dropbox.
                Once your files are in Dropbox, they’ll be waiting for you anywhere you install the app—like your computer, phone, or tablet. Your files will also be securely backed up and easy to share, no matter what type of files they are.`,
        // isRead: false,
        sentAt: new Date(2021, 9, 2),
        from: 'Dropbox',
        fromEmail: 'dropbox@gmail.com',
        to: loggedUser.fullName,
        isRead: false,
        isStarred: false,
        isDeleted: false,
        isSent: false,

        folder: 'inbox',
      },
      {
        id: utilService.makeId(4),
        subject: 'Your colonoscopy results',
        body: 'Here are the test results of a medical exam you did on Thursday, please be informed that these are not the final results',
        // isRead: false,
        sentAt: new Date(2021, 1, 17),
        from: 'ColClinic',
        fromEmail: 'colon@gmail.com',
        to: loggedUser.fullName,
        isRead: false,
        isStarred: false,
        isDeleted: false,
        isSent: false,
        folder: 'inbox',
      },
      {
        id: utilService.makeId(4),
        subject: 'Hi Anna',
        body: "We noticed you're having trouble logging into your account. If you need help, click the button below and we'll log you in.",
        // isRead: false,
        sentAt: new Date(2021, 8, 7),
        from: 'Facebook',
        fromEmail: 'facebook@gmail.com',
        to: loggedUser.fullName,
        isRead: false,
        isStarred: false,
        isDeleted: false,
        isSent: false,

        folder: 'inbox',
      },
      {
        id: utilService.makeId(4),
        subject: 'Hello',
        body: `Annie, are you okay?
        Will you tell us that you're okay?
        There's a sound at the window
        Then he struck you, a crescendo Annie
        He came into your apartment
        He left the bloodstains on the carpet
        And then you ran into the bedroom
        You were struck down
        It was your doom`,
        // isRead: false,
        sentAt: new Date(2021, 12, 10),
        from: 'Michael',
        fromEmail: 'michael@gmail.com',
        to: loggedUser.fullName,
        isRead: false,
        isStarred: true,
        isDeleted: false,
        isSent: false,
        folder: 'inbox',
      },
    ];
    utilService.saveToStorage(EMAILS_KEY, emails);
  }
}
