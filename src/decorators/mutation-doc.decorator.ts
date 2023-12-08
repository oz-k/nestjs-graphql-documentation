import { ReturnTypeFunc, Mutation, MutationOptions } from '@nestjs/graphql';
import { ErrorDocumentationOptions, ResolverDocumentationOptions } from '../interfaces';
import { stringifyResolverDocumentationOption } from '../utils';

type OmittedMutationOptions = Omit<MutationOptions, 'description'>;

/**
 * 기존 nestjs graphql Mutation 데코레이터에 명세옵션을 추가한 데코레이터
 * @param typeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param options mutation 옵션
 */
export function MutationDoc(typeFunc: ReturnTypeFunc, documentationOptions: ResolverDocumentationOptions, options?: OmittedMutationOptions): MethodDecorator;

/**
 * 기존 nestjs graphql Mutation 데코레이터에 명세옵션을 추가한 데코레이터
 * @param typeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param errorDocumentationOptionsArray 에러 명세 옵션
 * @param options mutation 옵션
 */
export function MutationDoc(typeFunc: ReturnTypeFunc, documentationOptions: ResolverDocumentationOptions, errorDocumentationOptionsArray: ErrorDocumentationOptions[], options?: OmittedMutationOptions): MethodDecorator;

export function MutationDoc(
    typeFunc: ReturnTypeFunc,
    documentationOptions: ResolverDocumentationOptions,
    errorDocumentationOptionsArrayOrOptions?: ErrorDocumentationOptions[] | OmittedMutationOptions,
    options?: OmittedMutationOptions
): MethodDecorator {
    if(errorDocumentationOptionsArrayOrOptions && Array.isArray(errorDocumentationOptionsArrayOrOptions)) {
        return Mutation(typeFunc, {
            ...options,
            description: stringifyResolverDocumentationOption(documentationOptions, errorDocumentationOptionsArrayOrOptions),
        });
    }
    
    return Mutation(typeFunc, {
        ...errorDocumentationOptionsArrayOrOptions,
        description: stringifyResolverDocumentationOption(documentationOptions),
    });
}