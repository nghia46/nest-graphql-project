import { GraphQLError } from 'graphql';

export class GraphQLException extends GraphQLError {
  constructor(message: string, statusCode?: number, note: string = 'This is a custom error message') {
    super(message, {
      extensions: {
        code: statusCode || 500,
        note,
      },
    });
  }
}
