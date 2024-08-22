import { Link } from 'react-router-dom';

interface ErrorScreenProps {
  title: string;
  description: string;
}

export default function ErrorScreen({ title, description }: ErrorScreenProps) {
  return (
    <main className="flex items-center justify-center bg-gray-100 min-h-screen-minus-96">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-7">{title}</h1>
        <p className="text-xl text-gray-600">{description}</p>
        {title === '404' && (
          <Link
            to="/"
            className="inline-block px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            홈으로 돌아가기
          </Link>
        )}
      </div>
    </main>
  );
}
