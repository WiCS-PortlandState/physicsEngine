/*
    This class handles action-based events (as opposed to form-element events) for the 
    space. All events are added as bubble-up events on the document DOM object.
*/
function InputController() {
    this.events = [];
    var self = this;

    /*
        INPUT: Name of event to enable
        OUTPUT: n/a
        Searches the list of added events and, if a match is found on name, 
        creates a new event listener on the document for it.
    */
    this.enable = function(name) {
        for(var i = 0; i < self.events.length; i++) {
            if(self.events[i].name == name) {
                document.addEventListener(self.events[i].key, 
                    self.events[i].handler, false);
                break;
            }
        }
    }

    /*
        INPUT: Name of event to disable
        OUTPUT: n/a
        Searches the list of added events and, if a match is found on name, 
        removes the stored event listener from the document. This does not remove 
        the event from the list!
    */
    this.disable = function(name) {
        for(var i = 0; i < self.events.length; i++) {
            if(self.events[i].name == name) {
                document.removeEventListener(self.events[i].key, 
                    self.events[i].handler, false);
                break;
            }
        }
    }

    /*
        INPUT: Event object to add to the game
        OUTPUT: n/a
        Adds the given event to the game but does not enable it. This will not change behavior.
    */
    this.addEvent = function(event) {
        self.events.push(event);
    }

    /*
        INPUT: Name of event to remove
        OUTPUT: removed event
        Searches the list of added events and, if a match is found on name, 
        removes the event listener and also removes the event from the game event list.
    */
    this.removeEvent = function(name) {
        for(var i = 0; i < self.events.length; i++) {
            if(self.events[i].name == name) {
                document.removeEventListener(self.events[i].key, 
                    self.events[i].handler, false);
                return self.events.splice(i, 1);
            }
        }
    }

    /*
        INPUT: Name of event to add
        OUTPUT: n/a
        Adds the given Event object to the game event list and creates a new 
        event listener for it on the document.
    */
    this.addEventAndEnable = function(event) {
        self.addEvent(event);
        document.addEventListener(event.key, event.function, false);
    }
}

/*
    This object only holds the information associated with a single event. It 
    does not handle enabling or disabling itself. All fields are required to create the object. 
    Also contains a list of constants for available keys. Handlers should accept an event object 
    that contains information related to the event, as in: function handler(eventInfo) {...}
*/
function InputEvent(name, key, handler) {
    this.name = name;
    this.key = key;
    this.handler = handler;

    const KEY_DOWN = "keydown";
    const KEY_UP = "keyup";
    const KEY_PRESS = "keypress";
    const MOUSE_CLICK_DOWN = "mousedown";
    const MOUSE_CLICK_UP = "mouseup";
    const MOUSE_PRIMARY_CLICK = "click";
    const MOUSE_AUX_CLICK = "auxclick";
    const MOUSE_DOUBLE_CLICK = "dblclick";
}