# Lines Parallel 

## Description

This procedure is used determine if a number of lines are parallel.

## Inputs

The inputs for this procedure are:

- `lines`: The lines to check if they are parallel.

## Outputs

The outputs of this procedure are:

- `parallel`: Whether or not the lines are parallel.

## Procedure

The procedure for this is as follows:

For all lines in `lines`:

- If the line is not parallel to the first line in `lines`, return `false`.
  - This check is done the following way:  
Let $\vec{v}$ be the normal vector of the first line and $\vec{u}$ be the normal vector of the other line.  
Then if the lines are parallel if and only if $\vec{v} \times \vec{u} = \vec{0}$.  
This can also be rewriten as $\vec{v}_x \vec{u}_y = \vec{u}_x \vec{v}_y$, this way we avoid comparing to zero.