import { Button } from '../../../../components';

interface ApplicationFooterProps {
  isApplicationAllowed: boolean;
}

export default function ApplicationFooter({
  isApplicationAllowed,
}: ApplicationFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 rounded-t-lg shadow-lg bg-gradient-to-r from-white to-gray-100">
      {isApplicationAllowed ? (
        <div className="flex items-center justify-between w-full font-semibold">
          <p className="text-gray-700">지금 신청하시면 참여하실 수 있습니다!</p>
          <Button className="px-8 transition-shadow duration-300 shadow-md hover:shadow-lg">
            신청하기
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full font-semibold">
          <p className="text-gray-500">신청이 마감되었어요.</p>
          <Button
            variant="secondary"
            disabled={true}
            className="px-8 text-gray-600 bg-gray-200 shadow-inner cursor-not-allowed"
          >
            신청마감
          </Button>
        </div>
      )}
    </div>
  );
}
