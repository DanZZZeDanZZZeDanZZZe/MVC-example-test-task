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

    #mountClearButton(handler) {
        this.#mountButton('Clear', handler)
    }

    #mountCounter(initData) {
        this.counter = this.#createCounter(initData)
        this.#mountToRoot(this.counter)
    }

    updateCounter(newData) {
        this.counter.innerText = newData
    }

    init({
        counterData,
        leftBtuttonHandler,
        rightBtuttonHandler,
        clearBtuttonHandler,
    }) {
        this.root = document.getElementById('root')
        this.#mountLeftButton(leftBtuttonHandler)
        this.#mountCounter(counterData)
        this.#mountRightButton(rightBtuttonHandler)
        this.#mountClearButton(clearBtuttonHandler)
    }
}

class CounterModel {
    constructor() {
        this.defaultValue = 0
        this.storageFieldKey = 'count'
    }

    #isCountValid = (conunt) => !isNaN(conunt) && typeof conunt === 'number'

    setCount(data) {
        localStorage.setItem(this.storageFieldKey, data)
    }

    setDefaultCount() {
        this.setCount(this.defaultValue)
    }

    #getCountCandidate() {
        return Number(localStorage.getItem(this.storageFieldKey))
    }

    getCount() {
        const candidate = this.#getCountCandidate()

        if (this.#isCountValid(candidate)) {
            return candidate
        }

        this.setDefaultCount()

        return this.#getCountCandidate()
    }
}

class CounterController {
    constructor({ view, model }) {
        this.view = view
        this.model = model
    }

    #changeCount(action) {
        const conunt = this.model.getCount()
        this.model.setCount(action(conunt))
        this.view.updateCounter(this.model.getCount())
    }

    #incCount = () => this.#changeCount((count) => ++count)

    #decCount = () => this.#changeCount((count) => --count)

    #setDefaultCount = () =>
        this.#changeCount(() => {
            this.model.setDefaultCount()
            return this.model.getCount()
        })

    init() {
        this.view.init({
            counterData: this.model.getCount(),
            leftBtuttonHandler: this.#decCount,
            rightBtuttonHandler: this.#incCount,
            clearBtuttonHandler: this.#setDefaultCount,
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const counter = new CounterController({
        view: new CounterView(),
        model: new CounterModel(),
    })
    counter.init()
})
