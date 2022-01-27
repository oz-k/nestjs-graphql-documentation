import { IOffsetPaginatedInfo, IOffsetPaginatedResult } from '@a-part/mongoose-pagination-plugin';
import { Type } from "@nestjs/common";
import { ObjectType } from "@nestjs/graphql";
import { GraphQLInt } from "graphql";
import { Field } from './field';

@ObjectType()
class OffsetPaginatedInfo implements IOffsetPaginatedInfo {
    @Field(() => GraphQLInt, {
        name: '총 아이템 개수',
        required: true
    })()
    totalCount: number;
}

/**
 * 오프셋기반 페이지네이션 result dto를 만드는 함수
 * @param classRef 페이징된 item의 타입
 * @returns dto
 * @author oz-k
 */
export function OffsetPaginatedResult<T>(classRef: Type<T>): Type<IOffsetPaginatedResult<T>> {
    @ObjectType()
    class OffsetPaginatedDto implements IOffsetPaginatedResult<T> {
        @Field(() => OffsetPaginatedInfo, {
            name: '페이징정보',
            required: true
        })()
        offsetPaginatedInfo: OffsetPaginatedInfo;
        
        @Field(() => [classRef], {
            name: '아이템들',
            required: true
        })()
        items: T[];
    }

    return OffsetPaginatedDto;
}