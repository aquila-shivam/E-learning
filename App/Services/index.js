import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/clrg1l21d0dd001w93durt840/master'

export const getCourseList = async (level) => {

  const query = gql`
    query CourseList {
        courses(where : {level : `+ level + `}) {
          id
          name
          price
          level
          tags
          time
          author
          description {
            markdown
          }
          banner {
            url
          }
          chapters {
            title
            id
            content {
              heading
              description {
                markdown
              }
              output {
                markdown
              }
            }
          }
        }
      }
    `


  const result = await request(MASTER_URL, query);
  return result;
}


export const enrolledCourse = async (courseId,userEmail) => {

  const mutationQuery = gql`
  mutation MyMutation {
    createUserEnrolledCourse(
      data: {courseId: "`+courseId+`",
       userEmail: "`+userEmail+`",
       course: {connect: {id: "`+courseId+`"}}}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
  `

  const result = await request(MASTER_URL, mutationQuery);
  return result;
}