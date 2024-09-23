import ErrorScreen from '../../components/error/ErrorFallback';

export default function NotFoundPage() {
  return <ErrorScreen statusCode={404} />;
}
