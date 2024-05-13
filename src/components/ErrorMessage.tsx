interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="text-center font-bold bg-red-400 text-white uppercase p-2 rounded-lg">
      <p>{children}</p>
    </div>
  );
};
