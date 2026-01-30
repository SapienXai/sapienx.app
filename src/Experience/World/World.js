import Experience from '../Experience.js'
import Environment from './Environment.js'
import Model from './Model.js'
import FloatingObjects from './FloatingObjects.js'
import Stars from './Stars.js'
import Hangar from './Hangar.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.hangar = new Hangar()
            this.stars = new Stars()
            this.model = new Model()
            this.floatingObjects = new FloatingObjects()
            this.environment = new Environment()
        })
    }

    resize() {
        if (this.model)
            this.model.resize()
    }

    update() {
        if (this.stars)
            this.stars.update()

        if (this.model)
            this.model.update()

        if (this.floatingObjects)
            this.floatingObjects.update()

        if (this.environment)
            this.environment.update()
    }
}
