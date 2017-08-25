const Collider = require('../Collider.js').Collider;
const CircularBound = require('../Collider.js').CircularBound;
const Position = require('../Physics.js').Position;

const radius = 42;
const centerPosition = { x: 10, y: 20 };
const physics = { position: { x: 30, y: 40 } };

test('CircularBound is initialized with data supplied in the constructor', () => {
  const bound = new CircularBound(radius, centerPosition, physics);
  expect(bound.radius).toEqual(radius);
  expect(bound.physics).toEqual(physics);
});

test('CircularBound is initialized with calculated x and y offsets based on center position', () => {
  const bound = new CircularBound(radius, centerPosition, physics);
  expect(bound.offsetX).toEqual(physics.position.x - centerPosition.x);
  expect(bound.offsetY).toEqual(physics.position.y - centerPosition.y);
});

test('CircularBound accurately reports its center', () => {
  const bound = new CircularBound(radius, centerPosition, physics);
  const center = bound.center();
  expect(center instanceof Position);
  expect(center.x).toEqual(10);
  expect(center.y).toEqual(20);
});

