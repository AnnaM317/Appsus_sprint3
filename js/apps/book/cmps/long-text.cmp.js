export default {
    props: ['txt'],
    template: `
    <div>
        <p>{{textForDisplay}} <span v-if="!expandText && isLongTxt">...</span></p>
        <button class="long-text-btn" v-if="isLongTxt" @click="toggleText">{{textButton}}</button>
    </div>`,

    data() {
        return {
            expandText: false,
            textBtn: ''
        }
    },
    methods: {
        toggleText() {
            this.expandText = !this.expandText
        }
    },
    computed: {
        textForDisplay() {
            return this.expandText ? this.txt : this.txt.slice(0, 100)
        },
        textButton() {
            return this.expandText ? 'less' : 'more'
        },
        isLongTxt() {
            return this.txt.length > 100
        }
    }

}