const JetpackRepository = require('./JetpackRepository');
const JetPack = require('../Entity/Jetpack');

describe('Jetpack Repository create', function () {

  test('Create null jetpack => throw error', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new JetpackRepository(dbMock);

    expect(() => {repository.create()})
      .toThrow('Jetpack object is undefined');
  });

  test('Create jetpack without name => throw error', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new JetpackRepository(dbMock);

    expect(() => {repository.create({id:1, name: "", image:"mon_image.png" })})
      .toThrow('Jetpack object is missing information');
  });

  test('Create jetpack without id => throw error', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new JetpackRepository(dbMock);

    expect(() => {repository.create({id:'', name: "Jetpack test", image:"mon_image.png" })})
      .toThrow('Jetpack object is missing information');
  });

  test('Create complete jetpack => OK', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new JetpackRepository(dbMock);
    let jetpack = new JetPack();
    jetpack.id = 1;
    jetpack.name = "Jetpack1";
    jetpack.image = "image_jetpack1.png";
    repository.create(jetpack);

    expect(dbMock.write.mock.calls.length).toBe(1);
  });

});

describe('Jetpack repository getAll', function () {
  test('Get all the 2 jetpacks => OK', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, name: "jetpack1", image: "image_jetpack1.img"},
        {id: 2, name: "jetpack2", image: "image_jetpack2.img"}
      ])
    };
    const repository = new JetpackRepository(dbMock);

    expect(repository.getAll()).toEqual(
      [
        {id: 1, name: 'jetpack1', image: 'image_jetpack1.img'},
        {id: 2, name: 'jetpack2', image: 'image_jetpack2.img'}
        ]
    );
  });

  test('Get all empty jetpack list => empty list', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([])
    };
    const repository = new JetpackRepository(dbMock);

    expect(repository.getAll()).toEqual([]);
  });
});

describe('Jetpack repository getJetpackById', function () {
  test('Get jetpack by ID 1 => Return the Jetpack', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, name: "jetpack1", image: "image_jetpack1.img"}
      ])
    };
    const repository = new JetpackRepository(dbMock);

    expect(repository.getJetpackById(1)).toEqual(
      [{
        id: 1,
        name: 'jetpack1',
        image: 'image_jetpack1.img'
      }]
    );
  });

  test('Get jetpack by non unique ID 1 => Return all the Jetpack of ID 1', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, name: "jetpack1", image: "image_jetpack1.img"},
        {id: 1, name: "jetpack1bis", image: "image_jetpack1bis.img"}
      ])
    };
    const repository = new JetpackRepository(dbMock);

    expect(repository.getJetpackById(1)).toEqual(
      [
        {id: 1, name: 'jetpack1', image: 'image_jetpack1.img'},
        {id: 1, name: 'jetpack1bis', image: 'image_jetpack1bis.img'}
      ]
    );
  });

  test('Get jetpack without ID => throw "Unable to search empty jetpack ID"', () => {
    const repository = new JetpackRepository();

    expect(() => {repository.getJetpackById()})
      .toThrow('Unable to search empty jetpack ID');
  });
});

describe('Jetpack repository getJetpacksAvailable', function () {
  test('Get jetpack available => Return the Jetpack', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, name: "jetpack1", image: "image_jetpack1.img"},
        {id: 2, name: "jetpack2", image: "image_jetpack2.img"}
      ])
    };
    const repository = new JetpackRepository(dbMock);

    expect(repository.getJetpacksAvailable("2019-01-01", "2019-03-01")).toEqual(
      [{

        id: 1,
        name: 'jetpack1',
        image: 'image_jetpack1.img'
      },
      {
        id: 2,
        name: 'jetpack2',
        image: 'image_jetpack2.img'
      }]
    );
  });

  test('Get jetpack without dates => throw \"You have to choose start and end dates\"', () => {
    const repository = new JetpackRepository();

    expect(() => {repository.getJetpacksAvailable()})
      .toThrow('You have to choose start and end dates');
  });

  test('Get jetpack with 1 date => throw \"You have to choose start and end dates\"', () => {
    const repository = new JetpackRepository();

    expect(() => {repository.getJetpacksAvailable("2019-01-01")})
      .toThrow('You have to choose start and end dates');
  });

  test('Get jetpack with inverted dates => throw \"The end date cannot be anterior to start date!\"', () => {
    const repository = new JetpackRepository();

    expect(() => {repository.getJetpacksAvailable("2019-03-01", "2019-01-01")})
      .toThrow('The end date cannot be anterior to start date!');
  });

  test('Get jetpack available => Return the Jetpack', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id: 1, name: "jetpack1", image: "image_jetpack1.img"}
      ])
    };
    const repository = new JetpackRepository(dbMock);

    expect(repository.getJetpacksAvailable("2019-01-01", "2019-03-01")).toEqual(
      [{
        id: 1,
        name: 'jetpack1',
        image: 'image_jetpack1.img'
      }]
    );
  });
});
