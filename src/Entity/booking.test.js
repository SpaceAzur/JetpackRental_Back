const Booking = require('./booking');
describe('Booking toJson', function () {

  test('Test toJson', () => {
    let booking = new Booking();
    booking.id = "1";
    booking.jetpackId = "11";
    booking.starDate = "2019-09-01";
    booking.endDate = "2019-12-31";
    expect(booking.toJson()).toMatchObject({
      id: "1",
      jetpackId: "11",
      startDate: "2019-09-01",
      endDate: "2019-12-31"
    })
  });
});
