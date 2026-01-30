import * as THREE from 'three'
import Experience from '../Experience.js'

export default class FloatingObjects {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.container = new THREE.Group()
        this.scene.add(this.container)

        this.count = 40
        this.objects = []

        this.words = [
            'NEURAL', 'AUTONOMOUS', 'SYNAPSE', 'ADAPTIVE',
            'LOGIC', 'INTELLIGENCE', 'EVOLVE', 'CORE',
            'AGENTS', 'CODE', 'LEARNING', 'SYSTEM'
        ]

        this.setGeometry()
        this.setMaterial()
        this.setObjects()
    }

    createTextTexture(text) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = 256
        canvas.height = 64

        context.fillStyle = 'rgba(255, 255, 255, 0)'
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.shadowColor = 'white'
        context.shadowBlur = 8
        context.fillStyle = 'white'
        context.font = 'bold 32px Outfit, Arial'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(text, 128, 32)

        const texture = new THREE.CanvasTexture(canvas)
        return texture
    }

    setGeometry() {
        this.geometries = [
            new THREE.TetrahedronGeometry(0.1, 0),
            new THREE.OctahedronGeometry(0.1, 0),
            new THREE.IcosahedronGeometry(0.1, 0)
        ]
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            metalness: 0.9,
            roughness: 0.1,
            emissive: '#111111'
        })
    }

    setObjects() {
        for (let i = 0; i < this.count; i++) {
            const group = new THREE.Group()

            const geometry = this.geometries[Math.floor(Math.random() * this.geometries.length)]
            const mesh = new THREE.Mesh(geometry, this.material)
            group.add(mesh)

            // Add text label
            const word = this.words[i % this.words.length]
            const textTexture = this.createTextTexture(word)
            const textMaterial = new THREE.MeshBasicMaterial({
                map: textTexture,
                transparent: true,
                side: THREE.DoubleSide
            })
            const textPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.25), textMaterial)
            textPlane.position.y = 0.3
            group.add(textPlane)

            // Random properties for orbit
            const radius = 4 + Math.random() * 8
            const angle = Math.random() * Math.PI * 2
            const speed = (0.0001 + Math.random() * 0.0005) * (Math.random() > 0.5 ? 1 : -1)
            const yOffset = (Math.random() - 0.5) * 20

            group.position.x = Math.cos(angle) * radius
            group.position.y = yOffset
            group.position.z = Math.sin(angle) * radius

            const rotationSpeed = {
                x: Math.random() * 0.01,
                y: Math.random() * 0.01,
                z: Math.random() * 0.01
            }

            this.container.add(group)

            this.objects.push({
                group,
                textPlane,
                radius,
                angle,
                speed,
                rotationSpeed
            })
        }
    }

    update() {
        const camera = this.experience.camera.instance

        for (const object of this.objects) {
            // Update angle for orbit
            object.angle += object.speed * this.time.delta

            // Update position based on new angle
            object.group.position.x = Math.cos(object.angle) * object.radius
            object.group.position.z = Math.sin(object.angle) * object.radius

            // Make text always face camera (billboarding)
            object.textPlane.quaternion.copy(camera.quaternion)

            // Update internal rotation
            object.group.children[0].rotation.x += object.rotationSpeed.x
            object.group.children[0].rotation.y += object.rotationSpeed.y
            object.group.children[0].rotation.z += object.rotationSpeed.z
        }
    }
}
