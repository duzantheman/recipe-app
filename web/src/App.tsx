import { useQuery, gql } from '@apollo/client'

const GET_BOOKS = gql`
  query GetBooks {
    books {
      author
      title
    }
  }
`

type BooksType = {
  books: {
    author: string
    title: string
  }[]
}

const DisplayLocations = () => {
  const { loading, error, data } = useQuery<BooksType>(GET_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <>
      {data?.books.map(({ author, title }, index) => (
        <div key={index}>
          <h3>{title}</h3>
          <p>{author}</p>
          <br />
        </div>
      ))}
    </>
  )
}

const App = () => {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
    </div>
  )
}

export default App
