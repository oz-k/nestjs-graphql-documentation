import { Field as GraphQLField, FieldOptions, ReturnTypeFunc } from "@nestjs/graphql";
import { stringifyFieldDocumentationOptions } from "../utils";
import { FieldDocumentationOptions, OmittedFieldOptions } from "../interfaces";

/**
 * 명세옵션이 추가된 Field 데코레이터에 기본값을 먹이는 함수
 * @param defaultReturnTypeFunction graphql의 리턴타입
 * @param defaultDocumentationOptions 명세 옵션
 * @param defaultOptions 필드 옵션
 * @returns Field 데코레이터
 * @author oz-k
 */
export function FieldDefault(
    defaultReturnTypeFunction: ReturnTypeFunc | null, 
    defaultDocumentationOptions: FieldDocumentationOptions, 
    defaultOptions?: OmittedFieldOptions
) {
    /** 기존 graphql의 Field 데코레이터에 명세옵션을 추가한 데코레이터 */
    function Field(documentationOptions?: Partial<FieldDocumentationOptions>, options?: Partial<OmittedFieldOptions>): ReturnType<typeof GraphQLField>;
    function Field(returnTypeFunction?: ReturnTypeFunc, documentationOptions?: Partial<FieldDocumentationOptions>, options?: Partial<OmittedFieldOptions>): ReturnType<typeof GraphQLField>;
    function Field(
        returnTypeFunctionOrDocumentationOptions?: ReturnTypeFunc | Partial<FieldDocumentationOptions>,
        documentationOptionsOrOptions?: Partial<FieldDocumentationOptions> | Partial<OmittedFieldOptions>, 
        options?: Partial<OmittedFieldOptions>,
    ) {
        let returnTypeFunction: ReturnTypeFunc | null;
        let fieldOptions: FieldOptions;

        // 매개변수로 returnTypeFunction이 온 경우
        if(typeof returnTypeFunctionOrDocumentationOptions === 'function') {
            const documentationOptions = documentationOptionsOrOptions as Partial<FieldDocumentationOptions>;

            returnTypeFunction = returnTypeFunctionOrDocumentationOptions || defaultReturnTypeFunction;    
            fieldOptions = {
                ...defaultOptions,
                ...options,
                nullable: !defaultDocumentationOptions.required,
                ...((documentationOptions)?.required !== undefined && {nullable: !documentationOptions.required}),
                description: stringifyFieldDocumentationOptions({
                    ...defaultDocumentationOptions,
                    ...documentationOptions
                })
            }
        } else {
            const documentationOptions = returnTypeFunctionOrDocumentationOptions as Partial<FieldDocumentationOptions>;
            const options = documentationOptionsOrOptions as Partial<OmittedFieldOptions>;

            returnTypeFunction = defaultReturnTypeFunction;
            fieldOptions = {
                ...defaultOptions,
                ...options,
                nullable: !defaultDocumentationOptions.required,
                ...((documentationOptions)?.required !== undefined && {nullable: !documentationOptions.required}),
                description: stringifyFieldDocumentationOptions({
                    ...defaultDocumentationOptions,
                    ...documentationOptions
                })
            }
        }

        return returnTypeFunction ? GraphQLField(returnTypeFunction, fieldOptions) : GraphQLField(fieldOptions);
    }

    return Field;
}