import Toast from '../toast'
export default {
    install (Vue) {
        Vue.prototype.$toast = function (message, options) {
            console.log('options', options)
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData: {
                    closeButton: options.closeButton
                }

            })
            toast.$slots.default = message
            toast.$mount()
            document.body.appendChild(toast.$el)
        }
    }
}
