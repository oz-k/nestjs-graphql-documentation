import { ReturnTypeFunc, Subscription, SubscriptionOptions } from '@nestjs/graphql';
import { ErrorDocumentationOptions, ResolverDocumentationOptions } from '../interfaces';
import { stringifyResolverDocumentationOption } from '../utils';

type OmittedSubscriptionOptions = Omit<SubscriptionOptions, 'description'>;

/**
 * 기존 nestjs graphql Subscription 데코레이터에 명세옵션을 추가한 데코레이터
 * @param typeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param options subscription 옵션
 */
export function SubscriptionDoc(typeFunc: ReturnTypeFunc, documentationOptions: ResolverDocumentationOptions, options?: SubscriptionOptions): MethodDecorator;

/**
 * 기존 nestjs graphql Subscription 데코레이터에 명세옵션을 추가한 데코레이터
 * @param typeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param errorDocumentationOptionsArray 에러 명세 옵션
 * @param options subscription 옵션
 */
export function SubscriptionDoc(typeFunc: ReturnTypeFunc, documentationOptions: ResolverDocumentationOptions, errorDocumentationOptionsArray: ErrorDocumentationOptions[], options?: OmittedSubscriptionOptions): MethodDecorator;

export function SubscriptionDoc(
    typeFunc: ReturnTypeFunc,
    documentationOptions: ResolverDocumentationOptions,
    errorDocumentationOptionsArrayOrOptions?: ErrorDocumentationOptions[] | OmittedSubscriptionOptions,
    options?: OmittedSubscriptionOptions,
): MethodDecorator {
    if(errorDocumentationOptionsArrayOrOptions && Array.isArray(errorDocumentationOptionsArrayOrOptions)) {
        return Subscription(typeFunc, {
            ...options,
            description: stringifyResolverDocumentationOption(documentationOptions, errorDocumentationOptionsArrayOrOptions),
        });
    }
    
    return Subscription(typeFunc, {
        ...errorDocumentationOptionsArrayOrOptions as OmittedSubscriptionOptions,
        description: stringifyResolverDocumentationOption(documentationOptions),
    });
}