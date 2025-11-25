import { Expose } from 'class-transformer';

export class UserSerializationDTO {
  @Expose()
  name: string;

  @Expose()
  email: string;
}
