import { Experience } from './experience.model';

export interface Cv {
  firstName: string;
  lastName: string;
  birthDate: Date;
  experiences: Experience[];
}
