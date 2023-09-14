/**
 * Represents a node in a dependency tree.
 */
export interface DependencyNode {
    /**
     * All the nodes that this node depends on.
    */
    readonly dependencies: Iterable<DependencyNode>;
    /**
    * All the nodes that depend on this node.
    */
    readonly dependants: Iterable<DependencyNode>;

    /**
    * All the nodes that this node depends on, and all the nodes that depend on those nodes, and so on. Uses a depth-first search.
    */
    readonly deepDependencies: Iterable<DependencyNode>;
    /**
    * All the nodes that depend on this node, and all the nodes that those nodes depend on, and so on. Uses a depth-first search.
    */
    readonly deepDependants: Iterable<DependencyNode>;

    /**
     * Updates the node and all the nodes that depend on it.
     */
    update(): void;

    /**
     * Registers a new dependant
     * @param dependant - The node that depends on this node.
     */
    registerDependant(dependant: DependencyNode): void;

}
