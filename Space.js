/*
This class represents the viewport that the user is gaming in. It deals with updating the 
viewport and is where all the objects associated with viewport are stored. Its main responsibilities 
are to detect collisions and update all objects inside the viewport.
*/
function Space() {
    this.objects = [];
    this.container = null;
    this.gravity;
    var self = this;

    /*
    INPUT: n/a
    OUTPUT: n/a
    Updates all objects after doing collision detection and issuing collision events.
    */
    this.update = function () {
        for (var i = 0, len = self.objects.length; i < len; i++) {
            // This block determines if the current object has collided with an outter border
            // and issues an event to document, if a collision has occured.
            var collision = self.container.detectContainmentCollision(self.objects[i]);
            if(collision != null) {
                var event;
                event = new CustomEvent("Border Collision",
                    {
                        detail: {
                            border: collision,
                            object: self.objects[i].name
                        }
                    }
                );
                document.dispatchEvent(event);
            }
            // This block looks for collisions between the current object and all
            // other objects and issues an event to document, if a collision has occured.
            for(var j = i + 1; j < len; j++) {
                if (self.objects[i].collidesWith(self.objects[j])) {
                    event = new CustomEvent("Object Collision",
                        {
                            detail: {
                                firstObject: self.objects[i].name,
                                secondObject: self.objects[j].name
                            }
                        }
                    );
                    document.dispatchEvent(event);
                }
            }
            self.objects[i].physics.position.addVector(self.gravity);
            self.objects[i].update();
        }
    }

    this.addObject = function(object) {
        self.objects.add(object);
    }

    // Builder functions

    this.withObjects = function (listOfObjects) {
        self.objects = listOfObjects;
        return self;
    }

    this.withContainer = function (width, height) {
        self.container = new Container(width, height);
        return self;
    }

    this.withGravity = function(amount) {
        self.gravity = new Vector(0, amount * -1);
        return self;
    }

    return this;
}

/*
This class manages the borders of the viewport and manages object collisions with them. 
No builder functions because both properties (height and width) are required.
*/
function Container(width, height) {
    this.width = width;
    this.height = height;
    var self = this;

    /*
    INPUT: Object to enforce containment on
    OUTPUT: String representing a collision with a certain border (top, bottom, right, left);
            may be a null value if no collision.
    If a collision is detected, the object's vector is reversed and the border it collided with is returned.
    */
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

    /*
    INPUT: Object to detect collisions on
    OUTPUT: String representing a collision with a certain border (top, bottom, right left);
            may be a null value if no collision.
    If the given Object has collided with a border, that border is returned. This is separate from the 
    enforceContainment function to avoid unnecessary conditionals in this function.
    */
    this.detectContainmentCollision = function(Object) {
        if(object.collider != null) {
            if (object.collider.topBound() <= 0) {
                return "top";
            }
            else if ((self.height - object.collider.bottomBound()) <= 0) {
                return "bottom";
            }
            if (object.collider.leftBound() <= 0) {
                return "left";
            }
            else if ((self.width - object.collider.rightBound) <= 0) {
                return "right";
            }
        }
    }
}