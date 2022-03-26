import textType from './text-type.cmp.js';
import imgType from './img-type.cmp.js';
import videoType from './video-type.cmp.js';

export default {
  props: ['note'],
  name: 'note-preview',
  template: ` <section :class="[noteSize, noteColor]" class="note-preview flex flex-column content-center space-between">
                <text-type v-if="note.type === 'note-txt'" :txt="note.info.txt"/>
                <img-type @click.native="$emit('showModel',note)" v-else-if="note.type === 'note-img'" :url="note.info.txt"/>
                <video-type v-else-if="note.type === 'note-video'" :id="note.info.videoId"/>
                <div :class="noteToolsColor" class="note-tools">
                  <span @click="$emit('removed',note.id)"> <i class="far fa-trash-alt"></i> </span>
                  <span @click="$emit('showModel',note)"> <i class="far fa-edit"></i></span>
                  <span @click="showColors=true"> <i class="fas fa-palette"></i></span>
                  <span @click="$emit('clone',note)"> <i class="far fa-clone"></i></span>
                  <span @click="$emit('email',note)"> <i class="fas fa-envelope-open-text"></i></span>
                  <span class="last-one" @click="changeImpotent"> <i :class="['fas fa-exclamation', setImportent]"></i></span>
                  <div v-show='showColors' :class="noteToolsColor" class="pallete">
                      <div @click="changeColor(num)" class="pallete-color color" :class="'color'+ num" v-for="num in colorNums" :key="num"  ></div>
                  </div>
                </div>

              </section>`,
  data() {
    return {
      colorNums: 6,
      showColors: false,
      importent: null,
    };
  },
  created() {
    this.importent = this.note.isPinned;
  },
  methods: {
    changeColor(color) {
      let updatedNote = { ...this.note };
      updatedNote.color = `color${color}`;
      this.$emit('updated', updatedNote);
    },
    changeImpotent() {
      this.importent = !this.importent;
      let updatedNote = { ...this.note };
      updatedNote.isPinned = this.importent;
      this.$emit('updated', updatedNote);
    },
    createMail() {},
  },
  computed: {
    noteSize() {
      let noteSize;
      switch (this.note.type) {
        case 'note-txt':
          const txtLen = this.note.info.txt.length;
          if (txtLen < 100) noteSize = 'smallest-note ';
          else if (txtLen < 200) noteSize = 'small-note';
          else if (txtLen < 350) noteSize = 'normal-note';
          else if (txtLen < 500) noteSize = 'medium-note';
          else if (txtLen < 800) noteSize = 'large-note';
          else noteSize = 'xl-note';
          break;

        case 'note-img':
          noteSize = 'medium-note';
        case 'note-video':
          noteSize = 'normal-note';
      }
      return noteSize;
    },
    noteColor() {
      this.showColors = false;
      return this.note.color;
    },
    noteToolsColor() {
      this.showColors = false;
      return `tool-${this.note.color}`;
    },
    setImportent() {
      console.log('enter');
      return this.importent ? 'importent' : '';
    },
  },
  components: {
    textType,
    imgType,
    videoType,
  },
};
