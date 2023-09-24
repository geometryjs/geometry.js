# Perpenducular Vector

## Goal

The goal of the [perpendicular vector procedure](../../src/procedures/derived/perpendicularVector.ts) is to find a vector that is perpendicular to a given vector.

## Inputs

The inputs for this procedure are:

- `vector`: The vector to find a perpendicular vector for.
- `direction`: The direction of the perpendicular vector, eith `"positive"` (counterclock-wise) or `"negative"` (clock-wise).

## Outputs

The outputs of this procedure are:

- `perpendicularVector`: The perpendicular vector.

## Procedure

The procedure for this is as follows:

$\text{let } \vec{v} \text{ be the input vector}$  
$\text{let } \vec{p} \text{ be the perpendicular vector}$

$\text{If the direction is positve:}$
$\vec{p} = (-\vec{v}_y, \vec{v}_x)$

$\text{If the direction is negative:}$
$\vec{p} = (\vec{v}_y, -\vec{v}_x)$
