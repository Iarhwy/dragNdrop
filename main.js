let currentElem = '',
    list = document.getElementById('dd__list'),
    axisX = 0,
    axisY = 0

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent')
        return true
    } catch(err) {
        return false
    }
}

const createList = num => {
    for (let i = 1; i <= num; i++) {
        list.innerHTML += `<li class="dd__item" data-num="${i}">Drag me!</li>`
    }
}

const getPos = val => {
    let elemIndex,
        listItems = document.querySelectorAll('.dd__item')

    listItems.forEach((elem, index) => {
        let elemValue = elem.getAttribute('data-num')
        if (val == elemValue) elemIndex = index
    })
    return elemIndex
}

function dragStart(e) {
    axisX = isTouchDevice() ? e.touches[0].clientX : e.clientX
    axisY = isTouchDevice() ? e.touches[0].clientY : e.clientY
    currentElem = e.target
}

function dragOver(e) {
    e.preventDefault()
}

const drop = e => {
    e.preventDefault()
    let newX = isTouchDevice() ? e.touches[0].clientX : e.clientX,
        newY = isTouchDevice() ? e.touches[0].clientY : e.clientY,
        targetElem = document.elementFromPoint(newX, newY),
        currentVal = currentElem.getAttribute('data-num'),
        targetVal = targetElem.getAttribute('data-num'),
        [currentPos, targetPos] = [getPos(currentVal), getPos(targetVal)]

    axisX = newX
    axisY = newY

    try {
        currentPos < targetPos 
            ? targetElem.insertAdjacentElement('afterend', currentElem)
            : targetElem.insertAdjacentElement('beforebegin', currentElem)
    } catch(err) {}
}

window.onload = async () => {
    customElem = ''
    list.innerHTML = ''

    await createList(8)

    let listItems = document.querySelectorAll('.dd__item')

    listItems.forEach(elem => {
        let chars = '0123456789ABCDEF',
        color = '#'
    
        for (let i = 0; i < 6; i++) {
            color += chars[Math.floor(Math.random() * 16)]
            elem.style.backgroundColor = color
        }

        return color
    })
        
    listItems.forEach(elem => {
        elem.draggable = true
        elem.addEventListener('dragstart', dragStart, false)
        elem.addEventListener('dragover', dragOver, false)
        elem.addEventListener('drop', drop, false)
        elem.addEventListener('touchstart', dragStart, false)
        elem.addEventListener('touchmove', drop, false)
    })
}