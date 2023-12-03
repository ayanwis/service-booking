import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="mx-auto mt-20 flex w-1/3 flex-col items-center justify-center gap-4 rounded-lg bg-gray-200 py-5 shadow-lg">
      <img src="/check.png" alt="check image" className="h-20 object-contain" />
      <h1 className="text-2xl font-bold text-green-500">
        Service booked successfully
      </h1>
      <Link to="/" className="rounded-md bg-black px-4 py-3 text-white">
        Go to home
      </Link>
    </div>
  );
}

export default Success;
