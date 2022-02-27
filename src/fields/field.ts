import { Field as GraphQLField, FieldOptions, ReturnTypeFunc } from "@nestjs/graphql";
import { serializeValidationOption } from "../utils";
import { IValidationOptions, OmittedFieldOptions } from "../types";

/**
 * 기존 graphql의 field 데코레이터에 유효성검사옵션을 추가하는 함수
 * @param defaultReturnTypeFunction graphql의 리턴타입
 * @param defaultValidateOptions 유효성 옵션
 * @param defaultOptions 기존 필드 옵션
 * @returns 데코레이터
 * @author oz-k
 */
export function Field(
    defaultReturnTypeFunction: ReturnTypeFunc | null, 
    defaultValidateOptions: IValidationOptions, 
    defaultOptions?: OmittedFieldOptions
) {
    function curring(validateOptions?: Partial<IValidationOptions>, options?: Partial<OmittedFieldOptions>): PropertyDecorator & MethodDecorator;
    function curring(returnTypeFunction?: ReturnTypeFunc, validateOptions?: Partial<IValidationOptions>, options?: Partial<OmittedFieldOptions>): PropertyDecorator & MethodDecorator;
    function curring(
        returnTypeFunctionOrValidateOptions?: ReturnTypeFunc | Partial<IValidationOptions>,
        validateOptionsOrOptions?: Partial<IValidationOptions> | Partial<OmittedFieldOptions>, 
        options?: Partial<OmittedFieldOptions>,
    ) {
        let returnTypeFunction: ReturnTypeFunc | null;
        let fieldOptions: FieldOptions;

        // 매개변수로 returnTypeFunction이 온 경우
        if(typeof returnTypeFunctionOrValidateOptions === 'function') {
            const validateOptions = validateOptionsOrOptions as Partial<IValidationOptions>;

            returnTypeFunction = returnTypeFunctionOrValidateOptions || defaultReturnTypeFunction;    
            fieldOptions = {
                ...defaultOptions,
                ...options,
                nullable: !defaultValidateOptions.required,
                ...((validateOptions)?.required !== undefined && {nullable: !validateOptions.required}),
                description: serializeValidationOption({
                    ...defaultValidateOptions,
                    ...validateOptions
                })
            }
        } else {
            const validateOptions = returnTypeFunctionOrValidateOptions as Partial<IValidationOptions>;
            const options = validateOptionsOrOptions as Partial<OmittedFieldOptions>;

            returnTypeFunction = defaultReturnTypeFunction;
            fieldOptions = {
                ...defaultOptions,
                ...options,
                nullable: !defaultValidateOptions.required,
                ...((validateOptions)?.required !== undefined && {nullable: !validateOptions.required}),
                description: serializeValidationOption({
                    ...defaultValidateOptions,
                    ...validateOptions
                })
            }
        }

        return returnTypeFunction ? GraphQLField(returnTypeFunction, fieldOptions) : GraphQLField(fieldOptions);
    }

    return curring;
}