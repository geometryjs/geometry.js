# Line Line Intersection

## Description

This procedure finds the intersection point between two lines.

## Inputs

- `line1`: The first line.
- `line2`: The second line.

## Outputs

- `intersection`: The intersection point between the two lines.

Intersection can be a `point`, `line`, or `null`.

## Procedure

The procedure for this is as follows:  
If the lines are parallel, check their distance. If the distance is 0, then the lines are coincident, and the intersection is the first line. Otherwise, the lines are parallel and do not intersect.

If the lines are not parallel, then they intersect at a point. The point is found by solving the system of equations formed by the two line equations.

$a_1x + b_1y + c_1 = 0$  
$a_2x + b_2y + c_2 = 0$  

We know, that the determinant of the system is not 0, because the lines are not parallel. Therefore, the system has a unique solution.

Therefore, let $\Delta = \begin{vmatrix} a_1 & b_1 \\ a_2 & b_2 \end{vmatrix}$  
Then, $x = \frac{\begin{vmatrix} -c_1 & b_1 \\ -c_2 & b_2 \end{vmatrix}}{\Delta}$ and $y = \frac{\begin{vmatrix} a_1 & -c_1 \\ a_2 & -c_2 \end{vmatrix}}{\Delta}$.

The point of intersection is $[x, y]$.