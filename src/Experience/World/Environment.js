import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setSunLight()
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#44aaff', 6)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 50
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 5, 5)
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
        this.scene.add(this.ambientLight)

        // Add Fog for depth - Industrial Dark Blue/Grey
        this.scene.fog = new THREE.Fog('#0a0a0c', 10, 80)

        // Colors for transition
        this.colors = [
            new THREE.Color('#44aaff'), // Blue
            new THREE.Color('#ffcc00'), // Yellow
            new THREE.Color('#ff3300')  // Red
        ]
    }

    update() {
        // Cycle through colors based on time
        const time = this.experience.time.elapsed * 0.0005
        const colorIndex = Math.floor(time % this.colors.length)
        const nextColorIndex = (colorIndex + 1) % this.colors.length
        const alpha = time % 1

        this.sunLight.color.lerpColors(
            this.colors[colorIndex],
            this.colors[nextColorIndex],
            alpha
        )
    }
}
