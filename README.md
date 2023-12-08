# NestJS GraphQL Documentation

NestJS GraphQL Documentation은 NestJS GraphQL 데코레이터에 명세기능을 추가한 데코레이터를 제공합니다.

Altair GraphQL Client와 호환됩니다.

## Usage
```typescript
// Query 예제
@QueryDoc(() => [Post], {name: 'Get All Posts'})

// Mutation 예제
@MutationDoc(() => Post, {
  name: 'Create Post',
  description: 'Only Admin can create post',
})

// Field 예제
@FieldDoc(() => GraphQLInt, {
  name: 'Page Number', 
  required: true,
  example: 17,
  minimum: 1,
})
```