function Graphic() {
    this.object = null;
    this.context = null;
    var self = this;

    this.update = function() {
        if(self.object == null || self.context == null) return;
        self.object.draw(self.context);
    }

    // Builder functions

    this.withObject = function(object, position) {
        self.object = object.withPosition(position);
        return self;
    }

    this.withContext = function(context) {
        self.context = context;
        return self;
    }

    return this;
}

function Circle(r) {
    this.centerPoint = null;
    this.radius = r;
    var self = this;

    this.draw = function(context) {
        if(self.centerPoint == null) return;
        context.beginPath();
        context.arc(self.centerPoint.x, self.centerPoint.y, self.radius, 0, Math.PI * 2);
        context.stroke();
    }

    // Builder functions

    this.withPosition = function(position) {
        self.centerPoint = position;
        return self;
    }

    return this;
}