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
export const createCTG = /* GraphQL */ `
  mutation CreateCTG(
    $input: CreateCTGInput!
    $condition: ModelCTGConditionInput
  ) {
    createCTG(input: $input, condition: $condition) {
      id
      userId
      username
      mHR
      fHR
      acelsTime
      acelsDuration
      decelsTime
      decelsDuration
      basvar
      baseline
      stv
      ctgUrl
      ecgUrl
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const updateCTG = /* GraphQL */ `
  mutation UpdateCTG(
    $input: UpdateCTGInput!
    $condition: ModelCTGConditionInput
  ) {
    updateCTG(input: $input, condition: $condition) {
      id
      userId
      username
      mHR
      fHR
      acelsTime
      acelsDuration
      decelsTime
      decelsDuration
      basvar
      baseline
      stv
      ctgUrl
      ecgUrl
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteCTG = /* GraphQL */ `
  mutation DeleteCTG(
    $input: DeleteCTGInput!
    $condition: ModelCTGConditionInput
  ) {
    deleteCTG(input: $input, condition: $condition) {
      id
      userId
      username
      mHR
      fHR
      acelsTime
      acelsDuration
      decelsTime
      decelsDuration
      basvar
      baseline
      stv
      ctgUrl
      ecgUrl
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const createCTGImage = /* GraphQL */ `
  mutation CreateCTGImage(
    $input: CreateCTGImageInput!
    $condition: ModelCTGImageConditionInput
  ) {
    createCTGImage(input: $input, condition: $condition) {
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
export const updateCTGImage = /* GraphQL */ `
  mutation UpdateCTGImage(
    $input: UpdateCTGImageInput!
    $condition: ModelCTGImageConditionInput
  ) {
    updateCTGImage(input: $input, condition: $condition) {
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
export const deleteCTGImage = /* GraphQL */ `
  mutation DeleteCTGImage(
    $input: DeleteCTGImageInput!
    $condition: ModelCTGImageConditionInput
  ) {
    deleteCTGImage(input: $input, condition: $condition) {
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
