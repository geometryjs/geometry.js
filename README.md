# Geometry JS

Geometry JS is a JavaScript/TypeScript library for creating and manipulating 2D geometry objects.  

## Table of contents

- [Geometry JS](#geometry-js)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
  - [Documentation](#documentation)
  - [Requirements](#requirements)
  - [Usage](#usage)

## Getting started

Install the library using npm:

```bash
npm install @jiricekcz/geometry-js
```

Import the library in your code:

```typescript
import * as GeometryJS from '@jiricekcz/geometry-js';
```

## Documentation

The API documentation is available at [https://geometryjs.jiricekcz.dev/](https://geometryjs.jiricekcz.dev/). For more indepth information, see the [wiki](https://github.com/geometryjs/geometry.js/wiki).

## Requirements

Geometry JS requires a JavaScript runtime with support for ES6. It is a zero-dependency TypeScript library, so it can be used in any JavaScript project (Node.js, React, Angular, Vue, etc.). For more information about requirements, see the [wiki (Requirements)](https://github.com/geometryjs/geometry.js/wiki/Runtime-Requirements).

## Usage

After importing the library, getting started is easy.  
First, we need to create the main `Plane` object. This object represents the 2D plane on which all geometry objects are created.

```typescript
import * as GeometryJS from '@jiricekcz/geometry-js';

// Create the main Plane object
const plane = GeometryJS.createPlane();
```

After that, we can create some geometry objects. For example, let's create a value (variable) `x` and a readonly value `y`.

```typescript
// Create a value (variable) x
const x = plane.createValue(1);

// Create a readonly value y
const y = plane.createReadonlyValue(2);
```

Now, we can create a point `A` with coordinates `x` and `y`.

```typescript
// Create a point A with coordinates x and y
const A = plane.createPointFromTwoValues(x, y);
```

We can also create a point `B` with coordinates `3` and `4`.

```typescript
// Create a point B with coordinates 3 and 4
const B = plane.createPointFromCoordinates(3, 4);
```

Now, we can create a line `l` from points `A` and `B`.

```typescript
// Create a line l from points A and B
const l = plane.createLineFromTwoPoints(A, B);
```

We can also create a point `O` at the origin of the plane.

```typescript
// Create a point O at the origin of the plane
const O = plane.createPointFromCoordinates(0, 0);
```

Then we can construct a line perpendicular to `AB` through `O`.

```typescript
// Create a line perpendicular to l through O
const perpendicular = plane.constructPerpendicularLineFromPoint(l, O);
```

With just this code, we have declaratively defined the geometry. If we change any property of any non-readonly object, the whole geometry will be recalculated.

The whole code with minimal comments:

```typescript
import * as GeometryJS from '@jiricekcz/geometry-js';

const plane = GeometryJS.createPlane();

const x = plane.createValue(1);
const y = plane.createReadonlyValue(2);

const A = plane.createPointFromTwoValues(x, y);
const B = plane.createPointFromCoordinates(3, 4);

const l = plane.createLineFromTwoPoints(A, B);

const O = plane.createPointFromCoordinates(0, 0);

const perpendicular = plane.constructPerpendicularLineFromPoint(l, O);
```

Beacuse of the declarative nature and descriptive names of the functions, the code is very readable and easy to understand.