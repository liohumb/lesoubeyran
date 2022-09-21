import gsap from 'gsap'

/*  LOADING  */
// loading bar & number
const bar = document.querySelector('.loading__bar-in')
const counterNumber = document.querySelector('.loading__counter-number')

let c = 0
let barInterval = setInterval(() => {
    bar.style.width = c + '%'
    counterNumber.innerText = c + '%'
    c++

    if (c === 101) {
        clearInterval(barInterval)

        // loading disappear
        gsap.to('.loading', {
            duration: 2.55,
            delay: 2.25,
            background: 'transparent',
            display: 'none'

        })
        gsap.to('.loading__text', {
            duration: 2.5,
            opacity: 0
        })
        gsap.to('.loading__text-border', {
            duration: 2,
            opacity: 0
        })
        gsap.to('.loading__bar', {
            duration: 1.5,
            opacity: 0
        })
        gsap.to('.loading__counter', {
            duration: .75,
            opacity: 0
        })
        gsap.to('header', {
            duration: 1,
            delay: 2,
            top: '0'
        })
        gsap.to('.scroll', {
            duration: 1,
            delay: 2,
            bottom: '3rem'
        })
    }
}, 40)

/*  MENUS  */
const $menu = document.querySelector('.menu')
const $content = document.querySelectorAll('.menu__container-content')
let menuWidth = $menu.clientWidth
let itemWidth = $content[0].clientWidth
let wrapWidth = $content.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0

// lerp
const lerp = (v0, v1, t) => {
    return v0 * ( 1 - t ) + v1 * t
}

// dispose
const dispose = (scroll) => {
    gsap.set($content, {
        x: (i) => {
            return i * itemWidth + scroll
        },
        modifiers: {
            x: (x) => {
                const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
                return `${s}px`
            }
        }
    })
}
dispose(0)

// wheel
const handleMouseWheel = (e) => {
    scrollY -= e.deltaY * 0.9
}

// touch
let touchStart = 0
let touchX = 0
let isDragging = false
const handleTouchStart = (e) => {
    touchStart = e.clientX || e.touches[0].clientX
    isDragging = true
    $menu.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
    if (!isDragging) return
    touchX = e.clientX || e.touches[0].clientX
    scrollY += (touchX - touchStart) * 2.5
    touchStart = touchX
}
const handleTouchEnd = () => {
    isDragging = false
    $menu.classList.remove('is-dragging')
}

// listener
$menu.addEventListener('mousewheel', handleMouseWheel)

$menu.addEventListener('touchstart', handleTouchStart)
$menu.addEventListener('touchmove', handleTouchMove)
$menu.addEventListener('touchend', handleTouchEnd)

$menu.addEventListener('mousedown', handleTouchStart)
$menu.addEventListener('mousemove', handleTouchMove)
$menu.addEventListener('mouseleave', handleTouchEnd)
$menu.addEventListener('mouseup', handleTouchEnd)

$menu.addEventListener('selectstart', () => { return false })

// resize
window.addEventListener('resize', () => {
    menuWidth = $menu.clientWidth
    itemWidth = $content[0].clientWidth
    wrapWidth = $content.length * itemWidth
})

// render
const render = () => {
    requestAnimationFrame(render)
    y = lerp(y, scrollY, .1)
    dispose(y)

    scrollSpeed = y - oldScrollY
    oldScrollY = y

    gsap.to($content, {
        skewX: -scrollSpeed * .2,
        rotate: scrollSpeed * .01,
        scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
    })
}
render()