interface GetActivitiesErrorScreenProps {
  message: string;
}

export default function GetActivitiesErrorScreen({
  message,
}: GetActivitiesErrorScreenProps) {
  return (
    <section className="w-full px-4 py-8">
      <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto bg-white min-h-screen-minus-80 py-9">
        <div>
          <div className="flex flex-col text-center gap-y-5">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="text-xl text-gray-700 sm:text-2xl">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
