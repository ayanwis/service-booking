import useAllBookings from "../../hooks/useAllBookings";

const BookingCard = ({ booking }) => {
  return (
    <div className="my-4 flex justify-evenly">
      <span>{booking.service.name}</span>
      <span>{booking.user.name}</span>
      <div className="font-semibold">
        <span
          className={booking.paymentStatus ? "text-green-500" : "text-red-500"}
        >
          {booking.paymentStatus ? "Success" : "Failed"}
        </span>
      </div>
    </div>
  );
};

function AdminPage() {
  const { isLoading, bookings, error } = useAllBookings();

  if (isLoading) return null;
  console.log(bookings);

  return (
    <div>
      <div className="flex justify-evenly text-2xl font-bold uppercase underline">
        <span>name</span>
        <span>user</span>
        <span>payment Status </span>
      </div>
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}

export default AdminPage;
