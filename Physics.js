/*
This class determines how an Object moves through the viewport. It deals with the vector forces 
acting on it and how those forces react over time. Both linear and angular forces are taken into 
account. It should be used by calling update at specified intervals to make an object move through 
its environment.
*/
function Physics() {
    this.position = new Position(0, 0);
    this.orientation = new Orientation();
    this.angularDrag = 0;
    this.drag = 0;
    var self = this;

    /*
    INPUT: n/a
    OUTPUT: n/a
    Updates the current position and orientation considering the forces being applied to 
    them. Also updates the force vectors to account for drag after updating the position and 
    rotation.
    */
    this.update = function() {
        self.position.update();
        self.orientation.update();
        self.position.vector.applyDrag(self.drag);
        self.orientation.applyAngularDrag(self.angularDrag);
    }

    // Builder functions

    this.withPosition = function(position) {
        self.position = position;
        return self;
    }

    this.withVector = function(vector) {
        self.position.vector = vector
        return self;
    }

    this.withDrag = function(drag) {
        self.drag = drag;
        return self;
    }

    this.withAngularDrag = function(angularDrag) {
        self.angularDrag = angularDrag;
        return self;
    }

    this.withOrientation = function(angle) {
        self.orientation.angle = angle;
        return self;
    }

    this.withDragTolerance = function(tolerance) {
        self.position.withDragTolerance(tolerance);
        return self;
    }

    this.withAngularDragTolerance = function(tolerance) {
        self.angle.withAngularDragTolerance(tolerance);
        return self;
    }

    return this;
}

/*
This class represents a force Vector acting on the linear position of an Object. 
The drag tolerance is a number that describes when a force should reduce to zero rather 
than slow any further (or else a vector would never truely reach zero unless instantiated that way).
*/
function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.dragTolerance = 0;
    var self = this;

    this.add = function(vector) {
        self.x += vector.x;
        self.y += vector.y;
    }

    this.combine = function(vector) {
        return new Vector(self.x + vector.x, self.y + vector.y);
    }

    /*
    INPUT: drag coefficient
    OUTPUT: n/a
    Adjusts the current Vector to account for the given drag coefficient. If 
    the resulting Vector has a member within the drag tolerance, it is reduced to zero.
    */
    this.applyDrag = function(drag) {
        self.x -= (self.x * drag);
        self.y -= (self.y * drag);
        if(Math.abs(self.x) <= self.dragTolerance) self.x = 0;
        if(Math.abs(self.y) <= self.dragTolerance) self.y = 0;
    }

    // Builder functions

    this.withDragTolerance = function(tolerance) {
        self.dragTolerance = tolerance;
        return self;
    }

    return this;
}

/*
This class tracks the position of an Object in the viewport. It uses drag to track 
the decay of linear force.
*/
function Position(x, y) {
    this.x = x;
    this.y = y;
    this.vector = new Vector(0, 0);
    var self = this;

    /*
    INPUT: n/a
    OUTPUT: n/a
    Updates the current position. The current position cannot be < 0.
    */
    this.update = function() {
        self.x = ((self.x + self.vector.x) < 0) ? 0 : self.x + self.vector.x;
        self.y = ((self.y + self.vector.y) < 0) ? 0 : self.y + self.vector.y;
    }

    /*
    INPUT: (x, y) coordinates
    OUTPUT: n/a
    Replaces the current instance's position.
    */
    this.updateWithPosition = function(x, y) {
        self.x = x;
        self.y = y;
    }

    /*
    INPUT: Vector to add to this instance
    OUTPUT: n/a
    Adds the given Vector to the instance's.
    */
    this.addVector = function(vector) {
        self.vector.add(vector);
    }

    this.reverseYVector = function() {
        self.vector.y *= -1;
    }

    this.reverseXVector = function() {
        self.vector.x *= -1;
    }

    // Builder functions

    this.withVector = function(vector) {
        self.vector = vector;
        return self;
    }

    this.withDragTolerance = function(tolerance) {
        self.vector.dragTolerance = tolerance;
        return self;
    }

    return this;
}

/*
This class tracks the rotational position of an Object in degrees. It uses angular drag to 
manage the decay of rotational forces.
*/
function Orientation() {
    this.angle = 90;
    this.force = 0;
    this.dragTolerance = 0;
    var self = this;

    /*
    INPUT: n/a
    OUTPUT: n/a
    Updates the rotational position based on the force. If the position is 
    outside 0 - 360, it is brought back within these bounds.
    */
    this.update = function() {
        self.angle += self.force;
        if(self.angle >= 360) self.angle -= 360;
        else if(self.angle < 0) self.angle += 360;
    }

    /*
    INPUT: Angular drag coefficient
    OUTPUT: n/a
    Updates the current force to reflect the angular drag given. If the resulting force 
    is within the drag tolerance, it is reduced to zero.
    */
    this.applyAngularDrag = function(angularDrag) {
        self.force -= (self.force * angularDrag);
        if(Math.abs(self.force) <= self.dragTolerance) self.force = 0;
    }

    // Builder functions

    this.withAngle = function(angle) {
        self.angle = angle;
        return self;
    }

    this.withForce = function(force) {
        self.force = force;
        return self;
    }

    this.withDragTolerance = function(tolerance) {
        self.dragTolerance = tolerance;
        return self;
    }

    return this;
}