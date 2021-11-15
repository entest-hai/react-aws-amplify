// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, HeartRate, User, CtgImage, SliderValue, Ctg, CtgNumerical, Patient, Doctor, Hospital } = initSchema(schema);

export {
  Todo,
  HeartRate,
  User,
  CtgImage,
  SliderValue,
  Ctg,
  CtgNumerical,
  Patient,
  Doctor,
  Hospital
};