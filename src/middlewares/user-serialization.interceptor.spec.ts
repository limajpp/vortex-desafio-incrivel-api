import { UserSerializationInterceptor } from './user-serialization.interceptor';

describe('UserSerializationInterceptor', () => {
  it('should be defined', () => {
    expect(new UserSerializationInterceptor()).toBeDefined();
  });
});
