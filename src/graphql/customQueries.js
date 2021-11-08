export const listCtgNumericalsByDoctorID = `
        query ListCtgNumericalsByDoctorID(
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