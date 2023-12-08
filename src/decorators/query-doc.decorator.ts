import { Query, QueryOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ErrorDocumentationOptions, ResolverDocumentationOptions } from '../interfaces';
import { stringifyResolverDocumentationOption } from '../utils';

type OmittedQueryOptions = Omit<QueryOptions, 'description'>;

/**
 * 기존 nestjs graphql Query 데코레이터에 명세옵션을 추가한 데코레이터
 * @param typeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param options query 옵션
 */
export function QueryDoc(typeFunc: ReturnTypeFunc, documentationOptions: ResolverDocumentationOptions, options?: OmittedQueryOptions): MethodDecorator;

/**
 * 기존 nestjs graphql Query 데코레이터에 명세옵션을 추가한 데코레이터
 * @param typeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param errorDocumentationOptionsArray 에러 명세 옵션
 * @param options 쿼리 옵션
 */
export function QueryDoc(typeFunc: ReturnTypeFunc, documentationOptions: ResolverDocumentationOptions, errorDocumentationOptionsArray: ErrorDocumentationOptions[], options?: OmittedQueryOptions): MethodDecorator;

export function QueryDoc(
    typeFunc: ReturnTypeFunc,
    documentationOptions: ResolverDocumentationOptions,
    errorDocumentationOptionsArrayOrOptions?: ErrorDocumentationOptions[] | OmittedQueryOptions,
    options?: OmittedQueryOptions
): MethodDecorator {
    if(errorDocumentationOptionsArrayOrOptions && Array.isArray(errorDocumentationOptionsArrayOrOptions)) {
        return Query(typeFunc, {
            ...options,
            description: stringifyResolverDocumentationOption(documentationOptions, errorDocumentationOptionsArrayOrOptions),
        });
    }

    return Query(typeFunc, {
        ...errorDocumentationOptionsArrayOrOptions,
        description: stringifyResolverDocumentationOption(documentationOptions),
    });
}