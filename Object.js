function Object() {
    this.physics = null;
    this.collider = null;
    var self = this;

    this.collidesWith = function(object) {
        if(self.collider != null) return self.collider.detectCollision(object);
        return false;
    }

    // Builder functions

    this.withPhysics = function(physics) {
        self.physics = physics;
        return self;
    }

    this.withCollider = function(collider) {
        self.collider = collider;
        return self;
    }

    return this;
}