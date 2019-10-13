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
  const dbMock = {
    get : jest.fn().mockReturnThis(),
    value : jest.fn().mockReturnValue([
      {id:1, name:"jetpack1", image:"image_jetpack1.img"},
      {id:2, name:"jetpack2", image:"image_jetpack2.img"}
    ])
  };
  const repository = new JetpackRepository(dbMock);

  expect(repository.getAll()).toEqual(
    [{ id: 1,
      name: 'jetpack1',
      image: 'image_jetpack1.img'
    },
      { id: 2,
        name: 'jetpack2',
        image: 'image_jetpack2.img'
      }]);
});
