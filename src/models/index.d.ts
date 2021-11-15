import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

export declare class HeartRate {
  readonly id: string;
  readonly mHR: (number | null)[];
  readonly fHR: (number | null)[];
  readonly createdTime: number;
  constructor(init: ModelInit<HeartRate>);
  static copyOf(source: HeartRate, mutator: (draft: MutableModel<HeartRate>) => MutableModel<HeartRate> | void): HeartRate;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email?: string;
  readonly avatarKey?: string;
  readonly description?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class CtgImage {
  readonly id: string;
  readonly ctgUrl?: string;
  readonly ecgUrl?: string;
  readonly dataset: string;
  readonly userId?: string;
  readonly username?: string;
  readonly createdTime: number;
  constructor(init: ModelInit<CtgImage>);
  static copyOf(source: CtgImage, mutator: (draft: MutableModel<CtgImage>) => MutableModel<CtgImage> | void): CtgImage;
}

export declare class SliderValue {
  readonly id: string;
  readonly deviceId: string;
  readonly createdTime: number;
  readonly value?: number;
  constructor(init: ModelInit<SliderValue>);
  static copyOf(source: SliderValue, mutator: (draft: MutableModel<SliderValue>) => MutableModel<SliderValue> | void): SliderValue;
}

export declare class Ctg {
  readonly id: string;
  readonly ctgUrl?: string;
  readonly ecgUrl?: string;
  readonly comment?: string;
  readonly patientID?: string;
  readonly doctorID?: string;
  readonly hospitalID?: string;
  readonly createdTime: number;
  constructor(init: ModelInit<Ctg>);
  static copyOf(source: Ctg, mutator: (draft: MutableModel<Ctg>) => MutableModel<Ctg> | void): Ctg;
}

export declare class CtgNumerical {
  readonly id: string;
  readonly name?: string;
  readonly ctgJsonUrl?: string;
  readonly ctgUrl?: string;
  readonly ecgUrl?: string;
  readonly comment?: string;
  readonly patientID?: string;
  readonly doctorID?: string;
  readonly hospitalID?: string;
  readonly lost?: number;
  readonly accepted?: string;
  readonly ga?: number;
  readonly bmi?: number;
  readonly pod?: string;
  readonly sessionTime?: number;
  readonly createdTime: number;
  constructor(init: ModelInit<CtgNumerical>);
  static copyOf(source: CtgNumerical, mutator: (draft: MutableModel<CtgNumerical>) => MutableModel<CtgNumerical> | void): CtgNumerical;
}

export declare class Patient {
  readonly id: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly doctorID?: string;
  constructor(init: ModelInit<Patient>);
  static copyOf(source: Patient, mutator: (draft: MutableModel<Patient>) => MutableModel<Patient> | void): Patient;
}

export declare class Doctor {
  readonly id: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly department?: string;
  readonly hospitalID?: string;
  readonly Patients?: (Patient | null)[];
  constructor(init: ModelInit<Doctor>);
  static copyOf(source: Doctor, mutator: (draft: MutableModel<Doctor>) => MutableModel<Doctor> | void): Doctor;
}

export declare class Hospital {
  readonly id: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
  constructor(init: ModelInit<Hospital>);
  static copyOf(source: Hospital, mutator: (draft: MutableModel<Hospital>) => MutableModel<Hospital> | void): Hospital;
}