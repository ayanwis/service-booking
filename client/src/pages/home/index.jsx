import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-no-repeat">
      <div className="mt-40">
        <h1 className="text-7xl font-bold uppercase text-blue-500">
          we value your time!
        </h1>
        <p className="flex justify-center text-3xl font-semibold uppercase text-stone-700">
          easy online service booking
        </p>
      </div>
      <Link
        to="/services"
        className="w-fit rounded-md bg-black px-5 py-4 text-xl font-semibold text-white"
      >
        Book services
      </Link>

      <img
        src="/hero-image.jpg"
        alt="an image"
        className="h-60 object-contain "
      />
    </div>
  );
}

export default Home;
