let _Vue

const install = function (Vue) {
    _Vue = Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}


class Store {
    constructor(options) {
        this.getters = {}
        const computed = {}
        const store = this
        Object.keys(options.getters).forEach((key) => {
            // 获取用户定义的getter
            const fn = options.getters[key]

            // 放置到_vm的computed中
            // 因为vue中computed是无参数的而用户设置的getter是带参数的，进行一层封装
            computed[key] = function warpComputedGetter() {
                return fn(store.state)
            }

            // 代理store.getters,且为只读
            Object.defineProperty(store.getters, key, {
                get() {
                    return store._vm[key]
                }
            })
        })

        this._vm = new _Vue({
            data: {
                // 在vue中遇到$$开头的就会放弃代理，即：在实例上隐藏该属性。可以通过vm._data访问
                $$state: options.state
            },
            computed,
        })

        this.mutations = options.mutations
        this.actions = options.actions

        // 修改commit和dispatch的this指向store
        this.commit = this.commit.bind(store)
        this.dispatch = this.dispatch.bind(store)
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(value) {
        console.warn('can not set state')
    }

    commit(mutationsType, payload) {
        const mutation = this.mutations[mutationsType]
        if (!mutation) {
            console.warn('mutation is not exist:' + mutationsType);
            return
        }
        mutation(this.state, payload)
    }

    dispatch(actionType, payload) {
        const action = this.actions[actionType]
        if (!action) {
            console.warn('action is not exist:' + actionType);
            return
        }
        action(this, payload)
    }
}

export default {
    install,
    Store
}