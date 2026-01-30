import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Model {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.resource = this.resources.items.aiModel
        this.rotationSpeed = 0.0003

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.group = new THREE.Group()
        this.scene.add(this.group)

        this.instance = this.resource.scene
        this.group.add(this.instance)

        // Responsive Scale
        const isMobile = window.innerWidth < 768
        const scale = isMobile ? 12 : 22
        this.instance.scale.set(scale, scale, scale)

        // Start from the head (model lowered significantly)
        this.instance.position.y = isMobile ? -12 : -20

        this.instance.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })

        this.setInteractions()
    }

    setInteractions() {
        let isDragging = false
        let previousX = 0

        window.addEventListener('mousedown', (e) => {
            isDragging = true
            previousX = e.clientX
        })

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const delta = e.clientX - previousX
                this.group.rotation.y += delta * 0.005
                previousX = e.clientX
            }
        })

        window.addEventListener('mouseup', () => {
            isDragging = false
        })

        // Touch
        window.addEventListener('touchstart', (e) => {
            isDragging = true
            previousX = e.touches[0].clientX
        })

        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const delta = e.touches[0].clientX - previousX
                this.group.rotation.y += delta * 0.005
                previousX = e.touches[0].clientX
            }
        })

        window.addEventListener('touchend', () => {
            isDragging = false
        })
    }

    resize() {
        const isMobile = window.innerWidth < 768
        const scale = isMobile ? 12 : 22
        this.instance.scale.set(scale, scale, scale)
        // Keep in mind that GSAP might be controlling 'y' during scroll
        // but initial/resize position check is good
        this.instance.position.y = isMobile ? -12 : -20
    }

    setAnimation() {
        // Scroll animation : Rotates the Instance (Local)
        gsap.to(this.instance.position, {
            y: 1,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        })

        gsap.to(this.instance.rotation, {
            y: Math.PI,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        })
    }

    update() {
        // Continuous slow rotation : Rotates the Group (Global)
        // This allows manual rotation + idle rotation to coexist with scroll rotation
        this.group.rotation.y += this.rotationSpeed * this.time.delta
    }
}
