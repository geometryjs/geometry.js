import { Some } from "../../helpers/types";
import { Runtime, type DependencyNodeObject, type EnumObject, type IterableCache, type Plane } from "../../interfaces";
import { GeometryObject } from "../geometryObject";

export abstract class AbstractEnum<States extends Record<string, DependencyNodeObject | null>, CacheRecords extends Record<string, Some | null> = Record<string, Some | null>> extends GeometryObject<CacheRecords> implements EnumObject<States>{
    
    protected abstract getStates(): States;
    protected abstract getCurrentStateName(): keyof States;
    protected getCurrentState(): States[keyof States] {
        return this.states[this.currentStateName];
    }

    constructor(parameters: { dependencies: DependencyNodeObject[], cache: IterableCache<CacheRecords, true>, plane: Plane, implementedInterfaces: Iterable<Runtime.Interface> }) {
        super({
            ...parameters,
            implementedInterfaces: [...Runtime.EnumObject, ...parameters.implementedInterfaces],
        });
    }

    public get states(): States {
        return this.getStates();
    }

    public get currentStateName(): keyof States {
        return this.getCurrentStateName();
    }

    public get currentState(): States[keyof States] {
        return this.getCurrentState();
    }
}