import { FieldErrors, FieldValues } from 'react-hook-form';

interface AuthErrorMessageProps {
  message?: string;
  margin?: string;
}

function AuthErrorMessage({ message, margin = 'my-5' }: AuthErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      className={`${margin} text-left text-[13px] leading-4 tracking-[-.75px] text-[#ff0101]`}
    >
      {message}
    </p>
  );
}

interface AuthErrorMessagesProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  fields: Array<keyof T>;
}

export default function AuthErrorMessages<T extends FieldValues>({
  errors,
  fields,
}: AuthErrorMessagesProps<T>) {
  return (
    <>
      {fields?.map((field, index) => {
        const hasError = errors[field] != null;
        const previousFieldsHaveError = fields
          .slice(0, index)
          .some(prevField => errors[prevField] != null);

        return (
          !previousFieldsHaveError &&
          hasError && (
            <AuthErrorMessage
              key={String(field)}
              message={String(errors[field]?.message)}
            />
          )
        );
      })}
    </>
  );
}
