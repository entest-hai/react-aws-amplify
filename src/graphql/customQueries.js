export const listCtgNumericalsByDoctorID = `
        query ListCtgNumericalsByDoctorID(
            $filter: ModelCtgNumericalFilterInput
            $limit: Int
            $nextToken: String
        ) {
          listCtgNumericals(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
              id
              comment
              ctgJsonUrl
              ctgUrl
              doctorID
              hospitalID
              patientID
              sessionTime
              createdTime
            }
            nextToken
          }
    }
`;