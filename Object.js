/*
This handles the collection of various physics elements and how they interact with each other. 
Each object may have more than one collider attached to it and the collider's position is dependent 
on the object's position (defined by the Physics object)
*/

function Object() {
    this.physics = null;
    this.collider = [];
    var self = this;

    /*
    INPUT: Object to compare the current Object to
    OUTPUT: True if a collision has occured
    Checks to see if the collection of colliders in the current object collide with the colliders in 
    the given object.
    */
    this.collidesWith = function(object) {
        if(self.collider.length != 0) {
            for(var i = 0; i < self.collider.length; i++) {
                for(var j = 0; j < object.collider.length; j++) {
                    if(self.collider[i].detectCollision(object.collider[j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    this.addCollider = function(collider) {
        self.collider.add(collider);
    }

    // Builder functions

    this.withPhysics = function(physics) {
        self.physics = physics;
        return self;
    }

    this.withCollider = function(collider) {
        self.collider.add(collider);
        return self;
    }

    return this;
}