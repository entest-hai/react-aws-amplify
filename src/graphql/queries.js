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
export const getCtgImage = /* GraphQL */ `
  query GetCtgImage($id: ID!) {
    getCtgImage(id: $id) {
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
export const listCtgImages = /* GraphQL */ `
  query ListCtgImages(
    $filter: ModelCtgImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCtgImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getCtg = /* GraphQL */ `
  query GetCtg($id: ID!) {
    getCtg(id: $id) {
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
export const listCtgs = /* GraphQL */ `
  query ListCtgs(
    $filter: ModelCtgFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCtgs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCtgNumerical = /* GraphQL */ `
  query GetCtgNumerical($id: ID!) {
    getCtgNumerical(id: $id) {
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
export const listCtgNumericals = /* GraphQL */ `
  query ListCtgNumericals(
    $filter: ModelCtgNumericalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCtgNumericals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
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
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        address
        doctorID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDoctor = /* GraphQL */ `
  query GetDoctor($id: ID!) {
    getDoctor(id: $id) {
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
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        address
        department
        hospitalID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHospital = /* GraphQL */ `
  query GetHospital($id: ID!) {
    getHospital(id: $id) {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
export const listHospitals = /* GraphQL */ `
  query ListHospitals(
    $filter: ModelHospitalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHospitals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phone
        address
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ctgImagesByDataset = /* GraphQL */ `
  query CtgImagesByDataset(
    $dataset: String
    $sortDirection: ModelSortDirection
    $filter: ModelCtgImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CtgImagesByDataset(
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
export const ctgsByDoctorID = /* GraphQL */ `
  query CtgsByDoctorID(
    $doctorID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCtgFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CtgsByDoctorID(
      doctorID: $doctorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ctgsByPatientID = /* GraphQL */ `
  query CtgsByPatientID(
    $patientID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCtgFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CtgsByPatientID(
      patientID: $patientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ctgNumericalsByHospitalID = /* GraphQL */ `
  query CtgNumericalsByHospitalID(
    $hospitalID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCtgNumericalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CtgNumericalsByHospitalID(
      hospitalID: $hospitalID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ctgNumericalsByDoctorID = /* GraphQL */ `
  query CtgNumericalsByDoctorID(
    $doctorID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCtgNumericalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CtgNumericalsByDoctorID(
      doctorID: $doctorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ctgNumericalsByPatientD = /* GraphQL */ `
  query CtgNumericalsByPatientD(
    $patientID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCtgNumericalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    CtgNumericalsByPatientD(
      patientID: $patientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const patientsByDoctorID = /* GraphQL */ `
  query PatientsByDoctorID(
    $doctorID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    PatientsByDoctorID(
      doctorID: $doctorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phone
        address
        doctorID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const doctorsByHospitalID = /* GraphQL */ `
  query DoctorsByHospitalID(
    $hospitalID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    DoctorsByHospitalID(
      hospitalID: $hospitalID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phone
        address
        department
        hospitalID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
