function Physics() {
    this.position = new Position(0, 0, 0);
    this.angularDrag = 0;
    this.drag = 0;
    var self = this;

    /*
        *** BUILDER FUNCTIONS ***
    These functions allow you to build a Physics object on creation
    as in: var physics = new Physics().withPosition(0, 0, 0).withDrag(.03);
    They change the current instance and return it. This works because the constructor
    function returns itself at the end.
    */
    this.withPosition = function(x, y, z) {
        self.x = x;
        self.y = y;
        self.z = z;
        return self;
    }

    this.withVector = function(x, y, z) {
        self.position.vector.x = x;
        self.position.vector.y = y;
        self.position.vector.z = z;
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

    return this;
}

function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    var self = this;

    this.add = function(vector) {
        self.x += vector.x;
        self.y += vector.y;
        self.z += vector.z;
    }

    this.combine = function(vector) {
        return new Vector(self.x + vector.x, self.y + vector.y, self.z + vector.z);
    }
}

function Position(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.vector = new Vector(0, 0, 0);
    var self = this;

    this.update = function() {
        self.x = ((self.x + self.vector.x) < 0) ? 0 : self.x + self.vector.x;
        self.x = ((self.y + self.vector.y) < 0) ? 0 : self.y + self.vector.y;
        self.x = ((self.z + self.vector.z) < 0) ? 0 : self.z + self.vector.z;        
    }

    this.updateWithPosition = function(x, y, z) {
        self.x = x;
        self.y = y;
        self.z = z;
    }

    var applyVector = function(vector) {
        self.x = ((self.x + vector.x) < 0) ? 0 : self.x + vector.x;
        self.x = ((self.y + vector.y) < 0) ? 0 : self.y + vector.y;
        self.x = ((self.z + vector.z) < 0) ? 0 : self.z - vector.z;
        self.vector = vector;       
    }
}

var physics = new Physics().withPosition(3, 4, 5).withDrag(.025);
document.getElementById("content").innerHTML = "(" + physics.position.x + ", " + physics.position.y + ", " + physics.position.z + "), " + physics.drag;