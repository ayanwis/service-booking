import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 ">
      <div>
        <h1 className="text-6xl font-bold uppercase text-blue-500">
          we value your time!
        </h1>
        <p className="text-3xl font-semibold uppercase">
          easy online service booking
        </p>
      </div>
      <Link
        to="/services"
        className="w-fit rounded-md bg-black px-4 py-3 font-semibold text-white"
      >
        Book services
      </Link>
    </div>
  );
}

export default Home;
