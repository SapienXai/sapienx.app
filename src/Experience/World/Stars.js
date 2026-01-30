import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Stars {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.count = 2000
        this.setGeometry()
        this.setMaterial()
        this.setPoints()
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(this.count * 3)
        const colors = new Float32Array(this.count * 3)

        for (let i = 0; i < this.count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 50
            colors[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    }

    setMaterial() {
        this.material = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        })
    }

    setPoints() {
        this.instance = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.instance)
    }

    update() {
        this.instance.rotation.y += this.time.delta * 0.00005
        this.instance.rotation.x += this.time.delta * 0.00002
    }
}
