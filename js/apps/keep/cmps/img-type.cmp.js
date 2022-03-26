export default {
  props: ['url'],
  name: 'img-input',
  template: `
        <section class="img-input flex justify-center ">
            <img :src="url"/>
        </section>
    `,
};
