import axios from "axios";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from 'react-hot-toast';

export default function LessonsCard({ lesson , onDelete,onEdit }) {
  const params = useParams();
  const ApiUrl = "http://localhost:3000/api";

  const deleteLesson = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      theme : "dark",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4f39f6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${ApiUrl}/courses/${params.id}/lessons/${lesson.id}`
        );

        toast.success("Lesson Deleted!")

       if (onDelete) {
            onDelete(lesson.id);
        }
      } catch (error) {
        toast.error("Failed to delete lesson.")
      }
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <li
        key={lesson.id}
        className="bg-gray-100 p-4 w-3/4 rounded-lg shadow-sm flex justify-between items-center transition duration-150 hover:bg-gray-200"
      >
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {lesson.title}
          </h4>
          <p className="text-sm text-gray-600">Content: {lesson.content}</p>
          <p className="text-sm text-gray-600">Duration: {lesson.duration}</p>
        </div>
      </li>

      <div className="flex flex-col md:flex-row w-1/4 gap-2 items-center justify-center text-2xl btn-sm">
        <button className="btn btn-warning" onClick={() => onEdit(lesson)}>
          <MdOutlineModeEditOutline  className="text-white lg:text-xl" />
        </button>
        <button onClick={deleteLesson} className="btn bg-red-600 border-0">
          <MdDelete className="text-white lg:text-xl" />
        </button>
      </div>
    </div>
  );
}
