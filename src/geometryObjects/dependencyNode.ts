import { Some } from "../helpers/types/general";
import { IterableCache } from "../interfaces/cache";
import { DependencyNode as IDependencyNode } from "../interfaces/dependencyNode";

/**
 * Represents a node in the dependency tree.
 */
export class DependencyNode implements IDependencyNode {
    private readonly nodeDependants: Set<IDependencyNode> = new Set();
    private readonly nodeDependencies: Set<IDependencyNode> = new Set();


    constructor(dependencies: Iterable<IDependencyNode>) {
        for (const dependency of dependencies) {
            this.registerDependency(dependency); 
        }
    }

    private registerDependency(dependency: IDependencyNode): void {
        this.nodeDependencies.add(dependency);
        dependency.registerDependant(this);
    }

    private* getDeepDependenciesDFS(): Iterable<IDependencyNode> {
        for (const dependency of this.dependencies) {
            yield dependency;
            yield* dependency.dependencies;
        }
    }
    
    private* getDeepDependantsDFS(): Iterable<IDependencyNode> {
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
export class DependencyNodeWithCache<CacheRecords extends Record<string, Some| null> = Record<string, Some | null>, CacheNonEmpty extends true | false = false> extends DependencyNode {
    constructor(dependencies: Iterable<DependencyNode>, protected readonly cache: IterableCache<CacheRecords, CacheNonEmpty>) {
        super(dependencies);
    }

    public update(): void {
        this.cache.clearAll();
        super.update();
    }
}