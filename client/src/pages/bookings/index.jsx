import useMyBookings from "../../hooks/useMyBookings";
import Spinner from "../../ui/Spinner";

function MyBookingCard({ booking, index }) {
  return (
    <div className="my-grid1">
      <div className="flex justify-center border p-2 font-bold">
        {index + 1}
      </div>
      <div className="flex justify-center border p-2">
        {booking.service.name}
      </div>
      <div className="flex justify-center border font-semibold">
        <div
          className={booking.paymentStatus ? "text-green-500" : "text-red-500"}
        >
          {booking.paymentStatus ? "Success" : "Failed"}
        </div>
      </div>
    </div>
  );
}

export default function Bookings() {
  const { isLoading, bookings, error } = useMyBookings();
  if (isLoading)
    return (
      <section>
        <h1 className="my-5 flex justify-center text-2xl font-semibold underline">
          My bookings
        </h1>
        <div>
          <Spinner /> Loading...
        </div>
      </section>
    );
  return (
    <section>
      <h1 className="my-5 flex justify-center text-2xl font-semibold underline">
        My Bookings
      </h1>
      <div className="my-grid1 sticky top-20 bg-gray-500 uppercase text-white">
        <div className="flex justify-center border-r-2 p-2">#</div>
        <div className="flex justify-center border-r-2 p-2">Service name</div>
        <div className="flex justify-center p-2">payment Status </div>
      </div>
      {bookings.map((booking, index) => (
        <MyBookingCard key={booking._id} booking={booking} index={index} />
      ))}
    </section>
  );
}
