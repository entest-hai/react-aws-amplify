/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createHeartRate = /* GraphQL */ `
  mutation CreateHeartRate(
    $input: CreateHeartRateInput!
    $condition: ModelHeartRateConditionInput
  ) {
    createHeartRate(input: $input, condition: $condition) {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const updateHeartRate = /* GraphQL */ `
  mutation UpdateHeartRate(
    $input: UpdateHeartRateInput!
    $condition: ModelHeartRateConditionInput
  ) {
    updateHeartRate(input: $input, condition: $condition) {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteHeartRate = /* GraphQL */ `
  mutation DeleteHeartRate(
    $input: DeleteHeartRateInput!
    $condition: ModelHeartRateConditionInput
  ) {
    deleteHeartRate(input: $input, condition: $condition) {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      avatarKey
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      avatarKey
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      avatarKey
      description
      createdAt
      updatedAt
    }
  }
`;
export const createCtgImage = /* GraphQL */ `
  mutation CreateCtgImage(
    $input: CreateCtgImageInput!
    $condition: ModelCtgImageConditionInput
  ) {
    createCtgImage(input: $input, condition: $condition) {
      id
      ctgUrl
      ecgUrl
      dataset
      userId
      username
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const updateCtgImage = /* GraphQL */ `
  mutation UpdateCtgImage(
    $input: UpdateCtgImageInput!
    $condition: ModelCtgImageConditionInput
  ) {
    updateCtgImage(input: $input, condition: $condition) {
      id
      ctgUrl
      ecgUrl
      dataset
      userId
      username
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteCtgImage = /* GraphQL */ `
  mutation DeleteCtgImage(
    $input: DeleteCtgImageInput!
    $condition: ModelCtgImageConditionInput
  ) {
    deleteCtgImage(input: $input, condition: $condition) {
      id
      ctgUrl
      ecgUrl
      dataset
      userId
      username
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const createSliderValue = /* GraphQL */ `
  mutation CreateSliderValue(
    $input: CreateSliderValueInput!
    $condition: ModelSliderValueConditionInput
  ) {
    createSliderValue(input: $input, condition: $condition) {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateSliderValue = /* GraphQL */ `
  mutation UpdateSliderValue(
    $input: UpdateSliderValueInput!
    $condition: ModelSliderValueConditionInput
  ) {
    updateSliderValue(input: $input, condition: $condition) {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteSliderValue = /* GraphQL */ `
  mutation DeleteSliderValue(
    $input: DeleteSliderValueInput!
    $condition: ModelSliderValueConditionInput
  ) {
    deleteSliderValue(input: $input, condition: $condition) {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const createCtg = /* GraphQL */ `
  mutation CreateCtg(
    $input: CreateCtgInput!
    $condition: ModelCtgConditionInput
  ) {
    createCtg(input: $input, condition: $condition) {
      id
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const updateCtg = /* GraphQL */ `
  mutation UpdateCtg(
    $input: UpdateCtgInput!
    $condition: ModelCtgConditionInput
  ) {
    updateCtg(input: $input, condition: $condition) {
      id
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteCtg = /* GraphQL */ `
  mutation DeleteCtg(
    $input: DeleteCtgInput!
    $condition: ModelCtgConditionInput
  ) {
    deleteCtg(input: $input, condition: $condition) {
      id
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const createCtgNumerical = /* GraphQL */ `
  mutation CreateCtgNumerical(
    $input: CreateCtgNumericalInput!
    $condition: ModelCtgNumericalConditionInput
  ) {
    createCtgNumerical(input: $input, condition: $condition) {
      id
      name
      ctgJsonUrl
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      lost
      accepted
      ga
      bmi
      pod
      sessionTime
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const updateCtgNumerical = /* GraphQL */ `
  mutation UpdateCtgNumerical(
    $input: UpdateCtgNumericalInput!
    $condition: ModelCtgNumericalConditionInput
  ) {
    updateCtgNumerical(input: $input, condition: $condition) {
      id
      name
      ctgJsonUrl
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      lost
      accepted
      ga
      bmi
      pod
      sessionTime
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteCtgNumerical = /* GraphQL */ `
  mutation DeleteCtgNumerical(
    $input: DeleteCtgNumericalInput!
    $condition: ModelCtgNumericalConditionInput
  ) {
    deleteCtgNumerical(input: $input, condition: $condition) {
      id
      name
      ctgJsonUrl
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      lost
      accepted
      ga
      bmi
      pod
      sessionTime
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
      id
      name
      phone
      address
      doctorID
      createdAt
      updatedAt
    }
  }
`;
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
      id
      name
      phone
      address
      doctorID
      createdAt
      updatedAt
    }
  }
`;
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
      id
      name
      phone
      address
      doctorID
      createdAt
      updatedAt
    }
  }
`;
export const createDoctor = /* GraphQL */ `
  mutation CreateDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
      id
      name
      phone
      address
      department
      hospitalID
      Patients {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDoctor = /* GraphQL */ `
  mutation UpdateDoctor(
    $input: UpdateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    updateDoctor(input: $input, condition: $condition) {
      id
      name
      phone
      address
      department
      hospitalID
      Patients {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDoctor = /* GraphQL */ `
  mutation DeleteDoctor(
    $input: DeleteDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    deleteDoctor(input: $input, condition: $condition) {
      id
      name
      phone
      address
      department
      hospitalID
      Patients {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createHospital = /* GraphQL */ `
  mutation CreateHospital(
    $input: CreateHospitalInput!
    $condition: ModelHospitalConditionInput
  ) {
    createHospital(input: $input, condition: $condition) {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
export const updateHospital = /* GraphQL */ `
  mutation UpdateHospital(
    $input: UpdateHospitalInput!
    $condition: ModelHospitalConditionInput
  ) {
    updateHospital(input: $input, condition: $condition) {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
export const deleteHospital = /* GraphQL */ `
  mutation DeleteHospital(
    $input: DeleteHospitalInput!
    $condition: ModelHospitalConditionInput
  ) {
    deleteHospital(input: $input, condition: $condition) {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
