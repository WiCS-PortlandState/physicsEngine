"use strict";

const Engine = {
  Orientation: require('./Physics.js').Orientation,
  Position: require('./Physics.js').Position,
  Physics: require('./Physics.js').Physics,
  Vector: require('./Physics.js').Vector,

  Container: require('./Space.js').Container,
  Space: require('./Space.js').Space,

  Circle: require('./Graphic.js').Circle,
  Graphic: require('./Graphic.js').Graphic,

  Object: require('./Object.js').Object,

  Collider: require('./Collider.js').Collider,
  CircularBound: require('./Collider.js').CircularBound
};

module.exports = Engine;
