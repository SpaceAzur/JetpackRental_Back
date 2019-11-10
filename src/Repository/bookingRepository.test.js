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

  test('Get all booking => None', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([])
    };
    const repository = new BookingRepository(dbMock);

    expect(repository.getAllBookings()).toEqual([])
  });
});

describe('Get Booking by ID', function () {
  test('Get booking => OK', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        { id: "rg456kj", 
          jetpackId: "jetpack1", 
          start_date: "2019-09-01",
          end_date: "2019-12-31"
        }
      ])
    };
    const repository = new BookingRepository(dbMock);
    expect(repository.getBookingById("rg456kj")).toEqual(
        [{ id: "rg456kj", 
          jetpackId: "jetpack1", 
          start_date: "2019-09-01",
          end_date: "2019-12-31"
        }]
      );
    });
  
  test("get booking by Id => No id received in function", () => {
    let dbMock = {};
    let repository = new BookingRepository(dbMock);
    expect(()=>{repository.getBookingById()}).toThrow("id is missing");  
  });

});


describe('Check is jetpack available', function () {
  test('isJetpackAvailable => OK', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, jetpackId: "11", start_date: "2019-09-01", end_date: "2019-12-31"}
      ])
    };
    const repository = new BookingRepository(dbMock);

    expect(repository.isJetpackAvailable("11", "2019-01-01", "2019-03-01"))
      .toEqual(true)
  });

  test('isJetpackAvailable without jetpackId => throw Unable to search a jetpack in bookings whithout id', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnThis()
    };
    const repository = new BookingRepository(dbMock);

    expect(() => {
      repository.isJetpackAvailable(
        undefined,
        "2019-09-01",
        "2019-12-31"
      )
    }).toThrow('Unable to search a jetpack in bookings whithout id');

  });

  test('Jetpack not booked already => return true (jetpack available)', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue(undefined) // Verifier que value renoie un objet vide si n'a pas trouvé
    };
    const repository = new BookingRepository(dbMock);

    expect(repository.isJetpackAvailable("11", "2019-01-01", "2019-03-01"))
      .toEqual(true)
  });
});

describe('Overlapse booking interval', function () {
  test('Test overlapsed intervals => true', () => {
    const repository = new BookingRepository();
    expect(repository.overlaps(
      "2019-09-01",
      "2019-12-31",
      "2019-09-01",
      "2019-12-31"
    ))
      .toBe(true);
  });

  test('Test non overlapsed intervals => false', () => {
    const repository = new BookingRepository();
    expect(repository.overlaps(
      "2019-01-01",
      "2019-03-31",
      "2019-09-01",
      "2019-12-31"
    ))
      .toBe(false);
  });
});

describe('Update Booking', function () {
  test('Update booking => OK', () => {
  //   const previous_dbMock = {
  //   get: jest.fn().mockReturnThis(),
  //   find: jest.fn().mockReturnThis(),
  //   value: jest.fn().mockReturnValue([
  //     { id: "rg456kj", 
  //       jetpackId: "jetpack1", 
  //       start_date: "2019-09-01",
  //       end_date: "2019-12-31"
  //     }])
  //   };
  //   const new_dbMock = {
  //     get: jest.fn().mockReturnThis(),
  //     assign: jest.fn().mockReturnThis(),
  //     write: jest.fn().mockReturnValue([
  //       { id: "rg456kj", 
  //         jetpackId: "jetpack38", 
  //         start_date: "2019-09-01",
  //         end_date: "2019-12-31"
  //       }])
  //   };

  //   let repository1 = new BookingRepository(previous_dbMock);
  //   let repository2 = new BookingRepository(new_dbMock);

  //   expect(repository2.updateBooking(
  //     { id: "rg456kj", 
  //       jetpackId: "jetpack38", 
  //       start_date: "2019-09-01",
  //       end_date: "2019-12-31"
  //   })).toEqual(
  //     { id: "rg456kj", 
  //       jetpackId: "jetpack38", 
  //       start_date: "2019-09-01",
  //       end_date: "2019-12-31"
  //     });
  });
});

describe('Delete Booking', function () {
  test('Delete booking => OK', () => {
  });
});