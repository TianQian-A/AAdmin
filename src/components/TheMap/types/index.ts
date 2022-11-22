import { InjectionKey, Ref, ShallowRef } from "vue";

export type MapContainerRef = Ref<HTMLDivElement | null>;
export type MapIns = ShallowRef<AMap.Map | null>;
export const mapInsProvideKey = Symbol() as InjectionKey<MapIns>;
