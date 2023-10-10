# Line c Coefficient

## Goal

The goal of the [line c coefficient procedure](../../src/procedures/derived/lineCCoefficient.ts) is to find the $c$ coefficient of a line equation in the form of $ax + bx + c = 0$.

## Inputs

The inputs for this procedure are:

- `normalVector`: The normal vector of the line.
- `point`: A point on the line.

## Outputs

The outputs of this procedure are:

- `cCoefficient`: The $c$ coefficient of the line equation.

## Procedure

The procedure for this is as follows:

$\text{let } \vec{n} \text{ be the normal vector}$  
$\text{let } P \text{ be the point on the line}$  
$\text{let } ax + bx + c = 0 \text{ be the equation of the line}$  

$P = [P_x, P_y]$  
$\vec{n} = (\vec{n}_x, \vec{n}_y)$

$\text{then}$  

$a = \vec{n}_x, b = \vec{n}_y$  
$a P_x + b P_y + c = 0$

$\text{from that:}$  

$\vec{n}_x P_x + \vec{n}_y P_y + c = 0$  
$c = -(\vec{n}_x P_x + \vec{n}_y P_y)$
