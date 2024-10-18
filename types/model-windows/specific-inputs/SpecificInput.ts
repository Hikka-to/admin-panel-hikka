import OnChangeFunctionProps from "@/types/model-windows/specific-inputs/OnChangeFunctionProps"

interface SpecificInputProps {
  onChange: OnChangeFunctionProps;
  currectValue: any
}

export default interface SpecificInput extends React.FC<SpecificInputProps> {}

