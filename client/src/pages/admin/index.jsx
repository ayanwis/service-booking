import useAllBookings from "../../hooks/useAllBookings";
import Spinner from "../../ui/Spinner";

const BookingCard = ({ booking, index }) => {
  return (
    <div className="my-grid">
      <div className="flex justify-center border p-2 font-bold">
        {index + 1}
      </div>
      <div className="flex justify-center border p-2">
        {booking.service.name}
      </div>
      <div className="flex justify-center border p-2">{booking.user.name}</div>
      <div className="flex justify-center border p-2">{booking.user.email}</div>
      <div className="flex justify-center border font-semibold">
        <div
          className={booking.paymentStatus ? "text-green-500" : "text-red-500"}
        >
          {booking.paymentStatus ? "Success" : "Failed"}
        </div>
      </div>
    </div>
  );
};

function AdminPage() {
  const { isLoading, bookings, error } = useAllBookings();

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
      <h1 className="my-5 flex justify-center text-xl font-semibold underline">
        All Bookings
      </h1>
      <div className="overflow-x-scroll">
        <div className="my-grid  bg-gray-500 uppercase text-white">
          <div className="flex justify-center border-r-2 p-2">#</div>
          <div className="flex justify-center border-r-2 p-2">service name</div>
          <div className="flex justify-center border-r-2 p-2">user name</div>
          <div className="flex justify-center border-r-2 p-2">user email</div>
          <div className="flex justify-center p-2">payment Status </div>
        </div>
        {bookings.map((booking, index) => (
          <BookingCard key={booking._id} booking={booking} index={index} />
        ))}
      </div>
    </section>
  );
}

export default AdminPage;
