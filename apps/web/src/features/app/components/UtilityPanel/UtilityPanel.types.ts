import React from "react";
import { SelectedObject } from "../../providers/ScenarioProvider/ScenarioProvider.types";

export interface UtilityPanelProps extends React.HTMLAttributes<HTMLElement> {
  selectedObject?: SelectedObject | null;
  "data-testid"?: string;
}
