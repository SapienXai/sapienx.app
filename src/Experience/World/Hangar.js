import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Hangar {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.container = new THREE.Group()
        this.scene.add(this.container)

        this.setFloor()
        this.setWalls()
        this.setStructure()
        this.setLights()
    }

    setFloor() {
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({
                color: '#111111',
                metalness: 0.8,
                roughness: 0.2
            })
        )
        this.floor.rotation.x = - Math.PI * 0.5
        this.floor.position.y = - 15
        this.floor.receiveShadow = true
        this.container.add(this.floor)

        // Grid helper for industrial look
        const grid = new THREE.GridHelper(100, 50, '#333333', '#222222')
        grid.position.y = -14.99
        this.container.add(grid)
    }

    setWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: '#0a0a0a',
            metalness: 0.6,
            roughness: 0.4,
            transparent: true,
            opacity: 0.7
        })

        // Back Wall
        this.backWall = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), wallMaterial)
        this.backWall.position.z = -20
        this.backWall.position.y = 35
        this.container.add(this.backWall)

        // Side Walls
        const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), wallMaterial)
        leftWall.position.x = -25
        leftWall.position.y = 35
        leftWall.rotation.y = Math.PI * 0.5
        this.container.add(leftWall)

        const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), wallMaterial)
        rightWall.position.x = 25
        rightWall.position.y = 35
        rightWall.rotation.y = -Math.PI * 0.5
        this.container.add(rightWall)
    }

    setStructure() {
        // Pillars/Beams
        const beamGeometry = new THREE.BoxGeometry(1, 100, 1)
        const beamMaterial = new THREE.MeshStandardMaterial({ color: '#151515' })

        for (let i = -2; i <= 2; i++) {
            const beamL = new THREE.Mesh(beamGeometry, beamMaterial)
            beamL.position.set(-24.5, 35, i * 15)
            this.container.add(beamL)

            const beamR = new THREE.Mesh(beamGeometry, beamMaterial)
            beamR.position.set(24.5, 35, i * 15)
            this.container.add(beamR)
        }
    }

    setLights() {
        const lightGeometry = new THREE.BoxGeometry(0.5, 0.1, 20)
        const lightMaterial = new THREE.MeshBasicMaterial({ color: '#44aaff' })

        for (let i = -1; i <= 1; i++) {
            const ceilingLight = new THREE.Mesh(lightGeometry, lightMaterial)
            ceilingLight.position.set(i * 15, 40, 0)

            const pointLight = new THREE.PointLight('#44aaff', 50, 40)
            pointLight.position.copy(ceilingLight.position)

            this.container.add(ceilingLight)
            this.container.add(pointLight)
        }
    }
}
