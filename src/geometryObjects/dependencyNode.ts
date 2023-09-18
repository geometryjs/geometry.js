import type { DependencyNode as IDependencyNode, IterableCache } from "../interfaces";
import type { Some } from "../helpers/types/general";

/**
 * Represents a node in the dependency tree.
 *
 * @group General
 */
export class DependencyNode implements IDependencyNode {
    private readonly nodeDependants: Set<IDependencyNode> = new Set();
    private readonly nodeDependencies: Set<IDependencyNode> = new Set();

    constructor(parameters: { readonly dependencies: Iterable<IDependencyNode> }) {
        const { dependencies } = parameters;
        for (const dependency of dependencies) {
            this.registerDependency(dependency);
        }
    }

    protected registerDependency(dependency: IDependencyNode): void {
        this.nodeDependencies.add(dependency);
        dependency.registerDependant(this);
    }

    private *getDeepDependenciesDFS(): Iterable<IDependencyNode> {
        for (const dependency of this.dependencies) {
            yield dependency;
            yield* dependency.dependencies;
        }
    }

    private *getDeepDependantsDFS(): Iterable<IDependencyNode> {
        for (const dependant of this.dependants) {
            yield dependant;
            yield* dependant.dependants;
        }
    }

    public update(): void {
        for (const dependant of this.dependants) {
            dependant.update();
        }
    }

    public registerDependant(dependant: IDependencyNode): void {
        this.nodeDependants.add(dependant);
    }

    get dependencies(): Iterable<IDependencyNode> {
        return this.nodeDependencies;
    }
    get dependants(): Iterable<IDependencyNode> {
        return this.nodeDependants;
    }

    get deepDependencies(): Iterable<IDependencyNode> {
        return this.getDeepDependenciesDFS();
    }
    get deepDependants(): Iterable<IDependencyNode> {
        return this.getDeepDependantsDFS();
    }
}

/**
 * Represents a node in the dependency tree. Node has a cache that is cleared when the node is updated.
 */
export class DependencyNodeWithCache<CacheRecords extends Record<string, Some | null> = Record<string, Some | null>, CacheNonEmpty extends true | false = false> extends DependencyNode {
    protected readonly cache: IterableCache<CacheRecords, CacheNonEmpty>;

    constructor(prameters: { readonly dependencies: Iterable<IDependencyNode>; readonly cache: IterableCache<CacheRecords, CacheNonEmpty> }) {
        const { dependencies, cache } = prameters;

        super({ dependencies });
        this.cache = cache;
    }

    public update(): void {
        this.cache.clearAll();
        super.update();
    }
}
