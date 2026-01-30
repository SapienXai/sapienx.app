import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import { Howl } from 'howler'
import SoundManager from './SoundManager.js'
import Overlay from './Overlay.js'

let instance = null

export default class Experience {
    constructor(canvas) {
        // Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.soundManager = new SoundManager()
        this.overlay = new Overlay()

        // Splash Screen Elements
        this.progressBar = document.querySelector('.progress-bar')
        this.loaderText = document.querySelector('#loader-text')
        this.loader = document.querySelector('#loader')
        this.terminalLogs = document.querySelector('#terminal-logs')

        // Terminal Log Messages
        this.logMessages = [
            'Initializing Neural Net...',
            'Allocating Memory Blocks...',
            'Connecting to Blockchain Node...',
            'Verifying Smart Contracts...',
            'Loading 3D Assets...',
            'Compiling Shaders...',
            'Establishing Uplink...',
            'Decrypting Secure Channels...',
            'Syncing with DAO Governance...',
            'System Ready.'
        ]
        this.logIndex = 0

        // Start Logging
        this.startTerminalLogs()

        // Resource events
        this.resources.on('progress', (progress) => {
            if (this.progressBar) {
                this.progressBar.style.width = `${progress}%`
            }
            if (this.loaderText) {
                this.loaderText.textContent = `Neural Uplink: ${Math.round(progress)}%`
            }
        })

        this.resources.on('ready', () => {
            setTimeout(() => {
                if (this.loader) {
                    this.loader.style.opacity = '0'
                    this.loader.style.visibility = 'hidden'
                }
            }, 1000)
        })

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.world.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    startTerminalLogs() {
        const addNextLog = () => {
            if (this.logIndex < this.logMessages.length) {
                this.addLog(this.logMessages[this.logIndex])
                this.logIndex++
                // Random delay between logs
                const delay = 150 + Math.random() * 400
                setTimeout(addNextLog, delay)
            }
        }
        addNextLog()
    }

    addLog(message) {
        if (!this.terminalLogs) return
        
        const line = document.createElement('div')
        line.className = 'log-line'
        line.textContent = `> ${message}`
        this.terminalLogs.appendChild(line)

        // Auto scroll
        this.terminalLogs.scrollTop = this.terminalLogs.scrollHeight
        
        // Remove old logs if too many
        if (this.terminalLogs.children.length > 5) {
            this.terminalLogs.removeChild(this.terminalLogs.children[0])
        }
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()
    }
}
