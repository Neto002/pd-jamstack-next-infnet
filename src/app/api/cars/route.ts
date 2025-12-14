import { getCarrosMatter } from "@/app/services/car";
import { createSchema, createYoga } from "graphql-yoga";

const cars = getCarrosMatter().map((car) => car.data);

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Car {
        title: String!
        slug: String!
        price: Float!
        year: Int!
        km: Float!
        hero_image: String
        hero_image_alt: String
      }

      type Query {
        cars: [Car!]!
        car(slug: String!): Car
      }
    `,
    resolvers: {
      Query: {
        cars: () => cars,
        car: (_, { slug }) => cars.find((car) => car.slug === slug) || null,
      },
    },
  }),

  graphqlEndpoint: "/api/cars",
});

export { yoga as GET, yoga as POST };
