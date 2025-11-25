import { Matches } from 'class-validator';

export const IsName = () => {
  return Matches(/^[a-zA-Z\s'-]+$/, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  });
};
