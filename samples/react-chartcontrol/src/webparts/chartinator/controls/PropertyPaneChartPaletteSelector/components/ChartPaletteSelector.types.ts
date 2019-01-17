import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

/**
 * Properties for the chart palette select
 */
export interface IChartPaletteSelectorProps {
  label: string;
  options: IDropdownOption[];
  selectedKey: string | number;
  disabled: boolean;
  stateKey: string;
  onChanged: (option: IDropdownOption, index?: number) => void;
}

export interface IChartPaletteSelectorState {
  selectedKey: string | number;
}
