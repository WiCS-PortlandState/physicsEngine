/*
This class governs collisions between objects and between the outside borders 
of the game Space. Must be created with a Physics object (governs the behavior post-collision) 
and a bound-type object. The bound defines the collision boundaries associated with the object. 
The bound objects all define where their current limit exists on each rectangular side.
*/
function Collider(physics, bound) {
    this.physics = physics;
    this.bound = bound;
}

function RectangularBound(height, width, centerPosition) {
    this.height = height;
    this.width = width;
    this.center = centerPosition;
    var self = this;

    this.topBound = function() {
        return centerPosition.y - (height / 2);
    }

    this.rightBound = function() {
        return centerPosition.x + (width / 2);
    }

    this.bottomBount = function() {
        return centerPosition.y + (height / 2);
    }

    this.leftBound = function() {
        return centerPosition.x - (width / 2);
    }
}

function CircularBound(radius, centerPosition) {
    this.radius = radius;
    this.center = centerPosition;
    var self = this;
}