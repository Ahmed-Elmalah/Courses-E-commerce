export default function LessonsCard({lesson}) {
  return (
    <div className="w-full">
      <li
        key={lesson.id}
        className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center transition duration-150 hover:bg-gray-200"
      >
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {lesson.title}
          </h4>
          <p className="text-sm text-gray-600">Content: {lesson.content}</p>
          <p className="text-sm text-gray-600">Duration: {lesson.duration}</p>
        </div>
      </li>
    </div>
  );
}
