# Geometry JS

Geometry JS is a JavaScript/TypeScript library for creating and manipulating 2D geometry objects.  

## Getting started

To get started, install the library using npm:

```bash
npm install geometry-js
```

Geometry JS is a zero-dependency library, that can run in both Node.js and the browser, with or without TypeScript.

After installing the library, you can import it in your code:

```typescript
import * as GeometryJS from 'geometry-js';
```

## Usage

The library provides a set of classes for creating and manipulating 2D geometry objects. For full API reference see [API Reference](https://geometryjs.jiricekcz.dev/api/).

The standard usage is as follows:

```typescript
import * as GeometryJS from 'geometry-js';

const plane = GeometryJS.createPlane(); // Creates a new plane object

const x = plane.createValue(1); // Creates a new value object with value 1
const y = plane.createValue(2); // Creates a new value object with value 2
// We wrap numbers in Value objects
// so that they can be a part of the internal dependency graph

const point = plane.createPoint(x, y); // Creates a new point object with coordinates (1, 2)
```

You create a plane object using a factory directly exported from the library. All other objects are created using the plane object.

### Runtime validation

To perform runtime checks on objects created by the library, it provides a set of validation functions. List of all validation functions can be found in [API Reference](https://geometryjs.jiricekcz.dev/api/modules).
