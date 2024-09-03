import { FieldErrors, FieldValues } from 'react-hook-form';

interface FormErrorMessageProps {
  message?: string;
  margin?: string;
}

function FormErrorMessage({ message, margin = 'my-5' }: FormErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      className={`${margin} text-left text-[13px] leading-4 tracking-[-.75px] text-[#ff0101]`}
    >
      {message}
    </p>
  );
}

interface FormErrorMessagesProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  fields: Array<keyof T>;
}

export default function FormErrorMessages<T extends FieldValues>({
  errors,
  fields,
}: FormErrorMessagesProps<T>) {
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
            <FormErrorMessage
              key={String(field)}
              message={String(errors[field]?.message)}
            />
          )
        );
      })}
    </>
  );
}
