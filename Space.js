/*
This class represents the viewport that the user is gaming in. 
*/
function Space() {
    this.objects = null;
    this.borders = null;
    var self = this;

    this.update = function () {
        for (var i = 0, len = self.objects.length; i < len; i++) {
            // This block determines if the current object has collided with an outter border
            // and issues an event to document, if a collision has occured.
            var collision = self.borders.enforceContainment(self.objects[i]);
            if(collision != null) {
                var event = new CustomEvent("Border Collision", 
                    {
                        border: collision, 
                        object: self.objects[i].name
                    }
                );
                document.dispatchEvent(event);
            }
            // This block looks for collisions between the current object and all
            // other objects and issues an event to document, if a collision has occured.
            for(var j = i + 1; j < len; j++) {
                if (self.objects[i].collidesWith(self.objects[j])) {
                    var event = new CustomEvent("Object Collision",
                        {
                            firstObject: self.objects[i].name,
                            secondObject: self.objects[j].name
                        }
                    );
                    document.dispatchEvent(event);
                }
            }
            self.objects[i].update();
        }
    }

    this.withObjects = function (listOfObjects) {
        self.objects = listOfObjects;
        return self;
    }

    this.withBorders = function (width, height) {
        self.borders = new Container(width, height);
        return self;
    }

    return this;
}

function Container(width, height) {
    this.width = width;
    this.height = height;
    var self = this;

    this.enforceContainment = function (object) {
        if (object.collider != null) {
            if (object.collider.topBound() <= 0) {
                object.physics.position.reverseYVector();
                return "top";
            }
            else if ((self.height - object.collider.bottomBound()) <= 0) {
                object.physics.position.reverseYVector();
                return "bottom";
            }
            if (object.collider.leftBound() <= 0) {
                object.physics.position.reverseXVector();
                return "left";
            }
            else if ((self.width - object.collider.rightBound) <= 0) {
                object.physics.position.reverseXVector();
                return "right";
            }
        }
        return null;
    }
}