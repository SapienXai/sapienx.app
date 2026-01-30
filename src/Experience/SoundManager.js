export default class SoundManager {
    constructor() {
        // Initialize Audio Context (Cross-browser support)
        const AudioContext = window.AudioContext || window.webkitAudioContext
        this.context = new AudioContext()

        // Master Volume
        this.masterGain = this.context.createGain()
        this.masterGain.gain.value = 0.3
        this.masterGain.connect(this.context.destination)

        this.ambientOsc = null

        // Unlock audio on first interaction
        this.unlockAudioContext()
    }

    unlockAudioContext() {
        const unlock = () => {
            if (this.context.state === 'suspended') {
                this.context.resume().then(() => {
                    console.log('Audio Context Resumed')
                })
            }
            // Remove listeners once unlocked
            ['click', 'scroll', 'touchstart', 'keydown'].forEach(e => {
                document.removeEventListener(e, unlock)
            })
        }

        ['click', 'scroll', 'touchstart', 'keydown'].forEach(e => {
            document.addEventListener(e, unlock)
        })
    }

    playAmbientDrone() {
        // Ambient drone disabled by user request
    }

    playClick() {
        if (this.context.state === 'suspended') this.context.resume()

        const t = this.context.currentTime
        const osc = this.context.createOscillator()
        const gain = this.context.createGain()

        // Digital "Zap" sound
        osc.frequency.setValueAtTime(600, t)
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.15)

        gain.gain.setValueAtTime(0.2, t)
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1)

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start()
        osc.stop(t + 0.15)
    }

    playHover() {
        if (this.context.state === 'suspended') return

        const t = this.context.currentTime
        const osc = this.context.createOscillator()
        const gain = this.context.createGain()

        // High-tech "Chirp"
        osc.type = 'sine'
        osc.frequency.setValueAtTime(2000, t)
        osc.frequency.linearRampToValueAtTime(2200, t + 0.05)

        gain.gain.setValueAtTime(0.05, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05)

        osc.connect(gain)
        gain.connect(this.masterGain)

        osc.start()
        osc.stop(t + 0.05)
    }
}
