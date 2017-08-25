const Position = require('./Physics.js').Position;

/*
This class governs collisions between objects and between the outside borders 
of the game Space. Must be created with a Physics object (governs the behavior post-collision) 
and a bound-type object. The bound defines the collision boundaries associated with the object. 
The bound objects all define where their current limit exists on each rectangular side.
*/
function Collider(bound) {
    this.bound = bound;
    var self = this;

    this.detectCollision = function(collider) {
        return self.bound.detectCollision(collider.bound);
    }
}

/*
This bound defines a circle with radius and center point that may be bound to a certain object. The 
center is defined as an offset from the attached Physics object's position.
*/
function CircularBound(radius, centerPosition, physics) {
    this.radius = radius;
    this.physics = physics;
    this.offsetX = physics.position.x - centerPosition.x;
    this.offsetY = physics.position.y - centerPosition.y;
    var self = this;

    this.detectCollision = function(bound) {
        var bCenter = bound.center();
        var sCenter = self.center();
        return Math.sqrt(Math.pow((bCenter.x - sCenter.x), 2) +
                Math.pow((bCenter.y - sCenter.y), 2)) <= 0;
    }

    this.topBound = function() {
        return self.center().y - self.radius;
    }

    this.rightBound = function() {
        return self.center().x + self.radius;
    }

    this.bottomBound = function() {
        return self.center().y + self.radius;
    }

    this.leftBound = function() {
        return self.center().x - self.radius;
    }

    this.center = function() {
        return new Position(self.physics.position.x - self.offsetX, self.physics.position.y - self.offsetY);
    }
}

module.exports = { Collider, CircularBound }
