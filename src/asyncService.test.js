import { asyncService } from "./asyncService";

jest.mock("./asyncService", () => {
  return {
    __esModule: true,
    asyncService: jest.fn(),
  };
    
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Jest mock resolved value study', () => {
  test('A mock with resolved value set using jest.fn().mockResolvedValue ' +
    'should always return a Promise whose resolved value is the same value that it was passed', async () => {
    
    const value = {
      data: "Some data"
    };
    asyncService.mockResolvedValue(value);
    
    const firstResultOfServiceCall = await asyncService();
    const secondResultOfServiceCall = await asyncService();
    expect(firstResultOfServiceCall).toBe(secondResultOfServiceCall);
  });

  test('A mock with resolved value set using jest.fn().mockImplementation ' +
    'should always return a Promise whose resolved value is unique, because that value was created from scratch ' +
    'inside a callback function which is called every time the mock is called', async () => {
    
    asyncService.mockImplementation(() => {
      const value = {
        data: "Some data"
      };
      return Promise.resolve(value);
    });

    const firstResultOfServiceCall = await asyncService();
    const secondResultOfServiceCall = await asyncService();
    expect(firstResultOfServiceCall).not.toBe(secondResultOfServiceCall);
  });
});