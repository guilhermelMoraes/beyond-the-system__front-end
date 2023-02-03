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
  name: string;
  courses: Course[];
  state: State[];
  city: City[];
}

export default ApplicationFormData;
export type {
  City,
  State,
  Course,
  OptionData,
};
