const Booking = require('./booking');
describe('Booking toJson', function () {

  test('Test toJson', () => {
    let booking = new Booking();
    booking.id = "1";
    booking.jetpackId = "11";
    booking.start_date = "2019-09-01";
    booking.end_date = "2019-12-31";
    expect(booking.toJson()).toMatchObject({
      id: "1",
      jetpackId: "11",
      start_date: "2019-09-01",
      end_date: "2019-12-31"
    })
  });
});
