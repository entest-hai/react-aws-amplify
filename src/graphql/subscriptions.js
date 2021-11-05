/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHeartRate = /* GraphQL */ `
  subscription OnCreateHeartRate {
    onCreateHeartRate {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHeartRate = /* GraphQL */ `
  subscription OnUpdateHeartRate {
    onUpdateHeartRate {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHeartRate = /* GraphQL */ `
  subscription OnDeleteHeartRate {
    onDeleteHeartRate {
      id
      mHR
      fHR
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateCtgImage = /* GraphQL */ `
  subscription OnCreateCtgImage {
    onCreateCtgImage {
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
export const onUpdateCtgImage = /* GraphQL */ `
  subscription OnUpdateCtgImage {
    onUpdateCtgImage {
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
export const onDeleteCtgImage = /* GraphQL */ `
  subscription OnDeleteCtgImage {
    onDeleteCtgImage {
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
export const onCreateSliderValue = /* GraphQL */ `
  subscription OnCreateSliderValue {
    onCreateSliderValue {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSliderValue = /* GraphQL */ `
  subscription OnUpdateSliderValue {
    onUpdateSliderValue {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSliderValue = /* GraphQL */ `
  subscription OnDeleteSliderValue {
    onDeleteSliderValue {
      id
      deviceId
      createdTime
      value
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCtg = /* GraphQL */ `
  subscription OnCreateCtg {
    onCreateCtg {
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
export const onUpdateCtg = /* GraphQL */ `
  subscription OnUpdateCtg {
    onUpdateCtg {
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
export const onDeleteCtg = /* GraphQL */ `
  subscription OnDeleteCtg {
    onDeleteCtg {
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
export const onCreateCtgNumerical = /* GraphQL */ `
  subscription OnCreateCtgNumerical {
    onCreateCtgNumerical {
      id
      ctgJsonUrl
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      sessionTime
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCtgNumerical = /* GraphQL */ `
  subscription OnUpdateCtgNumerical {
    onUpdateCtgNumerical {
      id
      ctgJsonUrl
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      sessionTime
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCtgNumerical = /* GraphQL */ `
  subscription OnDeleteCtgNumerical {
    onDeleteCtgNumerical {
      id
      ctgJsonUrl
      ctgUrl
      ecgUrl
      comment
      patientID
      doctorID
      hospitalID
      sessionTime
      createdTime
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient {
    onCreatePatient {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient {
    onDeletePatient {
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
export const onCreateDoctor = /* GraphQL */ `
  subscription OnCreateDoctor {
    onCreateDoctor {
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
export const onUpdateDoctor = /* GraphQL */ `
  subscription OnUpdateDoctor {
    onUpdateDoctor {
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
export const onDeleteDoctor = /* GraphQL */ `
  subscription OnDeleteDoctor {
    onDeleteDoctor {
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
export const onCreateHospital = /* GraphQL */ `
  subscription OnCreateHospital {
    onCreateHospital {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHospital = /* GraphQL */ `
  subscription OnUpdateHospital {
    onUpdateHospital {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHospital = /* GraphQL */ `
  subscription OnDeleteHospital {
    onDeleteHospital {
      id
      name
      phone
      address
      createdAt
      updatedAt
    }
  }
`;
