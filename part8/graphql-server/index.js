const {
  ApolloServer,
  AuthenticationError,
  UserInputError,
  gql,
} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const MONGODB_URI =
  'mongodb+srv://dbUser:dbPassword@cluster0.qresr.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'SECRET'

;(async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('connected to MongoDB')
  } catch (err) {
    console.log('error connecting to MongoDB', err.message)
  }
})()

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: [Book]!
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      authors.forEach((author) => (author.bookCount = author.books.length))
      return authors
    },
    allBooks: async (root, args) => {
      let id = await Author.find({ name: args.author })
      if (args.author && args.genre) {
        return Book.find({
          $and: [{ author: id }, { genres: { $in: [args.genre] } }],
        }).populate('author')
      } else if (args.author) {
        return Book.find({ author: id }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    allGenres: () => Book.find({}),
    me: (root, args, context) => context.currUser,
  },

  Mutation: {
    addBook: async (root, args, { currUser }) => {
      if (!currUser) {
        throw new AuthenticationError('Please login first')
      }

      let currAuthor = await Author.find({ name: args.author })
      let id
      if (currAuthor.length === 0) {
        if (args.author.length < 4) {
          throw new UserInputError('Name is too short', {
            invalidArgs: args.title,
          })
        } else {
          currAuthor = new Author({ name: args.author })
          await currAuthor.save()
          id = currAuthor.id
        }
      } else {
        currAuthor = currAuthor[0]
        id = currAuthor.id
      }

      try {
        if (args.title.length < 2) {
          throw new UserInputError('Title is too short', {
            invalidArgs: args.title,
          })
        } else {
          const book = new Book({ ...args, author: id })
          await book.save()

          currAuthor.books.push(book.id)
          await currAuthor.save()

          const newBook = await Book.findOne({ title: book.title }).populate(
            'author'
          )
          return newBook
        }
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args })
      }
    },

    editAuthor: async (root, args, { currUser }) => {
      if (!currUser) {
        throw new AuthenticationError('Please login first')
      }

      let currAuthor = await Author.find({ name: args.name })
      if (currAuthor.length === 0) {
        throw new UserInputError("Author doesn't exist", {
          invalidArgs: args.name,
        })
      } else {
        currAuthor = currAuthor[0]
      }
      currAuthor.born = args.setBornTo

      try {
        await currAuthor.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return currAuthor
    },

    createUser: async (root, args) => {
      const newUser = new User({ ...args })

      try {
        if (args.username.length < 4) {
          throw new UserInputError('Username is too short', {
            invalidArgs: args.username,
          })
        } else {
          return await newUser.save()
        }
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong credentials', { invalidArgs: args })
      }

      const tokenUser = {
        username: user.username,
        id: user.id,
      }

      return { value: jwt.sign(tokenUser, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req.headers.authorization || ''

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = jwt.verify(auth.substring(7), JWT_SECRET)
      const currUser = await User.findById(token.id)

      return { currUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
