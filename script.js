class CounterView {
    constructor() {
        this.root = null
        this.counter = null
    }

    #mountToRoot(element) {
        this.root.appendChild(element)
    }

    #createButton(text) {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.innerText = text
        return button
    }

    #createCounter(data) {
        const couner = document.createElement('span')
        couner.innerText = data
        return couner
    }

    #mountButton(text, handler) {
        const button = this.#createButton(text)
        button.addEventListener('click', handler)
        this.#mountToRoot(button)
    }

    #mountLeftButton(handler) {
        this.#mountButton('-', handler)
    }

    #mountRightButton(handler) {
        this.#mountButton('+', handler)
    }

    #mountCounter(initData) {
        this.counter = this.#createCounter(data)
        this.#mountToRoot(this.counter)
    }

    updateCounter(newData) {
        this.counter.innerText = newData
    }

    init({ counterData, leftBtuttonHandler, rightBtuttonHandler }) {
        this.root = document.getElementById('root')
        this.#mountLeftButton(leftBtuttonHandler)
        this.#mountCounter(counterData)
        this.#mountRightButton(rightBtuttonHandler)
    }
}

class CounterModel {
    constructor() {
        this.count = 0
        this.storageFieldKey = 'count'
    }

    setCount(data) {
        localStorage.setItem(this.storageFieldKey, data)
    }

    getCount() {
        localStorage.getItem(this.storageFieldKey)
    }
}

class CounterController {
    constructor({ view, model }) {
        this.view = view
        this.model = model
    }

    #isCountValid() {
        if (isNaN(conunt)) {
            console.error('Сount cannot be cast to a number!')
            return false
        }

        return true
    }

    #changeCount(action) {
        const conunt = Number(this.model.getCount())
        if (this.#isCountValid) {
            this.model.setCount(action(conunt))
        }
    }

    #incCount = () => this.#changeCount((count) => ++count)

    #decCount = () => () => this.#changeCount((count) => --count)

    init() {
        this.model.init()
        this.view.init({
            counterData: this.model.getCount(),
            leftBtuttonHandler: this.#decCount,
            rightBtuttonHandler: this.#incCount,
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const counter = new CounterController(new CounterView(), new CounterModel())
    counter.init
})
