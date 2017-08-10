function Controller() {
    this.events = [];
    var self = this;

    this.enable = function(event) {
        for(var i = 0; i < self.events.length; i++) {
            if(self.events[i].name == event) {
                window.addEventListener(self.events[i].name, self.events[i].function, false);
                self.events[i].enabled = true;
            }
        }
    }

    this.disable = function(event) {
        for(var i = 0; i < self.events.length; i++) {
            if(self.events[i].name == event) {
                window.removeEventListener(self.events[i].name, self.events[i].function, false);
                self.events[i].enabled = false;
            }
        }
    }

    this.addListenerAndEnable = function(event, func) {
        self.events.push({name: event, function: func, enabled: true});
        window.addEventListener(event, func, false);
    }

    this.addListenerDisabled = function(event, func) {
        self.events.push({name: event, function: func, enabled: false});
    }

    return this;
}