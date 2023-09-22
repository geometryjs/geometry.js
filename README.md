# Geometry JS

Geometry JS is a JavaScript/TypeScript library for creating and manipulating 2D geometry objects.  

## Table of contents

- [Geometry JS](#geometry-js)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
  - [Usage](#usage)
  - [Depedency graph](#depedency-graph)
    - [Runtime validation](#runtime-validation)


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

## Depedency graph

The library uses a dependency graph to keep track of dependencies between objects. This means that when you create a new object, you can use other objects as its parameters. When the value of a parameter changes, the value of the object changes as well.  
Objects, that are a part of the dependency graph implement the `DependencyNode` interface. This is independent of other interfaces they implement. An object, that implements the `Point` interface, can but does not have to implement the `DependencyNode` interface. Usually objects, that implements the `DependencyNode` interface, are created using methods, that start with *create* or *construct*. They are meant to be longer lived, as they are not garbage collected. Functions such as *evaluate* or others similar usually don't return objects, that implement the `DependencyNode` interface. They are meant to be short lived and are garbage collected after they are no longer needed.

### Runtime validation

To perform runtime checks on objects created by the library, it provides a set of validation functions. List of all validation functions can be found in [API Reference](https://geometryjs.jiricekcz.dev/api/modules).
