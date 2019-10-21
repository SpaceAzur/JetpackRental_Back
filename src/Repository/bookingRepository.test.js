const BookingRepository = require('./bookingRepository');
const Booking = require('../Entity/booking');

describe('Booking Repository create', function () {
  test('Create null booking => throw error', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new BookingRepository(dbMock);

    expect(() => {repository.create()})
      .toThrow('Booking object is undefined');
  });

  test('Create booking without id => throw error', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new BookingRepository(dbMock);

    expect(() => {
      repository.create({
        id:'',
        jetpackId: "Jetpack test",
        start_date: "2019-09-01",
        end_date: "2019-12-31"
      })
    }).toThrow('Booking object is missing information');
  });

  test('Create complete booking => OK', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new BookingRepository(dbMock);
    let booking = new Booking();
    booking.id = 1;
    booking.jetpackId = "11";
    booking.start_date = "2019-09-01";
    booking.end_date = "2019-12-31";
    repository.create(booking);

    expect(dbMock.write.mock.calls.length).toBe(1);
  });
});

describe('Get all Bookings', function () {
  test('Get all booking => OK', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, jetpackId: "11", start_date: "2019-09-01", end_date: "2019-12-31"},
        {id: 2, jetpackId: "12", start_date: "2019-09-01", end_date: "2019-12-31"}
      ])
    };
    const repository = new BookingRepository(dbMock);

    expect(repository.getAllBookings()).toEqual([
      {id: 1, jetpackId: "11", start_date: "2019-09-01", end_date: "2019-12-31"},
      {id: 2, jetpackId: "12", start_date: "2019-09-01", end_date: "2019-12-31"}
    ])
  });
});
