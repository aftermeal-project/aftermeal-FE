export default function NoActivity({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto mt-40">
      <div>
        <div className="flex flex-col text-center gap-y-7">
          <span className="text-5xl">🧐</span>
          <p className="text-lg text-gray-700">
            {text} 신청할 수 있는 활동이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
