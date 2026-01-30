import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Experience from './Experience.js'

gsap.registerPlugin(ScrollTrigger)

export default class Overlay {
    constructor() {
        this.experience = new Experience()
        this.soundManager = this.experience.soundManager
        this.setAnimations()
    }

    setAnimations() {
        const sections = document.querySelectorAll('.content')
        const navbar = document.querySelector('.navbar')

        // Navbar z-index toggle on scroll
        ScrollTrigger.create({
            start: 100, // Toggle after 100px scroll
            onEnter: () => navbar.classList.add('front'),
            onLeaveBack: () => navbar.classList.remove('front')
        })

        sections.forEach((section) => {
            // Emergence animation from depth
            gsap.from(section, {
                opacity: 0,
                y: 100,
                z: -300, // Emerges from far background
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 95%',
                    end: 'bottom 5%',
                    toggleActions: 'play reverse play reverse'
                }
            })

            // Idle floating animation (Physical "breathing" effect)
            gsap.to(section, {
                y: '+=25',
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            })

            // Subttle 3D depth pulsing
            gsap.to(section, {
                z: '+=40',
                duration: 4 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random()
            })
        })

        this.setDynamicContent()
    }

    setDynamicContent() {
        const navLinks = document.querySelectorAll('.navbar a')
        const dropdownTriggers = document.querySelectorAll('.nav-item > a')
        const panels = document.querySelectorAll('.panel')
        const closeBtns = document.querySelectorAll('.close-btn')
        const menuToggle = document.querySelector('.menu-toggle')
        const navLinksContainer = document.querySelector('.nav-links')

        const playHover = () => this.soundManager.playHover()
        const playClick = () => this.soundManager.playClick()

        // Mobile Menu Toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                playClick()
                const isOpening = !menuToggle.classList.contains('active')
                
                menuToggle.classList.toggle('active')
                navLinksContainer.classList.toggle('active')
                
                const navbar = document.querySelector('.navbar')
                if (isOpening) {
                    navbar.classList.add('menu-open')
                    navbar.classList.add('front') // Force z-index high
                    document.body.style.overflow = 'hidden'
                } else {
                    navbar.classList.remove('menu-open')
                    // Only remove 'front' if we are scrolled less than 100px
                    if (window.scrollY < 100) {
                        navbar.classList.remove('front')
                    }
                    document.body.style.overflow = ''
                }
            })
        }

        // Close all panels
        const closeAllPanels = () => {
            playClick()
            panels.forEach(p => p.classList.remove('active'))
        }

        // Close all dropdowns
        const closeAllDropdowns = () => {
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'))
        }

        // Close mobile menu
        const closeMobileMenu = () => {
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active')
                navLinksContainer.classList.remove('active')
                document.querySelector('.navbar').classList.remove('menu-open')
                document.body.style.overflow = ''
            }
        }

        // Handle all links for sound
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', playHover)
            link.addEventListener('click', () => {
                // Play click sound for all
                playClick()

                // If it's a normal link (not a dropdown trigger), close the mobile menu
                if (!link.parentElement.classList.contains('nav-item')) {
                    closeMobileMenu()
                }
            })
        })

        // Dropdown Handlers
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation() // Prevent document click from closing immediately

                const parent = trigger.parentElement
                const wasActive = parent.classList.contains('active')

                closeAllDropdowns() // Close others

                if (!wasActive) {
                    parent.classList.add('active')
                }
            })
        })

        // Close mobile menu when a link inside a dropdown is clicked
        const dropdownLinks = document.querySelectorAll('.dropdown-menu a')
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu()
                closeAllDropdowns()
            })
        })

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            closeAllDropdowns()
        })

        // Panel Close Handlers (if panels are ever used)
        closeBtns.forEach(btn => {
            btn.addEventListener('mouseenter', playHover)
            btn.addEventListener('click', closeAllPanels)
        })

        // Close on Esc
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllPanels()
                closeAllDropdowns()
            }
        })
    }
}
