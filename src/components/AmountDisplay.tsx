import { formatCurrency } from "../utils/formatCurrency";

interface AmountDisplayProps {
  label?: string;
  amount: number;
}

export const AmountDisplay = ({ amount, label }: AmountDisplayProps) => {
  return (
    <>
      <p className="text-2xl text-pink-500 font-bold">
        {label && `${label}: `}
        <span className="font-bold text-black">{formatCurrency(amount)}</span>
      </p>
    </>
  );
};
