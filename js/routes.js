import homePage from './pages/home-page.cmp.js';
import emailApp from '../js/apps/mail/pages/email-app.cmp.js';
import keepPage from './pages/keep-app.cmp.js';
import emailDetails from './apps/mail/pages/email-details.cmp.js';
import emailCompose from './apps/mail/cmps/email-compose.cmp.js';

import bookApp from './apps/book/pages/book-app.cmp.js';
import bookDetails from './apps/book/pages/book-details.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
  {
    path: '/email',
    component: emailApp,
    children: [{
      path: '/compose',
      component: emailCompose,
      props: (route) => ({
        to: route.query.to,
        subject: route.query.subject,
        body: route.query.body,
      }),

    }]
  },
  {
    path: '/email/:emailId',
    component: emailDetails,
  },
  {
    path: '/keep',
    component: keepPage,
  },
];




export const router = new VueRouter({ routes });
