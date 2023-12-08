import { Field, FieldOptions, ReturnTypeFunc } from "@nestjs/graphql";
import { stringifyFieldDocumentationOptions } from "../utils";
import { FieldDocumentationOptions } from "../interfaces";

type OmittedFieldOptions = Omit<FieldOptions, 'description' | 'nullable'>;

/**
 * 기존 nestjs graphql Field 데코레이터에 명세옵션을 추가한 데코레이터
 * @param documentationOptions 명세 옵션
 * @param options field 옵션
 */
export function FieldDoc(documentationOptions: FieldDocumentationOptions, options?: OmittedFieldOptions): PropertyDecorator;

/**
 * 기존 nestjs graphql Field 데코레이터에 명세옵션을 추가한 데코레이터
 * @param returnTypeFunc graphql의 리턴타입
 * @param documentationOptions 명세 옵션
 * @param options field 옵션
 */
export function FieldDoc(returnTypeFunc: ReturnTypeFunc, documentationOptions: FieldDocumentationOptions, options?: OmittedFieldOptions): PropertyDecorator;

export function FieldDoc(
    returnTypeFuncOrDocumentationOptions: ReturnTypeFunc | FieldDocumentationOptions,
    documentationOptionsOrOptions: FieldDocumentationOptions | OmittedFieldOptions,
    options?: OmittedFieldOptions,
) {
    const isExistReturnTypeFunc = typeof returnTypeFuncOrDocumentationOptions === 'function';
    const returnTypeFunc = isExistReturnTypeFunc && returnTypeFuncOrDocumentationOptions;
    const documentationOptions = isExistReturnTypeFunc && documentationOptionsOrOptions as FieldDocumentationOptions;

    const fieldOptions: FieldOptions = {
        ...options,
        nullable: !documentationOptions.required,
        description: stringifyFieldDocumentationOptions(documentationOptions),
    };
    
    return isExistReturnTypeFunc
        ? Field(returnTypeFunc, fieldOptions)
        : Field(fieldOptions);
}

/**
 * 명세옵션이 추가된 FieldDoc 데코레이터의 고차 데코레이터
 * @param defaultReturnTypeFunction graphql의 리턴타입
 * @param defaultDocumentationOptions 명세 옵션
 * @param defaultOptions field 옵션
 * @returns Field 데코레이터
 */
export function FieldDocDefault(
    defaultReturnTypeFunction: ReturnTypeFunc | null, 
    defaultDocumentationOptions: FieldDocumentationOptions, 
    defaultOptions?: OmittedFieldOptions
) {
    /** 기존 graphql의 FieldDoc 데코레이터에 명세옵션을 추가한 데코레이터 */
    function FieldDoc(documentationOptions?: Partial<FieldDocumentationOptions>, options?: Partial<OmittedFieldOptions>): ReturnType<typeof Field>;
    function FieldDoc(returnTypeFunction?: ReturnTypeFunc, documentationOptions?: Partial<FieldDocumentationOptions>, options?: Partial<OmittedFieldOptions>): ReturnType<typeof Field>;
    function FieldDoc(
        returnTypeFunctionOrDocumentationOptions?: ReturnTypeFunc | Partial<FieldDocumentationOptions>,
        documentationOptionsOrOptions?: Partial<FieldDocumentationOptions> | Partial<OmittedFieldOptions>, 
        options?: Partial<OmittedFieldOptions>,
    ) {
        const isExistReturnTypeFunc = returnTypeFunctionOrDocumentationOptions && typeof returnTypeFunctionOrDocumentationOptions === 'function';

        const documentationOptions: FieldDocumentationOptions = {
            ...defaultDocumentationOptions,
            ...(isExistReturnTypeFunc
                ? documentationOptionsOrOptions
                : returnTypeFunctionOrDocumentationOptions
            ) as FieldDocumentationOptions
        }
        
        const returnTypeFunction: ReturnTypeFunc | null = isExistReturnTypeFunc
            ? returnTypeFunctionOrDocumentationOptions
            : defaultReturnTypeFunction;

        const fieldOptions: FieldOptions = {
            ...defaultOptions,
            ...options,
            nullable: !documentationOptions.required,
            description: stringifyFieldDocumentationOptions(documentationOptions),
        };

        return returnTypeFunction
            ? Field(returnTypeFunction, fieldOptions)
            : Field(fieldOptions);
    }

    return FieldDoc;
}