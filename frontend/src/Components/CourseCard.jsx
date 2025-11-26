import noImg from "../assets/noImage.webp";

export default function CourseCard({ el }) {
  const hasDiscount = el.discount > 0 && el.discount !== el.price;
  const finalPrice = hasDiscount ? el.discount : el.price;

  return (
    <div className="card bg-white rounded-xl shadow-lg hover:shadow-xl h-fit pb-6">
      <img
        src={el.image || el.img || noImg}
        alt={el.title}
        className="w-full h-1/2 rounded-t object-cover"
      />
      <div className="card-body p-4 flex flex-col justify-between">
        <h2 className="card-title font-bold text-lg line-clamp-2">
          {el.title}
        </h2>
        <p className="text-gray-700 text-sm line-clamp-3 mb-2">
          {el.description}
        </p>
        <div className="w-full flex items-center gap-2 justify-end mt-auto">
          <div>
            {hasDiscount ? (
              <sup>
                <del className="text-gray-500 line-through text-sm">
                  {el.price}$
                </del>
              </sup>
            ) : (
              <p className="text-indigo-600 font-bold text-lg"> {el.price}$</p>
            )}
          </div>
          <div>
            {hasDiscount && (
              <p className="text-indigo-600 font-bold text-lg">{finalPrice}$</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
