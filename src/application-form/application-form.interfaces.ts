interface OptionData {
  id: string;
  name: string;
}

interface Course extends OptionData { }

interface State extends OptionData { }

interface City extends OptionData {
  stateId: string;
}

interface ApplicationFormData {
  courses: Course[];
  states: State[];
  cities: City[];
}

interface ApplicationFormValues {
  name: string;
  courses: string;
  state: string;
  city: string;
}

interface Applicant {
  name: string;
  stateId: string;
  cityId: string;
  courseId: string;
  date: Date;
}

export default ApplicationFormData;
export type {
  City,
  State,
  Course,
  Applicant,
  OptionData,
  ApplicationFormValues,
};
