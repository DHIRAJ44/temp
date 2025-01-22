const rooms = [
    { roomNumber: 101, status: "available", booking: null },
    { roomNumber: 102, status: "available", booking: null },
    { roomNumber: 103, status: "available", booking: null },
  ];
  const bookings = [];
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function checkRoomAvailability(roomNumber) {
    await delay(300); 
    const room = rooms.find((r) => r.roomNumber === roomNumber);
    if (!room) return `Room ${roomNumber} does not exist.`;
    return `Room ${roomNumber} is ${room.status}.`;
  }
  async function bookRoom(userDetails, roomNumber) {
    await delay(300);
    const room = rooms.find((r) => r.roomNumber === roomNumber);
    if (!room) return `Room ${roomNumber} does not exist.`;
    if (room.status !== "available") return `Room ${roomNumber} is already occupied.`;
    const booking = {
      id: bookings.length + 1,
      user: userDetails,
      roomNumber,
      date: new Date().toLocaleString(),
    };
    bookings.push(booking);
    room.status = "occupied";
    room.booking = booking.id;
    return `Room ${roomNumber} successfully booked by ${userDetails.name}.`;
  }
  async function cancelBooking(bookingId) {
    await delay(300); 
    const bookingIndex = bookings.findIndex((b) => b.id === bookingId);
    if (bookingIndex === -1) return `Booking ID ${bookingId} not found.`;
    const booking = bookings.splice(bookingIndex, 1)[0];
    const room = rooms.find((r) => r.roomNumber === booking.roomNumber);
    room.status = "available";
    room.booking = null;
    return `Booking ID ${bookingId} for Room ${booking.roomNumber} has been canceled.`;
  }
  async function fetchAllBookings() {
    await delay(300); 
    return bookings.length ? bookings : "No bookings found.";
  }
  
  async function checkBookingDetails(bookingId) {
    await delay(300); 
    const booking = bookings.find((b) => b.id === bookingId);
    return booking || `Booking ID ${bookingId} not found.`;
  }
  
  async function updateBooking(bookingId, updatedInfo) {
    await delay(300); 
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return `Booking ID ${bookingId} not found.`;
  
    Object.assign(booking, updatedInfo);
    return `Booking ID ${bookingId} successfully updated with new information.`;
  }
  

  async function testCases() {
    console.log("Test Case 1: Check Room Availability");
    console.log(await checkRoomAvailability(101));
  
    console.log("\nTest Case 2: Book a Room");
    console.log(
      await bookRoom({ name: "Alice", contact: "alice@example.com" }, 102)
    );
  
    console.log("\nTest Case 3: Cancel a Booking");
    console.log(await cancelBooking(1)); 
  
    console.log("\nTest Case 4: Fetch All Bookings");
    console.log(await fetchAllBookings());
  
    console.log("\nTest Case 5: Check Booking Details");
    console.log(await checkBookingDetails(2)); 
  
    console.log("\nTest Case 6: Update Booking Information");
    console.log(
      await updateBooking(2, { user: { name: "Bob", contact: "bob@example.com" } })
    );
  }
  
  testCases();
  