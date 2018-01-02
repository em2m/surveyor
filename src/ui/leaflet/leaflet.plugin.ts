import {Plugin} from "../../core/extension/extension.model";
import {MapboxProvider} from "./providers/mapbox/mapbox.provider";
import {MapquestProvider} from "./providers/mapquest/mapquest.provider";

export let LeafletPlugin: Plugin = <Plugin> {
  name: "Leaflet Plugin",
  extensions: {
    "surveyor:leaflet-base-layer": [
      {
        value: MapboxProvider,
        target: "global",
        priority: 1
      },
      {
        value: MapquestProvider,
        target: "global",
        priority: 2
      }
    ],
  }
};
