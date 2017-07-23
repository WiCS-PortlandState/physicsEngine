function Physics() {
    this.position = new Position(0, 0, 0);
    this.orientation = new Orientation(90);
    this.angularDrag = 0;
    this.drag = 0;
    var self = this;

    this.update() = function() {
        this.position.vector.applyDrag(drag);
        this.orientation.applyAngularDrag(angularDrag);
        this.position.update();
        this.orientation.update();
    }

    this.withPosition = function(x, y) {
        self.x = x;
        self.y = y;
        return self;
    }

    this.withVector = function(x, y) {
        self.position.vector.x = x;
        self.position.vector.y = y;
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

    return this;
}

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

    this.applyDrag = function(drag) {
        self.x -= (self.x * drag);
        self.y -= (self.y * drag);
        if(self.x <= self.dragTolerance) self.x = 0;
        if(self.y <= self.dragTolerance) self.y = 0;
    }
}

function Position(x, y) {
    this.x = x;
    this.y = y;
    this.vector = new Vector(0, 0);
    var self = this;

    this.update = function() {
        self.x = ((self.x + self.vector.x) < 0) ? 0 : self.x + self.vector.x;
        self.y = ((self.y + self.vector.y) < 0) ? 0 : self.y + self.vector.y;
    }

    this.updateWithPosition = function(x, y) {
        self.x = x;
        self.y = y;
    }

    this.applyVector = function(vector) {
        self.x = ((self.x + vector.x) < 0) ? 0 : self.x + vector.x;
        self.y = ((self.y + vector.y) < 0) ? 0 : self.y + vector.y;
        self.vector = vector;       
    }

    this.reverseYVector = function() {
        self.vector.y *= -1;
    }

    this.reverseXVector = function() {
        self.vector.x *= -1;
    }
}

function Orientation(angle) {
    this.angle = 90;
    this.force = 0;
    this.dragTolerance = 0;
    var self = this;

    this.update = function() {
        self.angle += self.force;
        if(self.angle >= 360) self.angle -= 360;
        else if(self.angle < 0) self.angle += 360;
    }

    this.applyForce = function(force) {
        self.force = force;
        self.angle += force;
        if(self.angle >= 360) self.angle -= 360;
        else if(self.angle < 0) self.angle += 360;
    }

    this.applyAngularDrag = function(angularDrag) {
        self.force -= (self.force * angularDrag);
        if(self.force <= self.dragTolerance) self.force = 0;
    }
}