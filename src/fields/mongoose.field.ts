import { GraphQLISODateTime } from "@nestjs/graphql";
import { Types } from "mongoose";
import { Field } from "./field";
import { GraphQLObjectID } from 'graphql-scalars';

export const ObjectIdField = Field(() => GraphQLObjectID, {
    name: '고유 아이디',
    example: new Types.ObjectId(),
    required: true
});

export const CreatedAtField = Field(() => GraphQLISODateTime, {
    name: '생성일',
    example: new Date(),
    required: true
});

export const UpdatedAtField = Field(() => GraphQLISODateTime, {
    name: '최종 수정일',
    example: new Date(),
    required: true
});