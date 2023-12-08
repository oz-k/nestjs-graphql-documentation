import { FieldOptions, ResolveField, ReturnTypeFunc } from "@nestjs/graphql";
import { FieldDocumentationOptions } from '../interfaces';
import { stringifyFieldDocumentationOptions } from '../utils';

type OmittedFieldOptions = Omit<FieldOptions, 'description' | 'nullable'>;

/**
 * 기존 nestjs graphql ResolveField 데코레이터에 명세옵션을 추가한 데코레이터
 * @param propertyName resolve될 프로퍼티명
 * @param returnTypeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param options field 옵션
 */
export function ResolveFieldDoc(
    propertyName: string,
    returnTypeFunc: ReturnTypeFunc,
    documentationOptions: FieldDocumentationOptions,
    options?: OmittedFieldOptions,
) {
    return ResolveField(propertyName, returnTypeFunc, {
        ...options,
        nullable: !documentationOptions.required,
        description: stringifyFieldDocumentationOptions(documentationOptions),
    });
}