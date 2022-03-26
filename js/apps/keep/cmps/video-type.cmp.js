export default {
  props: ['id'],
  name: 'video-input',
  template: `
          <section class="video-input flex justify-center ">
          <iframe :src="'https://www.youtube.com/embed/'+ id" allowfullscreen> </iframe>
          </section>
      `,
};
