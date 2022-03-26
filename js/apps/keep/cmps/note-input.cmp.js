export default {
  name: 'note-input',
  template: ` <section class="note-input flex justify-center item-center">
                <div class="note-input-container main-width flex space-between">
                <section class="input flex item-center">
                  <textarea type="text"  v-model="note.info.txt" :placeHolder="[[setUserTxt]]"/>  
                  <span @click="newNote"><i class="fas fa-chevron-circle-right"></i></span>
                </section> 
                <ul class="flex">
                    <li  v-for="(item,idx) in inputTypes" :key="idx">
                      <span><i @click="changeType(item,idx)" :class="['fas ' + item.font, typeIdx === idx ? 'mark' : '']"></i></span>
                    </li>
                  </ul>
                </div>
              </section>`,
  data() {
    return {
      note: null,
      typeIdx: 0,
      inputTypes: [
        { font: 'fa-font', type: 'note-txt', requestTxt: 'text' },
        { font: 'fa-file-image', type: 'note-img', requestTxt: 'image URL' },
        { font: 'fa-video', type: 'note-video', requestTxt: 'video URL' },
      ],
    };
  },
  created() {
    this.setEmptyNote();
  },
  methods: {
    changeType(item, idx) {
      this.note.type = item.type;
      this.typeIdx = idx;
    },
    newNote() {
      if (this.note.info.txt) {
        if (this.note.type === 'note-video') {
          debugger;
          this.note.info.videoId = this.note.info.txt.split('?v=')[1].split('&')[0];
        }
        this.$emit('new-note', this.note);
        this.setEmptyNote();
      }
    },
    setEmptyNote() {
      this.note = {
        type: 'note-txt',
        isPinned: false,
        color: 'color1',
        info: {
          txt: '',
        },
      };
    },
  },
  computed: {
    setUserTxt() {
      return `Enter ${this.inputTypes[this.typeIdx].requestTxt} here`;
    },
  },
};
