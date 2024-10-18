

export default interface OnChangeFunctionProps {
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: string): void;
}
