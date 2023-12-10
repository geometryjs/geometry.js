# Two points on a line given by an equation

## Goal

The goal of the [two points on equation line procedure](../../src/procedures/derived/pointsOnLine.ts) is to find two points on a line given by an equation.

## Inputs

The inputs for this procedure are:

- `aCoefficient`: The $a$ coefficient of the line equation.
- `bCoefficient`: The $b$ coefficient of the line equation.
- `cCoefficient`: The $c$ coefficient of the line equation.

## Outputs

The outputs of this procedure are:

- `point1`: The first point on the line.
- `point2`: The second point on the line.

## Procedure

The procedure for this is as follows:

If $a = 0$ and $b = 0$ then the the equation is not a line and we throw an error.

If $a = 0$ then the equation is in the form of $by + c = 0$ and we can find a point on the line by setting $x = 0$ and solving for $y$. The point is then $[0, \frac{-c}{b}]$.

If $b = 0$ then the equation is in the form of $ax + c = 0$ and we can find a point on the line by setting $y = 0$ and solving for $x$. The point is then $[\frac{-c}{a}, 0]$.

If $a \neq 0$ and $b \neq 0$ then the equation is in the form of $ax + by + c = 0$ and we can find two points on the line by setting $x = 0$ and solving for $y$. The first point is then $[0, \frac{-c}{b}]$.

Now that we have one point on the line we can find the second point by moving by the directional vector of the line $\vec{v}$. The vector $\vec{v}$ the vector perpendicular to the normal vector of the line. 

The second point is then $[0, \frac{-c}{b}] + \vec{v}$.