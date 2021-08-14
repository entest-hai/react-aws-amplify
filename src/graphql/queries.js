/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHeartRate = /* GraphQL */ `
  query GetHeartRate($id: ID!) {
    getHeartRate(id: $id) {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const listHeartRates = /* GraphQL */ `
  query ListHeartRates(
    $filter: ModelHeartRateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeartRates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mHR
        fHR
        createdTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        avatarKey
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCTG = /* GraphQL */ `
  query GetCTG($id: ID!) {
    getCTG(id: $id) {
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
export const listCTGs = /* GraphQL */ `
  query ListCTGs(
    $filter: ModelCTGFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCTGs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCTGImage = /* GraphQL */ `
  query GetCTGImage($id: ID!) {
    getCTGImage(id: $id) {
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
export const listCTGImages = /* GraphQL */ `
  query ListCTGImages(
    $filter: ModelCTGImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCTGImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSliderValue = /* GraphQL */ `
  query GetSliderValue($id: ID!) {
    getSliderValue(id: $id) {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const listSliderValues = /* GraphQL */ `
  query ListSliderValues(
    $filter: ModelSliderValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSliderValues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        deviceId
        createdTime
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const cTGImagesByDataset = /* GraphQL */ `
  query CTGImagesByDataset(
    $dataset: String
    $sortDirection: ModelSortDirection
    $filter: ModelCTGImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CTGImagesByDataset(
      dataset: $dataset
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const sliderValueByCreatedTime = /* GraphQL */ `
  query SliderValueByCreatedTime(
    $deviceId: ID
    $createdTime: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSliderValueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    SliderValueByCreatedTime(
      deviceId: $deviceId
      createdTime: $createdTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        deviceId
        createdTime
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
